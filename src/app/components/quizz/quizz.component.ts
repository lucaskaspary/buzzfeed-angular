import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json"

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  title:string = "";

  questions:any;
  questionSelected:any;

  answers:string[] = [];
  answerSelected: string = "";

  questionIndex:number = 0;
  questionMaxIndex:number = 0;

  isFinished:boolean = false;

  constructor() { }

  ngOnInit(): void {
    if(quizz_questions) {
      this.isFinished = false;
      this.title = quizz_questions.title;

      this.questions = quizz_questions.questions;
      this.questionIndex = 0;
      this.questionSelected = this.questions[this.questionIndex];
      this.questionMaxIndex = this.questions.length;
    }
  }

  playerChoice(alias:string){
    this.answers.push(alias);
    this.nextStep();
  }

  async nextStep() {
    this.questionIndex++;

    if(this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      this.isFinished = true;
      const finalAnswer:string = await this.checkResult();
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results];
    }
  }

  async checkResult() {
    return this.answers.reduce((previous, current, i, arr) => {
      if(
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
      ){
        return previous;
      }else{
        return current;
      }
    })
  }


}
