import { strings } from '@angular-devkit/core';
import {
  apply,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  SchematicsException,
  template,
  Tree,
  url,
  chain,
} from '@angular-devkit/schematics';

import {
  schemaParser,
  getRelations,
  typesGenerator,
} from 'easygraphql-parser-gamechanger';




const fs = require('fs');
const path = require('path');

/**
 * MAIN RULE OF THIS SCHEMATIC
 * Generate  new angular-client-gamechanger in root dir
 * @param _options Options from schematics schema
 * @returns <custom-gamechanger-angular-client>
 */
export function generate(_options: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    /**
     * CHECK REQUIRED OPTIONS
     */

    if (!_options.name) {
      throw new SchematicsException('Option (name) is required.');
    }

    if(!_options.graphqlFile){
      throw new SchematicsException('GCL schema File name is required.');
    }

    /**
     * INIT TYPES
     */
    let types = initTypes(_options.graphqlFile);

    _options.jsonTypes = JSON.stringify(types)
    _options.jsonGraphqlSchema = fs.readFileSync(
      path.join(__dirname, '../../', _options.graphqlFile),
      'utf8'
    )
    
    /**
     * NGRX DATA files creation
     */

    createEntitiesServicesFiles(types, _tree, _options.name);

    createEntitiesTsModelsFiles(types, _tree, _options.name);

    createCustomDataServicesFiles(types, _tree, _options.name);

    /**
     * Generate app from the template-app
     */

    const templateSource = apply(url('./files'), [
      template({
        ...strings,
        ..._options,
        types,
      }),
      move(`${_options.name}/` as string),
    ]);

    return chain([mergeWith(templateSource)]);
  };
}

/**
 * Parse graphQL schema with easygraphqlparser from gamechanger-parser
 * Find types structure from gamechanger-parser there:
 * https://github.com/GameChangerCloud/easygraphql-parser-gamechanger
 * OR https://www.notion.so/GameChanger-df7d7d25885144e9a4f185a272f91e7a
 * TODO : Fix gql path
 * @returns types
 */
function initTypes(graphqlSchema: string) {

  const schemaCode = fs.readFileSync(
    path.join(__dirname, '../../', graphqlSchema),
    'utf8'
  );

  // 1 - Basic Parsing of the schema

  // 2 - Enriched parsing with typesGenerator()
  let types = typesGenerator(schemaParser(schemaCode));
  // 3 - Add relation & directivity info in the types
  types = getRelations(types);
  // 4 - enriche types with entity ID field checker
  types = checkEntitiesIdField(types);
  // 5 - enriche types with graphQL queries for each types
  types = getGqlQueries(types,{placeholderId : 'id',placeholderFields : 'entity'});

  return types;
}

/**
 * Add GCL queries for each types
 * @param types
 * @returns types with queries
 */
function getGqlQueries(types: any, queriesPlaceholders: any) {
  for (let i = 0; i < types.length; i++) {
    let type = types[i];

    let queries = {
      getAll: generateGqlQuery('GetAll', type),
      getById: generateGqlQuery('GetById',type,queriesPlaceholders),
      create: generateGqlQuery('Create', type,queriesPlaceholders),
      update: generateGqlQuery('Update',type,queriesPlaceholders),
      delete: generateGqlQuery('Delete',type,queriesPlaceholders),
    };
    type.queries = queries;
  }

  
  return types;
}

/**
 * Generate graphQL query from gamechanger type info
 * Support: 5 queryType | 2 level nested object
 * @param queryType 'GetAll'| 'GetById'|'Create' |'Update'|'Delete'
 * @param typeName
 * @param typeFields
 * @returns GraphQL query | i.e : { employes {id,name,work{id},...}}
 */
