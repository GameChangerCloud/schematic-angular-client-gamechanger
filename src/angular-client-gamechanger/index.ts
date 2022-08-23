import { strings } from '@angular-devkit/core';
import { 
  apply, 
  mergeWith,
  branchAndMerge, 
  move, 
  Rule, SchematicContext, 
  SchematicsException, 
   template,
   Tree, 
   url 
  } from '@angular-devkit/schematics';
    

export function angularClientGamechanger(_options: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    if (!_options.name) {
      throw new SchematicsException('Option (name) is required.');
    }

    const templateSource = apply(url('./files'), [
      template({
        ...strings,
        ..._options,
      }),
      move(`${_options.name}/` as string)
    ]);

    return branchAndMerge(mergeWith(templateSource));
  };
}



