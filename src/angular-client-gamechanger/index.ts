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
export function angularClientGamechanger(_options: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    /**
     * CHECK REQUIRED OPTIONS
     */

    if (!_options.name) {
      throw new SchematicsException('Option (name) is required.');
    }

    if(!_options.gqlFileName){
      throw new SchematicsException('GCL schema File name is required.');
    }


    /**
     * INIT TYPES
     */
    let types = initTypes(_options.gqlFileName);


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
function initTypes(gcpFileName: string) {
  gcpFileName;

  const schemaCode = fs.readFileSync(
    path.join(__dirname, '../../graphql-schemas', `${gcpFileName}.graphql`),
    'utf8'
  );

  // 1 - Basic Parsing of the schema
  let types = schemaParser(schemaCode);
  // 2 - Enriched parsing with typesGenerator()
  types = typesGenerator(types);
  // 3 - Add relation & directivity info in the types
  types = getRelations(types);
  // 4 - enriche types with graphQL queries for each types
  let queryPlaceholders = {placeholderId : 'id',placeholderFields : 'entity'};
  types = getGqlQueries(types,queryPlaceholders);
  
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
      getAll: getGqlQuery('GetAll', type),
      getById: getGqlQuery('GetById',type,queriesPlaceholders),
      create: getGqlQuery('Create', type,queriesPlaceholders),
      update: getGqlQuery('Update',type,queriesPlaceholders),
      delete: getGqlQuery('Delete',type,queriesPlaceholders),
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
function getGqlQuery(
  queryType: 'GetAll' | 'GetById' | 'Create' | 'Update' | 'Delete',
  type:any,
  queriesPlaceholders?: {placeholderId:string,placeholdeFields:string}

) {
  let query;
  let placeholderId = queriesPlaceholders?.placeholderId
  let placeholderFields = queriesPlaceholders?.placeholderId
  placeholderId ? '': placeholderId = 'id'
  placeholderFields ? '': placeholderFields = 'entity'

  let queries = {
    GetAll: function () {
      let typeNameplurals = strings.camelize(type.typeName) + 's';
      let queryFields = '';
      type.fields.forEach((field:any) => {
        field.type === 'String' || field.type === 'Number' || field.type === 'Boolean' || field.type ==='ID'
          ? (queryFields += field.name + ',')
          : (queryFields += `${field.name}{id}`);
      });
      // i.e :  { employes {id,name,work{id},...}}
      query = `\`{${typeNameplurals} {${queryFields}}}\``;
      // Delete last comma

    },
    GetById: function () {
      let queryFields = '';
      let placeholderId = queriesPlaceholders?.placeholderId
      placeholderId ? '': placeholderId = 'id'

      type.fields.forEach((field:any) => {    
        field.type === 'String' || field.type === 'Number' || field.type === 'Boolean' || field.type ==='ID'
          ? queryFields += field.name + ','
          : queryFields += `${field.name}{id}`;
      });

      query = `\`{${strings.camelize(type.typeName)}(id:\${${placeholderId}}) {${queryFields}}}\``;
      
    },
    Create: function () {
      query = `'TOFIX'`;
      //"mutation {workCreate(id :  , job :  , salary :  , empl :  , Fk_workInfo_employe_id :  , ){ id,  job,  salary,   empl{id},  Fk_workInfo_employe_id, }}"
    },
    Update: function () {
      let queryFields = '';
      type.fields.forEach((field: any) => {

        field.type === 'String' || 'Number' || 'Boolean' || 'ID'
          ? (queryFields += `${field.name}: \${${placeholderId}}`)
          : '';
      });
      query = `'TOFIX'`
      // Test and convert
      //"mutation {employeUpdate(id :  , email :  , firstName :  , lastName :  , login :  , password :  , workInfo :  , Fk_empl_employe_id :  , ){ id,  email,  firstName,  lastName,  login,  password,   workInfo{id},  Fk_empl_employe_id, }}"

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
      )}Delete (id:\${${placeholderId}}) {${queryFields}}}\``;
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
        field.type !== 'Number'
      ) {
        let importTemplate = `import { ${strings.capitalize(
          field.type
        )} } from '../models/${strings.camelize(field.type)}'`;
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
      if (
        field.type === 'String' ||
        field.type === 'ID' ||
        field.type === 'Number'
      ) {
        let fieldType = field.type;
        if (field.type === 'ID') {
          fieldType = 'number';
        }
        let fieldToTsType = `  public ${
          field.name
        }${setupRequiredFieldInTsModel(field.noNull)}: ${fieldType};\n`;
        fields += fieldToTsType;
      } else {
        // let fieldType = field.type;
        let fieldToTsType = `  public ${
          field.name
        }${setupRequiredFieldInTsModel(
          field.noNull
        )}: ${setupRelationValueInTsModel(field.type, field.relationType)};\n`;
        fields += fieldToTsType;
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

       override getById(id: string | number): Observable<Employe> {
        let query = {
          query: ${type.queries.getById}
        };

        return this.http
          .post(environment.endpoint_uri, query)
          .pipe(map((result) => this.mapEmploye(result)));
      }


      override delete(id: string | number): Observable<string | number> {
        let query = {
          query: ${type.queries.delete}
        };
        return this.http
          .post(environment.endpoint_uri, query)
          .pipe(map((result) => this.mapEmploye(result)));
      }
      override add(entity: Employe): Observable<Employe> {
        let query = {
            query: ${type.queries.create}
        };
            
        return this.http
        .post(environment.endpoint_uri, query)
        .pipe(map((result) => this.mapAdd(result)));
      }
      override update(update: Update<Employe>): Observable<Employe> {
        let query = {
          query: ${type.queries.update}
        };
        return this.http
          .post(environment.endpoint_uri, query)
          .pipe(map((result) => this.mapEmploye(result)));
      }

     
       map${type.typeName}s(result: any) {
         return result.data.${strings.camelize(type.typeName)}s;
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
 * Setup field value for relation field
 * @param relationType
 * @param fieldType
 * @return fieldValue
 * TODO : setup typing for relationType
 */
function setupRelationValueInTsModel(fieldType: string, relationType: any) {
  let fieldValue = `"${fieldType}"`;
  switch (relationType) {
    case 'manyToOne':
      fieldValue = fieldValue.replace(/"([^"]*)"/g, '[$1]');
      break;
    case 'oneToMany':
      fieldValue = fieldValue.replace(/"([^"]*)"/g, '$1');
      break;
    default:
      break;
  }
  return fieldValue;
}

/**
 * Return right TS semantic for required/not field
 * @param required true | false
 * @returns true : ! | false : ?
 */
function setupRequiredFieldInTsModel(required: boolean) {
  return required ? '!' : '?';
}
