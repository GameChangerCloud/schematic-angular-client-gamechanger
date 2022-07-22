import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function test(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    return tree && console.log("test done ! you are ready to test other schematics, to check list of available schematic try : schematics ./:--list-schematics");
  };
}
