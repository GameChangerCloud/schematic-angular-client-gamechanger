// import { strings } from '@angular-devkit/core';
import { apply, chain, mergeWith, move, Rule, SchematicContext, Source, Tree, url } from '@angular-devkit/schematics';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function angularClientGamechanger(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const name = _options.name
    // const style = _options.style
  
    // const templateSource = apply(url('./files/'), [
    //   template({..._options, ...strings}),
    // ]);
    // const merged = mergeWith(templateSource, MergeStrategy.Overwrite)
  
    // return merged(tree, _context) as Rule;

    const templateSource = addTplFiles(`${name}/`);

     // return updated tree
     try {
      return chain([
        mergeWith(templateSource)
      ]);
    } catch (e) {
      return tree;
    }
  }
}

function addTplFiles(path: string): Source {
  // copy templates
  return apply(url('./files'), [
    move(path as string)
  ]);
}
