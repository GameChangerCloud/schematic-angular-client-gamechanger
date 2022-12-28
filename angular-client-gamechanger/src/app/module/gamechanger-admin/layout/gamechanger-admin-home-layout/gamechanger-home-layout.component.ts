import { Component, EnvironmentInjector, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-gamechanger-home-layout',
  templateUrl: './gamechanger-home-layout.component.html',
  styleUrls: ['./gamechanger-home-layout.component.scss']
})
export class GamechangerAdminHomeLayoutComponent implements OnInit {

  endpoint = environment.endpoint_uri
  apiAuthMechanism = environment.api_auth_mechanism
  // Fix schematics schema generator 
  gclSchema = `
  type Employe {
    id: ID!
    email: String!
    firstName: String
    lastName: String
    login: String!
    password: String!
    workInfo : Work
  }
  
  type Work {
    id: ID!
    job: String
    salary: String
    empl: [Employe]
  };`

  constructor() {
  }

  ngOnInit(): void {
 
  }


}
