import { camelize } from '@angular-devkit/core/src/utils/strings';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GamechangerParserService } from 'src/app/module/gamechanger-admin/services/gamechanger-parser.service';
import { QuestionBase } from '../../models/questions/question-base';
import { QuestionControlService } from '../../service/question-control.service';
import { QuestionService } from '../../service/question.service';
<% for (let i = 0; i < types.length; i++) { %> 
import {<%=types[i].typeName%>Service} from 'src/app/store/service/<%=camelize(types[i].typeName)%>.service';
<% } %> 

@Component({
  selector: 'gamechanger-dynamic-form',
  templateUrl: './gamechanger-dynamic-form.component.html',
  styleUrls: ['./gamechanger-dynamic-form.component.scss']
})

export class GamechangerDynamicFormComponent implements OnInit {

  @Input() type!: 'update' | 'add';
  @Input() entity!:any;
  @Input() activeEntity:any ;
  questions: QuestionBase<string>[] | null = [];
  form!: FormGroup;
  payLoad = '';
  questions$!: Observable<QuestionBase<any>[]>;

  constructor(
    private route: ActivatedRoute,
    private qcs: QuestionControlService, 
    private qs: QuestionService, 
    private schemaTypes: GamechangerParserService,
    <% for (let i = 0; i < types.length; i++) { %> 
    private <%=decamelize(types[i].typeName)%>Service : <%=types[i].typeName%>Service,
    <% } %> 
    // GENERATED : private <entity_name>Service: <entity_name>Service,
  ){
    this.activeEntity = this.route.snapshot.paramMap.get('model');
  }

  ngOnInit() {
    let types = this.schemaTypes.getSchemaTypes()
    let activeType:any = types.filter(type => type.typeName === `${this.activeEntity.charAt(0).toUpperCase() + this.activeEntity.slice(1)}`)
    this.questions$ = this.qs.getQuestions(activeType[0].fields,this.type,this.entity);

    this.questions$.subscribe(questions=>{
      this.questions = questions
      this.form = this.qcs.toFormGroup(questions as QuestionBase<string>[]);
    })
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
    this.addEntitie(this.payLoad)
  }

  addEntitie(entity:any): void {
    // GENERATED TODO : BIND <ENTITY-NAME> TO USE RIGHT ENTITY SERVICE
    eval(`this.${this.activeEntity}Service.add(${entity});`)  
  }

}
