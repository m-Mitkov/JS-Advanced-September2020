class Parking{
    constructor(capacity){
        this.capacity = capacity;
        this.vehicles = []; 
    }

    addCar(carModel, carNumber){
        if (this.vehicles.length === this.capacity) {
            throw new Error('Not enough parking space.');
        }else{
            let currentCar = {
                carModel,
                carNumber,
                payed: false,
            };

            this.vehicles.push(currentCar);

            return `The ${carModel}, with a registration number ${carNumber}, parked.`;
        }
    }

    removeCar(carNumber){
        let carToRemove = this.vehicles.find(x => x.carNumber == carNumber);

        if (!carToRemove) {
            throw new Error(`The car, you're looking for, is not found.`);
        }else{
            if (carToRemove.payed === false) {
                throw new Error(`${carNumber} needs to pay before leaving the parking lot.`);
            }else{
                this.vehicles.splice(x => x.carNumber === carNumber);

                return `${carNumber} left the parking lot.`;
            }
        }
    }

    pay(carNumber){
        let carToRemove = this.vehicles.find(x => x.carNumber == carNumber);

        if (!carToRemove) {
            throw new Error(`${carNumber} is not in the parking lot.`);
        }
        if (carToRemove.payed === true) {
            throw new Error(`${carNumber}'s driver has already payed his ticket.`);
        }else{
            carToRemove.payed = true;
            return `${carNumber}'s driver successfully payed for his stay.`;
        }
    }

    getStatistics(params) {
        let result = '';

        if (params === undefined) {
            result += `The Parking Lot has ${this.capacity - this.vehicles.length} empty spots left.`;

            this.vehicles = this.vehicles.sort((x, y) => x.carModel.localeCompare(y.carModel));
            for (let i = 0; i < this.vehicles.length; i++) {
                let currentVehcle = this.vehicles[i];

                result += '\n';
                result += `${currentVehcle.carModel} == ${currentVehcle.carNumber} - ${currentVehcle.payed === false ? 'Not payed' : 'Has payed'}`;
            }
        }else{
            let currentCar = this.vehicles.find(x => x.carNumber == params);

            result += `${currentCar.carModel} == ${currentCar.carNumber} - ${currentCar.payed === false ? 'Not payed' : 'Has payed'}`;
        }

        return result;
    }
}

const parking = new Parking(12);

console.log(parking.addCar("Volvo t600", "TX3691CA"));
console.log(parking.getStatistics('TX3691CA'));
console.log(parking.pay("TX3691CA"));
console.log(parking.removeCar("TX3691CA"));
