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
  typesGenerator 
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
     * Check required options
     */
    if (!_options.name) {
      throw new SchematicsException('Option (name) is required.');
    }
    if (!_options.gqlPath) {
      throw new SchematicsException('Option (graphql path) is required.');
    }

    /**
     * Init types
     * (Check getTypes function comment to have more info about types)
     */
    let types = getTypes();

    let typesWithRelation = getTypesRelations(types)

    // console.log(typesWithRelation);

    for (let i = 0; i < typesWithRelation.length; i++) {
      const element = typesWithRelation[i];
      console.log("====> relations",element);
    }
    

    /**
     * NGRX DATA files creation
     */

    createEntitiesServicesFiles(types, _tree, _options.name);

    createEntitiesModelsFiles(types, _tree, _options.name);

    // Generate app templates
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
 * Find types structure from the gamechanger-parser there:
 * https://github.com/GameChangerCloud/easygraphql-parser-gamechanger
 * @returns types
 */
function getTypes() {
  const schemaCode = fs.readFileSync(
    path.join(__dirname, '../../graphql-examples', 'employe-schema.graphql'),
    'utf8'
  );

  let types = schemaParser(schemaCode);
  let enrichedTypes= typesGenerator(types)

  return enrichedTypes;
}

/**
 * @param types Detailed JSON about the graphQL schema used for the generation
 * @param _tree Current tree where files are created
 * @param projectName name of the generated project
 * TODO : catch schematics creation error
 * TODO : return true false
 */
function createEntitiesServicesFiles(
  types: any,
  _tree: Tree,
  projectName: string
) {
  for (const type in types) {
    // Init and fill service file template
    let serviceFileTemplate = `import { Injectable } from '@angular/core';
    import {
      EntityCollectionServiceBase,
      EntityCollectionServiceElementsFactory
    } from '@ngrx/data';
    import { ${type} } from '../models/${strings.camelize(type)}';
     
    @Injectable({ providedIn: 'root' })
    export class ${type}Service extends EntityCollectionServiceBase<${type}> {
      constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('${type}', serviceElementsFactory);
      }
    }`;
    // Create Service file
    _tree.create(
      `${projectName}/src/app/store/service/${strings.camelize(
        type
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
function createEntitiesModelsFiles(
  types: any,
  _tree: Tree,
  projectName: string
) {
  // Start Loop to create entity model file for each type
  for (const type in types) {
    /** Init model file template **/
    let modelFileTemplate = ``;

    /** Generate Model Imports **/
    let importsTemplate = ``;
    // Find field to be imported
    for (let i = 0; i < types[type].fields.length; i++) {
      const field = types[type].fields[i];
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
    let classTemplate = `export class ${type} { 
        <Fields> 
    }`;

    // Generate fields
    let fields = '';
    for (let i = 0; i < types[type].fields.length; i++) {
      const field = types[type].fields[i];
      if (
        field.type === 'String' ||
        field.type === 'ID' ||
        field.type === 'Number'
      ) {
        let fieldType = field.type;
        if (field.type === 'ID') {
          fieldType = 'number';
        }
        let fieldToTsType = `  public ${field.name}${requiredField(
          field.noNull
        )}: ${fieldType};\n`;
        fields += fieldToTsType;
      } else {
        // let fieldType = field.type;
        let fieldToTsType = `  public ${field.name}${requiredField(
          field.noNull
        )}: ${getRelation()};\n`;
        fields += fieldToTsType;
      }
    }

    /** Add Model Class **/
    modelFileTemplate += classTemplate.replace('<Fields>', fields);

    /** Create model in current passed tree **/
    _tree.create(
      `${projectName}/src/app/store/models/${strings.camelize(type)}.ts`,
      modelFileTemplate
    );
  }
}

/**
 * Get field relation
 */
function getTypesRelations(types:any) {

  let typesWithRelations = getRelations(types)
  
  // console.log('====> relations',typesWithRelations);
  // for (let i = 0; i < typesWithRelations.length; i++) {
  //   const element = typesWithRelations[i];
  //   console.log(element);
  // }
  
  return typesWithRelations

}

function getRelation(){

}

/**
 * Return right TS semantic for required/not field
 * @param required true | false
 * @returns true : ! | false : ?
 */
function requiredField(required: boolean) {
  return required ? '!' : '?';
}
