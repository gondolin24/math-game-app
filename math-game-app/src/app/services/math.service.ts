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
        finalEquation.badAnswerOne = this.getBadAnswer(max, finalEquation.answer);
        finalEquation.badAnswerTwo = this.getBadAnswer(max, finalEquation.answer);
        while (finalEquation.badAnswerOne === finalEquation.badAnswerTwo) {
            finalEquation.badAnswerTwo = this.getBadAnswer(max, finalEquation.answer);
        }


        return finalEquation;
    }


    private getBadAnswer(max: number, answer: number): number {
        let spread = 0;

        while (spread == 0) {
            spread = this.getRandomInt(Math.floor(max * 0.2));
        }

        if (this.getRandomInt(10) > 5) {
            return answer - spread
        } else {
            return answer + spread
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

    public getRandomInt(max): number {
        return Math.floor(Math.random() * Math.floor(max));
    }

}

