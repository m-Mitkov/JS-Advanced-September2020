class Balloon{
    constructor(color, gasWeight) {
        this.color = color;
        this.gasWeight = Number(gasWeight);
    }
}

class PartyBalloon extends Balloon {
    constructor(color, gasWeight, ribbonCollor, ribbonLength) {
        super(color, gasWeight);
        this._ribbon = { color: ribbonCollor, length: ribbonLength };
    }

    get ribbon() {
        return this._ribbon;
    }

}

class BirthdayBalloon extends PartyBalloon {
    constructor(color, gasWeight, ribbonCollor, ribbonLength, text){
        super(color, gasWeight, ribbonCollor, ribbonLength);
        this._text = text;
    }

    get text() {
        return this._text;
    }
}

