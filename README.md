# generator-angular-client-gamechanger

Generator based on [@angular-devkit/schematics-cli](https://github.com/angular/angular-cli/blob/HEAD/packages/angular_devkit/schematics/README.md) that scaffolds the basic [Ngrx](https://ngrx.io/) logic in a [Angular](https://angular.io/) project based on a GraphQL schema.

## Requirement

- @angular-devkit/schematics-cli 
```
npm install -g @angular-devkit/schematics-cli
```
Check documentation with
```bash
schematics --help
```
- A valid graphQL schema
- An AWS Account set up and configured on your machine ( best if you use the [aws-cli](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) to configure with `aws configure` command to your [AWS Access Key] and [AWS Secret Access Key] )
- A Cognito User group set up (see [AWS Cognito](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pool-as-user-directory.html))

## Usage [In progress]
 
To Generate your angular app simply do :

`schematics angular_client_gamechanger --app-name=<your-app-name> --gql-schema=<your-gcl-path-schema>`

## Schematic Developement Notes 

### Local developpement

You can Execute schematic without publishing to npm simply do in root folder:
`schematics .:<my-tested-schematic> --debug=false`

try to run this schematic test to check if you are ready :
`schematics .:test --debug=false`

### Debug schematics

To debug your schematics, you need to run with node in debugging mode:
`node --inspect-brk $(which schematics) .:myComponent --name=test`

### Unit Testing

`npm run test` will run the unit tests, using Jasmine as a runner and test framework.

### Publishing

To publish, simply do:

```bash
npm run build
npm publish
```

That's it!

## License
[MIT](https://choosealicense.com/licenses/mit/)
