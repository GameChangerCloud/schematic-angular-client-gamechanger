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
  // forEach,
  // FileEntry,
  // branchAndMerge
} from '@angular-devkit/schematics';

import {
  schemaParser,
  getRelations,
  typesGenerator,
} from 'easygraphql-parser-gamechanger';
const fs = require('fs');
const path = require('path');

/**
 * @param _options Options from schematics schema
 * @returns gamechanger-angular-client
 */
export function angularClientGamechanger(_options: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    /**
     * CHECK REQUIRED OPTIONS
     */
    if (!_options.name) {
      throw new SchematicsException('Option (name) is required.');
    }
    if (!_options.gqlPath) {
      throw new SchematicsException('Option (graphql path) is required.');
    }

    /**
     * INIT TYPES
     */
    let types = initTypes(_options.gqlPath);

    /**
     * NGRX DATA files creation
     */

    createEntitiesServicesFiles(types, _tree, _options.name);

    createEntitiesTsModelsFiles(types, _tree, _options.name);

    // createCustomDataServicesFiles(types, _tree, _options.name)

    /**
     * Generate app from ur templates
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
function initTypes(gclPath: string) {
  // console.log(gclPath);
  // console.log(__dirname);
  gclPath;

  const schemaCode = fs.readFileSync(
    path.join(__dirname, '../../graphql-examples', 'employe-schema.graphql'),
    'utf8'
  );

  // 1 - Basic Parsing of the schema
  let types = schemaParser(schemaCode);
  // 2 - Enriched parsing with typesGenerator()
  types = typesGenerator(types);
  // 3 - Add relation & directivity info in the types
  types = getRelations(types);

  return types;
}

/**
 * @param types Detailed JSON about the graphQL schema used for the generation
 * @param _tree Current tree where files are created
 * @param projectName name of the generated project
 * TODO : 1 - catch schematics creation error | 2 - add return true/false
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
    import { ${type.typeName} } from '../models/${strings.camelize(
      type.typeName
    )}';
     
    @Injectable({ providedIn: 'root' })
    export class ${type.typeName}Service extends EntityCollectionServiceBase<${
      type.typeName
    }> {
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
 * TODO : 1 - catch schematics creation error | 2 - add return true/false
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
        let fieldToTsType = `  public ${field.name}${setupRequiredFieldInTsModel(
          field.noNull
        )}: ${fieldType};\n`;
        fields += fieldToTsType;
      } else {
        // let fieldType = field.type;
        let fieldToTsType = `  public ${field.name}${setupRequiredFieldInTsModel(
          field.noNull
        )}: ${setupRelationValueInTsModel(field.type,field.relationType)};\n`;
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


// function createCustomDataServicesFiles(types:any, _tree: Tree, projectName:string){
//   console.log(types,_tree,projectName);
//   let dataServiceTemplate = 
//  `import { Injectable } from '@angular/core';
//   import { HttpClient } from '@angular/common/http';
//   import {
//     EntityCollectionDataService,
//     DefaultDataService,
//     HttpUrlGenerator,
//     Logger,
//     QueryParams,
//   } from '@ngrx/data';
//   import { Observable } from 'rxjs';
//   import { map } from 'rxjs/operators';
//   import { environment } from 'src/environments/environment';
//   import { Update } from '@ngrx/entity';
  
  
//   // GENERATED : import { <Entity-name> } from '../models/<entity-name>';
  
  
//   @Injectable()
//   export class EmployeDataService extends DefaultDataService<Employe> {
//     constructor(
//       http: HttpClient,
//       httpUrlGenerator: HttpUrlGenerator,
//       logger: Logger
//     ) {
//       super('Employe', http, httpUrlGenerator);
//       logger.log('Created custom Employe EntityDataService');
//     }
  
//     override add(entity: Employe): Observable<Employe> {
//       let query = {
//         query : `mutation {employeCreate(id :  "${entity.id}", email :  "${entity.email}", login :  "${entity.login}", password : "${entity.password}" ){ id,  email, login,  password }}`
//       };
  
//       let query2  = "mutation {employeCreate(id :  , email :  , firstName :  , lastName :  , login :  , password :  , workInfo :  , Fk_empl_employe_id :  , ){ id,  email,  firstName,  lastName,  login,  password,   workInfo{id},  Fk_empl_employe_id, }}"
  
//       console.log(query);
      
//       return this.http
//       .post(environment.endpoint_uri, query)
//       .pipe(map((result) => this.mapAdd(result)));
//     }
  
//     override getAll(): Observable<Employe[]> {
//       let query = {
//         query:
//           `{employes {id,firstName,lastName,email,login,password,workInfo{id}}}`,
//       };
  
//       return this.http
//         .post(environment.endpoint_uri, query)
//         .pipe(map((result) => this.mapEmployes(result)));
//     }
  
//     override getById(id: string | number): Observable<Employe> {
//       let query = {
//         query: `{employe(id:${id}) {id,firstName,lastName,email,firstName,lastName,login,password,workInfo{work_id}}}`,
//       };
//       return this.http
//         .post(environment.endpoint_uri, query)
//         .pipe(map((result) => this.mapEmploye(result)));
//     }
  
//     override delete(key: string | number): Observable<string | number> {
//       let query = {
//         query: `mutation { employeDelete ( id:${key}){id,firstName,lastName,email,firstName,lastName,login,password}}`,
//       };
//       return this.http
//         .post(environment.endpoint_uri, query)
//         .pipe(map((result) => this.mapEmploye(result)));
//     }
  
//     override update(update: Update<Employe>): Observable<Employe> {
//       let query = {
//         query: `mutation { employeUpdate ( id:${update.id},firstName:${update.changes.firstName},lastName:${update.changes.lastName},email:${update.changes.email},login:${update.changes.login},password:${update.changes.password}){firstName}}`,
//       };
//       return this.http
//         .post(environment.endpoint_uri, query)
//         .pipe(map((result) => this.mapEmploye(result)));
//     }
  
//     mapEmployes(result: any) {
//       console.log(result);
      
//       return result.data.employes;
//     }
  
//     mapEmploye(result: any) {
//       return result.data.employe;
//     }
  
//     mapUpdate(result: any) {
  
//       return result.data.employe;
//     }
//     mapAdd(result: any) {
//       console.log(result);
      
//       return result.data;
//     }
//   }`
// }

/**
 * Setup field value for relation field 
 * @param relationType 
 * @param fieldType 
 * @return fieldValue  
 * TODO : setup typing for relationType
 */
function setupRelationValueInTsModel(fieldType:string, relationType:any) {
  console.log(relationType, fieldType);
  let fieldValue = `"${fieldType}"`
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
  return fieldValue
}

/**
 * Return right TS semantic for required/not field
 * @param required true | false
 * @returns true : ! | false : ?
 */
function setupRequiredFieldInTsModel(required: boolean) {
  return required ? '!' : '?';
}
