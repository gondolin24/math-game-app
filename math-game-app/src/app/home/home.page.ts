import {Component} from '@angular/core';
import {Equation, MathService} from "../services/math.service";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    placeHolderText = "+";
    buttonDisable = false;
    buttonOneColor: string;
    buttonTwoColor: string;
    buttonThreeColor: string;

    equationNumberOne: number;
    equationNumberTwo: number;
    answerOne: number;
    answerTwo: number;
    answerThree: number;

    private currentDiffictuly = "easy";

    constructor(private mathService: MathService) {
        this.setDefaultColors();
        this.difficultyChange(this.currentDiffictuly);
    }


    private setDefaultColors(): void {
        this.buttonOneColor = 'primary';
        this.buttonTwoColor = 'tertiary';
        this.buttonThreeColor = 'secondary';
    }

    private currentAnswer: number;

    difficultyChange(changeEvent: any) {
        let diff;
        if (changeEvent.detail) {
            diff = changeEvent.detail.value;
        } else {
            diff = changeEvent;
        }
        this.currentDiffictuly = diff;
        const equation: Equation = this.mathService.getEquation(diff);

        this.equationNumberOne = equation.numberOne;
        this.equationNumberTwo = equation.numberTwo;
        this.currentAnswer = equation.answer;
        this.setButtons(equation);
    }


    private setButtons(equation: Equation) {
        const answerPosition = this.mathService.getRandomInt(100);
        const randomInt = this.mathService.getRandomInt(100);


        if (answerPosition < 33) {
            this.answerOne = equation.answer;

            if (randomInt > 50) {
                this.answerThree = equation.badAnswerOne;
                this.answerTwo = equation.badAnswerTwo;
            } else {
                this.answerThree = equation.badAnswerTwo;
                this.answerTwo = equation.badAnswerOne;
            }

        } else if (answerPosition < 66) {
            this.answerTwo = equation.answer;

            if (randomInt > 50) {
                this.answerThree = equation.badAnswerOne;
                this.answerOne = equation.badAnswerTwo;
            } else {
                this.answerThree = equation.badAnswerTwo;
                this.answerOne = equation.badAnswerOne;
            }

        } else {
            this.answerThree = equation.answer;


            if (randomInt > 50) {
                this.answerOne = equation.badAnswerOne;
                this.answerTwo = equation.badAnswerTwo;
            } else {
                this.answerOne = equation.badAnswerTwo;
                this.answerTwo = equation.badAnswerOne;
            }

        }
    }

    protected answered(event: any) {
        if (event.value === this.currentAnswer) {
            //correct
            this.placeHolderText = "Correct";
            if (event.block === 'one') {
                this.buttonOneColor = 'success';
            } else if (event.block === 'two') {
                this.buttonTwoColor = 'success'
            } else {
                this.buttonThreeColor = 'success'
            }
        } else {
            this.placeHolderText = "Wrong";
            if (event.block === 'one') {
                this.buttonOneColor = 'danger';
            } else if (event.block === 'two') {
                this.buttonTwoColor = 'danger'
            } else {
                this.buttonThreeColor = 'danger'
            }
        }
        this.buttonDisable = true;

        setTimeout(() => {
            this.buttonDisable = false;
            this.placeHolderText = "+";
            this.setDefaultColors();
        }, 500);
        this.difficultyChange(this.currentDiffictuly);
    }

}