function generateGqlQuery(
  queryType: 'GetAll' | 'GetById' | 'Create' | 'Update' | 'Delete',
  type:any,
  queriesPlaceholders?: {placeHolderId:string,placeHoldeFields:string}
) {
  let query;
  let placeholderId = queriesPlaceholders?.placeHolderId
  let placeholderFields = queriesPlaceholders?.placeHoldeFields
  let typeNamePlurals = type.typeName + 's';
  placeholderId ? '': placeholderId = 'id'
  placeholderFields ? '': placeholderFields = 'entity'
  
  let queries = {
    GetAll: function () {

      if(type.typeName==='Studio'){
        console.log(type);
        
      }
      let queryFields = '';
      type.emptyIdField ? queryFields += 'id,': ''
      type.fields.forEach((field:any) => {
        if(!field.relation){
          queryFields += field.name + ','
        } else {
          field.isArray 
          ? queryFields += `${field.name}(skip:0, take: 100){totalCount nodes {id}}`
          : (queryFields +=`${field.name}{id}`)
        }
      });
      query = `\`query getAll${typeNamePlurals} {${strings.camelize(typeNamePlurals)}Pagination(skip: 0, take: 100) {totalCount nodes {${queryFields}}}}\``

    },
    GetById: function () {
      let queryFields = '';
      type.fields.forEach((field:any) => {    
        field.type === 'String' || field.type === 'Number' || field.type === 'Boolean' || field.type ==='ID'
          ? queryFields += field.name + ','
          : queryFields += `${field.name}{id}`;
      });
      query = `\`query ${strings.camelize(type.typeName)}GetDataById {${strings.camelize(type.typeName)}GetDataById(${strings.camelize(type.typeName)}Id: "${placeholderId}",) {${strings.camelize(type.typeName)} {${queryFields}}}}\``
    },
    Create: function () {
      let fieldsToReturn = '';
      let fieldsToCreate = ''
      type.fields.forEach((field:any) => {    
        if(
          field.type === 'String' || 
          field.type === 'Number' || 
          field.type === 'Boolean' || 
          field.type === 'ID' || 
          field.type === 'Float'|| 
          field.type === 'Int'
          ){
          let t = `\${${placeholderFields}.${field.name}}`
          fieldsToReturn += field.name + ','  
          fieldsToCreate += `${field.name} : ${toStringField(t,field.type)} `
        } else {
          if(field.isArray){
            let str = field.name
            fieldsToCreate += `${str.substring(0, str.length - 1)}Ids : "\${${placeholderFields}.${field.name}}" `
            fieldsToReturn += `${field.name}(skip: 0, take: 100){totalCount nodes{id}} `
          } else {
            fieldsToCreate += `${field.name}Id : "\${${placeholderFields}.${field.name}}" `
            fieldsToReturn += `${field.name}{id},`
          }
        }
      });
      query = `\`mutation ${strings.camelize(type.typeName)}Create {${strings.camelize(type.typeName)}Create(input: {${fieldsToCreate}}) {${strings.camelize(type.typeName)}{${fieldsToReturn}}}}\``;
      
    },
    Update: function () {
      let fieldsToReturn = '';
      let fieldsToCreate = ''      
      type.fields.forEach((field:any) => {    
        if(field.type === 'String' || field.type === 'Number' || field.type === 'Boolean' || field.type ==='ID'){
          fieldsToReturn += field.name + ','  
          fieldsToCreate += `${field.name} : ${placeholderFields}.${field.name} `
        } else {
          fieldsToReturn += `${field.name}{id} `
          fieldsToCreate += `${field.name} : ${placeholderFields}.${field.name} `
        }
      });

      query = `\`mutation ${strings.camelize(type.typeName)}Update {${strings.camelize(type.typeName)}Update(${strings.camelize(type.typeName)}Id: "${placeholderFields}.id",input: {${fieldsToCreate}}) {${fieldsToReturn}}}}\``;

    },
    Delete: function () {
      let queryFields = '';
    
      type.fields.forEach((field:any) => {    
        field.type === 'String' || field.type === 'Number' || field.type === 'Boolean' || field.type ==='ID'
          ? queryFields += field.name + ','
          : queryFields += `${field.name}{id}`;
      });
      query = `\`mutation {${strings.camelize(
        type.typeName
      )}Delete (${strings.camelize(type.typeName)}Id:\${${placeholderId}}) {${strings.camelize(type.typeName)}Id}}\``;
    },
  };
  queries[queryType]();
  return query;
}

