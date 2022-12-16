# angular-client-gamechanger

Generator based on [Angular schematics cli](https://github.com/angular/angular-cli/blob/HEAD/packages/angular_devkit/schematics/README.md) that scaffolds the basic [Ngrx](https://ngrx.io/) logic in a [Angular](https://angular.io/) using GraphQL at entry point.

## Requirement

- @angular-devkit/schematics-cli 
```
npm install -g @angular-devkit/schematics-cli
```
- A valid graphQL schema
- An AWS Account set up and configured on your machine ( best if you use the [aws-cli](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) to configure with `aws configure` command to your [AWS Access Key] and [AWS Secret Access Key] )
- A Cognito User group set up (see [AWS Cognito](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pool-as-user-directory.html)) :
* userPoolBase 
* userPoolBaseUri 
* clientId 
* callbackUri 
* signoutUri 

- API Gateway URL
* If you set up your graphQL server using out generator-aws-server-gamechanger tool, you can use the URL obtained in your constants file.   
`<your-app-name>/src/constants/index.js`  


## Generate your app
 
To install generator, start of by installing the npm package in a repository which contains your graphql schema:

- @schematic-angular-client-gamechanger 
```
npm install schematic-angular-client-gamechanger
```


To run generator,run the following inside the repo with the graphql schema:

```bash
schematics schematic-angular-client-gamechanger/:generate --dry-run=false
```
You will be asked for :

- Name
- Description
- File name of your graphQL schema (ie: employees.graphql)
- endpoint_uri
- Cognito user pool ID
- Cognito client ID 

## Generated app structure
___
When you launch your application, you will have a toolbar on the top with :

* Home : Home page (display the graphQL schema and the API Gateway)

* Tables : Page which manage tables (create tables, delete tables, create fake data, delete all data, check if tables have been created and update you database)

* Models : You will have all models and you can access here to manage them.

All this pages are only available if you are connected. You can access the connexion page at <your-app>/admin url 

If your app was setuped with gamechanger-aws-generator your cred are :
username : admin@admin.fr 
password : password

## Deployment
Using S3 and CloudFront, you can deploy your app to make it available globally through an URL.

Initialize the cloud structure
````
cd terraform 
````
````
terraform init
````
````
terraform apply 
````
It will create two environment `staging` & `production`.
The CloudFront URLs corresponding will be printed in `<your-app-name>/terraform/ids`. If it doesn't, you can get them in your CloudFront console on aws website.  

### Build

````
npm run build
````
### Deploy

You need to have aws cli setup with your cred then 
````
aws s3 sync dist/<your-app-name> s3://<bucket-name>
````

See the results on URLs printed in `<your-app-name>/terraform/ids`

## Schematic Developement Notes 

### Local developpement

You can Execute schematic without publishing to npm simply do in root folder:
`schematics ./:<my-tested-schematic> --debug=false`

try to run this schematic test to check if you are ready :
`schematics ./:test --debug=false`

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
