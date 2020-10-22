class VeterinaryClinic {
    // clients[] =>  Obj {personName, pets[{ PetName, kind , [procedures]}]} 

    constructor(clinicName, capacity) {
        this.clinicName = clinicName;
        this.capacity = capacity;
        this.totalProfit = 0;
        this.clients = [];
        this.currentWorkLoad = 0;
    }

    getOwnerName(name) {

        let client = this.clients.find(x => x.ownerName == name);

        return client;
    }

    getPet(owner, petName) {
        if (!owner) {
            return;
        }

        return owner.pets.find(x => x.petName == petName);
    }

    newCustomer(ownerName, petName, kind, procedures) {
        if (this.currentWorkLoad >= this.capacity) {
            throw new Error('Sorry, we are not able to accept more patients!');
        }

        let currentOwner = this.getOwnerName(ownerName);
        let currentPet = this.getPet(currentOwner, petName);

        if (currentOwner && currentPet) {
            if (currentPet.procedures.length > 0) {
                throw new Error(`This pet is already registered under ${currentOwner.ownerName} name! ${currentPet.petName} is on our lists, waiting for ${currentPet.procedures.join(', ')}.`);
            } else {
                currentPet.procedures = procedures;
            }
        } else if (!currentOwner) {
            currentOwner = {
                ownerName,
                pets: [],
            }

            this.clients.push(currentOwner);
        }
        //Add pet to Owner
        currentOwner.pets.push({
            petName,
            kind,
            procedures,
        })
        //Modify workload
        this.currentWorkLoad++;

        return `Welcome ${petName}!`;
    }

    onLeaving(ownerName, petName) {
        let currentOwner = this.getOwnerName(ownerName);
        
        if (!currentOwner) {
            throw new Error('Sorry, there is such no client!');
        }
        
        let currentPet = this.getPet(currentOwner, petName);

        if (!currentPet || currentPet.procedures == 0) {
            throw new Error(`Sorry, there are no procedures for ${petName}`);
        }

        this.totalProfit += currentPet.procedures.length * 500;
        this.currentWorkLoad--;
        currentPet.procedures = [];

        return `Goodbye ${petName}. Stay safe!`;
    }

    toString() {
        let result = ``;
        let percentageOcupancy = Math.floor((this.currentWorkLoad / this.capacity) * 100);
        result += `${this.clinicName} is ${percentageOcupancy}% busy today!`;
        result += '\n';
        result += `Total profit: ${this.totalProfit}$`;
        
        this.clients.sort((x, y) => x.ownerName.localeCompare(y.ownerName));
        
        for (const client of this.clients) {
            client.pets.sort((a, b) => a.petName.localeCompare(b.petName));
            
            result += '\n'
            result += `${client.ownerName} with:`;

            for (const pet of client.pets) {
                result += '\n';
                result += `---${pet.petName} - a ${pet.kind.toLowerCase()} that needs: ${pet.procedures.join(', ')}`
            }
        }
        return result.trim();
    }
}

let clinic = new VeterinaryClinic('SoftCare', 10);
console.log(clinic.newCustomer('Jim Jones', 'Tom', 'Cat', ['A154B', '2C32B', '12CDB']));
console.log(clinic.onLeaving('Jim Jones', 'Tom'));
console.log(clinic.newCustomer('Jim Jones', 'Tom', 'Cat', ['A154B', '2C32B', '12CDB']));
console.log(clinic.newCustomer('Anna Morgan', 'Max', 'Dog', ['SK456', 'DFG45', 'KS456']));
console.log(clinic.newCustomer('Jim Jones', 'Tiny', 'Cat', ['A154B']));
console.log(clinic.onLeaving('Jim Jones', 'Tiny'));
clinic.newCustomer('Jim Jones', 'Sara', 'Dog', ['A154B']);
console.log(clinic.toString());