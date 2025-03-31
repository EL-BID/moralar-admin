import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormComponentClass } from 'src/app/utils/classes/form-component.class';
import { Enums } from 'src/app/utils/functions/enums.function';
import { trimWhiteSpace } from 'src/app/utils/functions/validators.function';
import { QUESTIONANSWER_TYPES_LIST } from 'src/app/utils/interfaces/questionnaires.interface';

@Component({
  selector: 'app-questionnaire-form',
  templateUrl: './questionnaire-form.component.html',
  styleUrls: ['./questionnaire-form.component.sass'],
})
export class QuestionnaireFormComponent
  extends FormComponentClass
  implements OnInit {
  questionAnswerTypesList: any[] = QUESTIONANSWER_TYPES_LIST;
  questReg: FormGroup;
  desc: FormGroup;
  options: FormGroup;

  validador: any = false;


  isEdit = false;

  get questionsForm(): FormArray {
    return this.questReg.controls.question as FormArray;
  }

  get descrForm(): FormArray {
    return this.desc.controls.description as FormArray;
  }

  constructor(private formBuilder: FormBuilder) {
    super();
    this.form = this.formBuilder.group({
      title: [null, Validators.compose([Validators.required])],
      typeQuiz: [0],
      questionRegister: (this.questReg = this.formBuilder.group({
        question: this.formBuilder.array([]),
      })),
    });
  }

  ngOnInit(): void {
    if (this.formData) {
      this.isEdit = this.formData?.id.length > 0;
      
      for (let i = 0; this.formData.questionViewModel.length > i; i++) {
        this.questionsForm.push(
          this.formBuilder.group({
            id: [this.formData.questionViewModel[i].id],
            nameQuestion: [
              this.formData.questionViewModel[i].nameQuestion,
              Validators.compose([trimWhiteSpace, Validators.required]),
            ],
            typeResponse: [
              Enums.getTypeResponse(this.formData.questionViewModel[i].typeResponse),
              Validators.required,
            ],
            description: [this.formData.questionViewModel[i].description],
          })
        );
      }
      this.verifyQuestionsWithDescriptions();
    }
  }

  private createQuestionForm(): FormGroup {
    return this.formBuilder.group({
      nameQuestion: [
        null,
        Validators.compose([trimWhiteSpace, Validators.required]),
      ],
      typeResponse: [0, Validators.required],
      description: this.formBuilder.array([]),
    });
  }

  private createDes(): FormGroup {
    return this.formBuilder.group({
      description: [
        null,
        Validators.compose([trimWhiteSpace, Validators.required]),
      ],
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
    this.questionsForm.value[i].description.push({ description: '' });
    this.verifyQuestionsWithDescriptions();
  }

  removeDescForm(i, j): void {
    i.splice(j, 1);
    this.verifyQuestionsWithDescriptions();
  }

  verifyQuestionsWithDescriptions() {
    this.validador = true;

    this.questionsForm.value.forEach((question) => {
      if (question.typeResponse > 0) {
        if (question.description.length > 0) {
          question.description.forEach((desc) => {
            if (!desc.description) {
              this.validador = false;
            }
          })
        } else {
          this.validador = false;
        }
      }
    })
  }

  handleChangeTypeResponse(questionForm: any): void {
    if (questionForm.value.typeResponse > 0) {
      if (questionForm.value.description.length === 0) {
        this.validador = false;
      } else {
        this.validador = true;
      }
    } else {
      const index = this.questionsForm.controls.findIndex((question) => question.value.id === questionForm.value.id);
      this.questionsForm.controls[index].value.description = [];
      this.validador = true;
    }
  }
}