/**
 * Create service file in the new project for each entity
 * @param types Detailed JSON about the graphQL schema used for the generation
 * @param _tree Current tree where files are created
 * @param projectName name of the generated project
 */
function createEntitiesServicesFiles(
  types: any,
  _tree: Tree,
  projectName: string
) {
  for (let i = 0; i < types.length; i++) {
    const type = types[i];
    let serviceFileTemplate = `import { Injectable } from '@angular/core';
    import {
      EntityCollectionServiceBase,
      EntityCollectionServiceElementsFactory
    } from '@ngrx/data';
    import { ${type.typeName} } from '../models/${strings.camelize(type.typeName)}';
     
    @Injectable({ providedIn: 'root' })
    export class ${type.typeName}Service extends EntityCollectionServiceBase<${type.typeName}> {
      constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('${type.typeName}', serviceElementsFactory);
      }
    }`;
    // Create Service file
    _tree.create(
      `${projectName}/src/app/store/service/${strings.camelize(
        type.typeName
      )}.service.ts`,
      serviceFileTemplate
    );
  }
}

/**
 * Create TS Model file for each type
 * @param types Detailed JSON about the graphQL schema used for the generation
 * @param _tree Current tree where files are created
 */
function createEntitiesTsModelsFiles(
  types: any,
  _tree: Tree,
  projectName: string
) {
  // Start Loop to create entity model file for each type
  for (let i = 0; i < types.length; i++) {
    const type = types[i];

    /** Init model file template **/
    let modelFileTemplate = ``;

    /** Generate Model Imports **/
    let importsTemplate = ``;
    // Find field to be imported
    for (let i = 0; i < type.fields.length; i++) {
      const field = type.fields[i];
      if (
        field.type !== 'String' &&
        field.type !== 'ID' &&
        field.type !== 'Number' &&
        field.type !== 'Float' &&
        field.type !== 'Int' 
      ) {
        let importTemplate = `import { ${strings.capitalize(
          field.type
        )} } from './${strings.camelize(field.type)}'\n`;
        importsTemplate += importTemplate;
      }
    }

    /** Add Model Imports **/
    modelFileTemplate += importsTemplate + '\n';

    /** Generate Model Class **/
    // Init template
    let classTemplate = `export class ${type.typeName} { 
        <Fields> 
    }`;

    // Generate fields
    let fields = '';
    for (let i = 0; i < type.fields.length; i++) {
      const field = type.fields[i];
      let requiredField = field.noNull ? '!':'?'
      if (
        !field.relation
      ) {
        let fieldType = field.type;
        if (field.type === 'ID' || field.type === 'Float' ||  field.type === 'Int' || field.type === 'Number' ) {
          fieldType = 'number';
        }
        fields += `  public ${
          field.name
        }${requiredField}: ${fieldType};\n`;
      } else {
        fields += `  public ${
          field.name
        }${requiredField}: ${toArrayField(field.type, field.isArray)};\n`;
      }
    }

    /** Add Model Class **/
    modelFileTemplate += classTemplate.replace('<Fields>', fields);

    /** Create model in current passed tree **/
    _tree.create(
      `${projectName}/src/app/store/models/${strings.camelize(
        type.typeName
      )}.ts`,
      modelFileTemplate
    );
  }
}

/**
 * Create  Ngrx Dataservices file for each type
 * @param types Detailed JSON about the graphQL schema used for the generation
 * @param _tree Current tree where files are created
 */
