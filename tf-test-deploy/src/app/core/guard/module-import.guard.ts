/**
 * Guard used to prevent importing core module two times in the app
 * @param parentModule
 * @param moduleName
 */
 export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
      throw new Error(`${moduleName} has already been loaded. Import ${moduleName} modules in the AppModule only.`);
  }
}
