const types = {
  "Employe": {
    "type": "ObjectTypeDefinition",
    "fields": [
      {
        "name": "id",
        "arguments": [],
        "isDeprecated": false,
        "directives": [],
        "noNull": true,
        "isArray": false,
        "noNullArrayValues": false,
        "type": "ID"
      },
      {
        "name": "email",
        "arguments": [],
        "isDeprecated": false,
        "directives": [],
        "noNull": true,
        "isArray": false,
        "noNullArrayValues": false,
        "type": "String"
      },
      {
        "name": "firstName",
        "arguments": [],
        "isDeprecated": false,
        "directives": [],
        "noNull": false,
        "isArray": false,
        "noNullArrayValues": false,
        "type": "String"
      },
      {
        "name": "lastName",
        "arguments": [],
        "isDeprecated": false,
        "directives": [],
        "noNull": false,
        "isArray": false,
        "noNullArrayValues": false,
        "type": "String"
      },
      {
        "name": "login",
        "arguments": [],
        "isDeprecated": false,
        "directives": [],
        "noNull": true,
        "isArray": false,
        "noNullArrayValues": false,
        "type": "String"
      },
      {
        "name": "password",
        "arguments": [],
        "isDeprecated": false,
        "directives": [],
        "noNull": true,
        "isArray": false,
        "noNullArrayValues": false,
        "type": "String"
      },
      {
        "name": "workInfo",
        "arguments": [],
        "isDeprecated": false,
        "directives": [],
        "noNull": false,
        "isArray": false,
        "noNullArrayValues": false,
        "type": "Work"
      }
    ],
    "values": [],
    "types": [],
    "implementedTypes": [],
    "directives": []
  },
  "Work": {
    "type": "ObjectTypeDefinition",
    "fields": [
      {
        "name": "id",
        "arguments": [],
        "isDeprecated": false,
        "directives": [],
        "noNull": true,
        "isArray": false,
        "noNullArrayValues": false,
        "type": "ID"
      },
      {
        "name": "job",
        "arguments": [],
        "isDeprecated": false,
        "directives": [],
        "noNull": false,
        "isArray": false,
        "noNullArrayValues": false,
        "type": "String"
      },
      {
        "name": "salary",
        "arguments": [],
        "isDeprecated": false,
        "directives": [],
        "noNull": false,
        "isArray": false,
        "noNullArrayValues": false,
        "type": "String"
      },
      {
        "name": "empl",
        "arguments": [],
        "isDeprecated": false,
        "directives": [],
        "noNull": false,
        "isArray": true,
        "noNullArrayValues": false,
        "type": "Employe"
      }
    ],
    "values": [],
    "types": [],
    "implementedTypes": [],
    "directives": []
  }
}