function createCustomDataServicesFiles(
  types: any,
  _tree: Tree,
  projectName: string
) {
  for (let i = 0; i < types.length; i++) {
    const type = types[i];
    
    let dataServiceTemplate = `import { Injectable } from '@angular/core';
     import { HttpClient } from '@angular/common/http';
     import {
       EntityCollectionDataService,
       DefaultDataService,
       HttpUrlGenerator,
       Logger,
       QueryParams,
     } from '@ngrx/data';
     import { Observable } from 'rxjs';
     import { map } from 'rxjs/operators';
     import { environment } from 'src/environments/environment';
     import { Update } from '@ngrx/entity';
     import { ${type.typeName} } from '../models/${strings.camelize(
      type.typeName
    )}';
     
     @Injectable()
     export class ${type.typeName}DataService extends DefaultDataService<${
      type.typeName
    }> {
       constructor(
         http: HttpClient,
         httpUrlGenerator: HttpUrlGenerator,
         logger: Logger
       ) {
         super('${type.typeName}', http, httpUrlGenerator);
         logger.log('Created custom ${type.typeName} EntityDataService');
       }
     
       override getAll(): Observable<${type.typeName}[]> {
         let query = {
           query: ${type.queries.getAll}
         };
     
         return this.http
           .post(environment.endpoint_uri, query)
           .pipe(map((result) => this.map${type.typeName}s(result)));
       }

       override getById(id: string | number): Observable<${type.typeName}> {
        let query = {
          query: ${type.queries.getById}
        };

        return this.http
          .post(environment.endpoint_uri, query)
          .pipe(map((result) => this.map${type.typeName}(result)));
      }


      override delete(id: string | number): Observable<string | number> {
        let query = {
          query: ${type.queries.delete}
        };
        return this.http
          .post(environment.endpoint_uri, query)
          .pipe(map((result) => this.map${type.typeName}(result)));
      }
      override add(entity: ${type.typeName}): Observable<${type.typeName}> {
        let query = {
            query: ${type.queries.create}
        };
            
        return this.http
        .post(environment.endpoint_uri, query)
        .pipe(map((result) => this.mapAdd(result)));
      }
      override update(entity: Update<${type.typeName}>): Observable<${type.typeName}> {
        let query = {
          query: ${type.queries.update}
        };
        return this.http
          .post(environment.endpoint_uri, query)
          .pipe(map((result) => this.map${type.typeName}(result)));
      }

     
       map${type.typeName}s(result: any) {
         return result.data.${strings.camelize(type.typeName)}sPagination.nodes;
       }
     
       map${type.typeName}(result: any) {
         return result.data.${strings.camelize(type.typeName)};
       }
     
       mapUpdate(result: any) {
         return result.data.${strings.camelize(type.typeName)};
       }
       mapAdd(result: any) {
         return result.data;
       }
     }`;
    /** Create data-service in current passed tree **/
    _tree.create(
      `${projectName}/src/app/store/data-service/${strings.camelize(
        type.typeName
      )}-data.service.ts`,
      dataServiceTemplate
    );
  }
}

/**
 * Check if field is Array | Set array in the string
 * @param relationType
 * @param fieldType
 * @return fieldValue
 */
function toArrayField(fieldName: string, isArray: boolean) {
  let fieldValue = `"${fieldName}"`;
  isArray ? fieldValue = fieldValue.replace(/"([^"]*)"/g, '[$1]'): fieldValue = fieldValue.replace(/"([^"]*)"/g, '$1');
  return fieldValue;
}

/**
 * Check if field is Array | Set array in the string
 * @param relationType
 * @param fieldType
 * @return fieldValue
 */
function toStringField(field: string,entityType:string){

  let fieldValue = field;
  if(entityType === 'String' || entityType === 'ID' ){
    // fieldValue.replace(/"([^"]*)"/g, '[$1]')
    // console.log(fieldValue.replace(/"([^"]*)"/g, '[$1]'));
    fieldValue = '"' + field + '"'
    // fieldValue = fieldValue.replace(/"([^"]*)"/g, '$1');
  } else {}
  return fieldValue;
}


/**
 * Check if ID field is there for each type 
 * @param types 
 * @returns 
 */
function checkEntitiesIdField(types:any): any{

  types.forEach((type:any) => {

    let emptyIdField = false
    type.fields.forEach((field:any) => {
      field.type === 'ID' ? emptyIdField = false : emptyIdField = true
    });
    type.emptyIdField = emptyIdField
  });
  
  return types
}
