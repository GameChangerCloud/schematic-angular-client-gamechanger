import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

// GENERATED :  import { <Entity_name>Service } from 'src/app/store/service/<entity-name>.service';


@Component({
  selector: 'app-gamechanger-admin-tables-layout',
  templateUrl: './gamechanger-admin-tables-layout.component.html',
  styleUrls: ['./gamechanger-admin-tables-layout.component.scss'],
})
export class GamechangerAdminTablesLayoutComponent implements OnInit {
  constructor(
    private httpClient: HttpClient,
    public _snackBar: MatSnackBar,
    // GENERATED :  private <entity-name>Service: <entity-name>Service,
    
  ) {}

  databaseManagementServicesMetaData = [
    {
      name: 'initTable',
      description: 'Creates tables in the database',
      label: 'INIT TABLE',
      loading: false,
      loading_msg: 'Initializing...',
    },
    {
      name: 'fillTable',
      description: 'Fill tables in the database',
      label: 'FILL TABLE',
      loading: false,
      loading_msg: 'Filling...',
    },
    {
      name: 'cleanTables',
      description: 'Clean all your tables',
      label: 'CLEAN TABLE',
      loading: false,
      loading_msg: 'Cleaning...',
    },
    {
      name: 'dropTables',
      description: 'Drop all your tables',
      label: 'DROP TABLE',
      loading: false,
      loading_msg: 'Droping...',
    },
    // SEEN IN DOC BUT NOT WORKING | NEED TO BE FIXED FROM THE SERVER GENERATOR
    // {
    //   name: 'checkTables',
    //   description: 'Check tables in databas',
    //   label: 'CHECK TABLE',
    //   loading: false,
    // },
    // {
    //   name: 'updateDatabase',
    //   description: 'Update tables in the database',
    //   label: 'UPDATE TABLE',
    //   loading: false,
    // },
  ];

  ngOnInit(): void {}

  databaseManagementServiceLauncher(serviceMetadata: any): void {
    serviceMetadata.loading = true;
    let body = `{"${serviceMetadata.name}":"ok"}`;

    this.httpClient
      .post(environment.endpoint_uri, body)
      .subscribe((response: any) => {
        serviceMetadata.loading = false;

        if(response.errorType){
          this._snackBar.open(`Error msg : ${response.errorMessage}`, 'Error', {
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            duration: 2000
          });
        } else {
          
          // Sync Store with the performed action 
          switch (serviceMetadata.name) {
            case 'fillTable':
              break;
            case 'cleanTables':
              // GENERATED : this.<entity-name>Service.clearCache
    
              break;
            case 'dropTables':
              // GENERATED : this.<entity-name>Service.clearCache
              break;
            default:
              break;
          }

          // Throw snack bar
          this._snackBar.open(`Success msg : ${response.body}`, 'Success', {
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            duration: 2000
          });
        }
       
        return true;
      });
  }

}
