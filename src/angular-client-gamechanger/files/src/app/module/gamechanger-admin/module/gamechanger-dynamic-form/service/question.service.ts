import { Injectable } from '@angular/core';
import { DropdownQuestion } from '../models/questions/question-dropdown';
import { QuestionBase } from '../models/questions/question-base';
import { TextboxQuestion } from '../models/questions/question-textbox';
import { NumberQuestion } from '../models/questions/question-number';
import { of } from 'rxjs';

@Injectable()
export class QuestionService {
  // TODO: get from a remote source of question metadata
  getQuestions(fields: any, type: 'update' | 'add',entity:any) {

    const questions: QuestionBase<string>[] = [];

    for (let i = 0; i < fields.Employe.fields.length; i++) {
      const field = fields.Employe.fields[i];
      questions.push(this.generateQuestionInput(field, field.type, type,entity));
    }

    return of(questions.sort((a, b) => a.order - b.order));
  }

  generateQuestionInput(
    field: any,
    inputType: 
    <% for (let i = 0; i < types.length; i++) { %> 
      "<%=types[i].typeName%>"|
    <% } %> 
    'String' | 
    'Number' | 
    'ID', 
    type: 'update' | 'add',
    entity:any
  ): QuestionBase<string> {
    let input;
    switch (inputType) {
      case 'String':
        input = new TextboxQuestion({
          key: field.name,
          label: field.name,
          required: field.noNull,
          order: 1,
        });
        break;
      case 'Number':
        input = new TextboxQuestion({
          key: field.name,
          label: field.name,
          required: field.noNull,
          order: 1,
          type: 'number',
        });
        break;
      case 'ID':
        console.log('========> ID',field);

        input = new TextboxQuestion({
          key: field.name,
          label: field.name,
          required: field.noNull,
          order: 1,
          type: 'number',
          disabled: true
        });
        break;
        <% for (let i = 0; i < types.length; i++) { %> 
          case '<%=types[i].typeName%>':  
          input = new TextboxQuestion({
            key: field.name,
            label: field.name,
            required: field.noNull,
            order: 1,
          });
          break;
        <% } %> 

      default:
        input = new TextboxQuestion({
          key: 'field.name',
          label: 'field.name',
          required: true,
          order: 1,
        });
        break;
    }
    console.log(entity);
    
    if(type === 'update'){
      console.log(entity[field.name]);
      
      input.value = entity[field.name]
    }
    return input;
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
