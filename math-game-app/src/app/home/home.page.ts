import {Component} from '@angular/core';
import {Equation, MathService} from "../services/math.service";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    constructor(private mathService: MathService) {
    }

    equationNumberOne: number = 0;
    equationNumberTwo: number = 10;
    answerOne: number = 0;
    answerTwo: number = 10;
    answerThree: number = 0;

    difficultyChange(changeEvent: any) {

       const equation: Equation = this.mathService.getEquation(changeEvent.detail.value);

        this.equationNumberOne = equation.numberOne;
        this.equationNumberTwo = equation.numberTwo;
    }


    private setButtons(equation: Equation){

    }
}
