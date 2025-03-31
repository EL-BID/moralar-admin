import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormComponentClass} from 'src/app/utils/classes/form-component.class';
import {trimWhiteSpace} from 'src/app/utils/functions/validators.function';
import {QUESTIONANSWER_TYPES_LIST} from 'src/app/utils/interfaces/questionnaires.interface';


@Component({
  selector: 'app-poll-form',
  templateUrl: './poll-form.component.html',
  styleUrls: ['./poll-form.component.sass']
})
export class PollFormComponent extends FormComponentClass implements OnInit {
  questionAnswerTypesList: any[] = QUESTIONANSWER_TYPES_LIST;
  questReg: FormGroup;
  desc: FormGroup;
  options: FormGroup;

  validador: any = false;

  get questionsForm(): FormArray {
    return this.questReg.controls.question as FormArray;
  }

  get descrForm(): FormArray {
    return this.desc.controls.description as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder
  ) {
    super();
    this.form = this.formBuilder.group({
      title: [null, Validators.compose([trimWhiteSpace, Validators.required])],
      typeQuiz: [1],
      questionRegister:
        this.questReg = this.formBuilder.group({
          question: this.formBuilder.array([])
        }),

    });
  }


  ngOnInit(): void {
    if (this.formData) {
      for (let i = 0; this.formData.questionViewModel.length > i; i++) {
        this.questionsForm.push(
          this.formBuilder.group({
            id: [this.formData.questionViewModel[i].id],
            nameQuestion: [this.formData.questionViewModel[i].nameQuestion, Validators.compose([trimWhiteSpace, Validators.required])],
            typeResponse: [this.formData.questionViewModel[i].typeResponse, Validators.required],
            description: [this.formData.questionViewModel[i].description]
          })
        );
      }
      this.verifyQuestionsWithDescriptions();
    }
  }

  private createQuestionForm(): FormGroup {
    return this.formBuilder.group({
      nameQuestion: [null, Validators.compose([trimWhiteSpace, Validators.required])],
      typeResponse: [0, Validators.required],
      description: this.formBuilder.array([])
    });
  }

  private createDes(): FormGroup {
    return this.formBuilder.group({
      description: [null, Validators.compose([trimWhiteSpace, Validators.required])]
    });
  }

  addQuestionForm(): void {
    this.validador = true;
    this.questionsForm.push(this.createQuestionForm());
    this.verifyQuestionsWithDescriptions();
  }

  removeQuestionForm(index: number): void {
    this.validador = true;
    this.questionsForm.removeAt(index);
    this.verifyQuestionsWithDescriptions();
  }

  addDescForm(i): void {
    this.questionsForm.value[i].description.push({description: ''});
    this.verifyQuestionsWithDescriptions();
  }

  removeDescForm(i, j): void {
    i.splice(j, 1);
    this.verifyQuestionsWithDescriptions();
  }

  verifyQuestionsWithDescriptions() {
    this.validador = true;
    let i;
    let j;
    for (i = 0; i < this.questionsForm.value.length; i++) {
      if (this.questionsForm.value[i].typeResponse > 0) {
        if (this.questionsForm.value[i].description.length > 0) {
          for (j = 0; j < this.questionsForm.value[i].description.length; j++) {
            if (!this.questionsForm.value[i].description[j].description) {
              this.validador = false;
            }
          }
        }else {
          this.validador = false;
        }
      }
    }
  }

}
