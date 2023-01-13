// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_auth_mechanism: 'cognito',
  cognitoUserPoolId: 'eu-west-1_QU3lQE0EG',
  cognitoClientId: '76sb1hr613a4guma40jhfiift',
  endpoint_uri: 'https://qk4s8an477.execute-api.eu-west-1.amazonaws.com/deploy/graphql',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
