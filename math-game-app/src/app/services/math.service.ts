import {Injectable} from "@angular/core";


export class Equation {
    numberOne: number;
    numberTwo: number;
    answer: number;
    badAnswerOne: number;
    badAnswerTwo: number;
}

@Injectable({
    providedIn: 'root',
})
export class MathService {

    getEquation(difficulty: string): Equation {

        const max: number = this.getNumberRange(difficulty);
        let finalEquation: Equation = new Equation();
        finalEquation.numberOne = this.getRandomInt(max);
        finalEquation.numberTwo = this.getRandomInt(max);
        finalEquation.answer = finalEquation.numberTwo + finalEquation.numberOne;
        finalEquation.badAnswerOne = this.getBadAnswer(max);
        finalEquation.badAnswerTwo = this.getBadAnswer(max);
        return finalEquation;
    }


    private getBadAnswer(max: number): number {
        const spread = Math.floor(max * .1);
        if (this.getRandomInt(10) > 5) {
            return this.getRandomInt(max - spread)
        } else {
            return this.getRandomInt(max + spread)
        }

    }

    private getNumberRange(difficulty: string): number {
        if (difficulty === "easy") {
            return 10;
        } else if (difficulty === "medium") {
            return 100;
        } else if (difficulty === "hard") {
            return 1000;
        } else if (difficulty === "master") {
            return 10000;
        }
    }

    private getRandomInt(max): number {
        return Math.floor(Math.random() * Math.floor(max));
    }

}

