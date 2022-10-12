import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamechangerDynamicFormComponent } from './component/gamechanger-dynamic-form/gamechanger-dynamic-form.component';
import { QuestionDropdownComponent } from './component/question-inputs/question-dropdown/question-dropdown.component';
import { DynamicFormQuestionComponent } from './component/dynamic-form-question/dynamic-form-question.component';
import { ReactiveFormsModule } from '@angular/forms';
import { QuestionControlService } from './service/question-control.service';
import { QuestionService } from './service/question.service';



@NgModule({
  declarations: [
    GamechangerDynamicFormComponent,
    DynamicFormQuestionComponent,
    QuestionDropdownComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    GamechangerDynamicFormComponent
  ],
  providers:[
    QuestionControlService,
    QuestionService
  ]
})
export class GamechangerDynamicFormModule { }
