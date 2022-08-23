import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gamechanger-admin-tables-layout',
  templateUrl: './gamechanger-admin-tables-layout.component.html',
  styleUrls: ['./gamechanger-admin-tables-layout.component.scss'],
})
export class GamechangerAdminTablesLayoutComponent implements OnInit {
  constructor(private httpClient: HttpClient) {}

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
    //   description: 'Check Tables in databas',
    //   label: 'CHECK TABLE',
    //   loading: false,
    // },
    // {
    //   name: 'updateDatabase',
    //   description: 'Creates tables in the database',
    //   label: 'UPDATE TABLE',
    //   loading: false,
    // },
  ];

  ngOnInit(): void {}

  databaseManagementService(serviceMedata: any): void {
    // Active loader when service is called
    serviceMedata.loading = true;
    let body = `{"${serviceMedata.name}":"ok"}`;
    let token = localStorage.getItem('CognitoAuthToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Authorization: token ? `Bearer ${token}` : 'undefined',
        'Access-Control-Allow-Origin': '*',
      }),
    };
    
    this.httpClient
      .post(environment.endpoint_uri, body, httpOptions)
      .subscribe((response) => {
        serviceMedata.loading = false;
        console.log(response);
        // TODO  Manage error/success response | throw snackbar with success/error to inform user

        return true;
      });
  }
}
