import { Component, EnvironmentInjector, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GamechangerParserService } from '../../services/gamechanger-parser.service';



@Component({
  selector: 'app-gamechanger-home-layout',
  templateUrl: './gamechanger-home-layout.component.html',
  styleUrls: ['./gamechanger-home-layout.component.scss']
})
export class GamechangerAdminHomeLayoutComponent implements OnInit {

  endpoint = environment.endpoint_uri
  apiAuthMechanism = environment.api_auth_mechanism
  gclSchema = ''

  constructor(gamechangerParserService:GamechangerParserService) {
    this.gclSchema = gamechangerParserService.getJsonGraphQlSchema()
  }

  ngOnInit(): void {
   
  }


}
