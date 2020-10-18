class Employee {
    constructor(name, age) {

        if (new.target === Employee) {
            throw new Error('Cannot instantiate directly.');
        }

        this.name = name;
        this.age = age;
        this.salary = 0;
        this.tasks = [];
    }


    work() {
        let currentTask = this.tasks.shift();
        console.log(currentTask);
        this.tasks.push(currentTask);
    }

    getSalary() {
        return this.salary;
    }

    collectSalary() {
        console.log(`${this.name} recceived ${this.getSalary()} this month`);
    }
}

class Junior extends Employee {
    constructor(name, age) {
        super(name, age);
        this.tasks.push(`${this.name} is working on a simple task.`);
    }
}

class Senior extends Employee {
    constructor(name, age) {
        super(name, age);
        this.tasks.push(`${this.name} is working on a simple task.`);
        this.tasks.push(`${this.name} is taking time off work`);
        this.tasks.push(`${this.name} is supervising junior workers.`);
    }
}

class Manager extends Employee {
    constructor(name, age, dividend) {
        super(name, age);
        this.tasks.push(`${this.name} scheduled a meetig`);
        this.tasks.push(`${this.name} is preparing a quartely report.`);
        this.dividend = dividend;
    }
    
    getSalary() {
        return this.salary += this.dividend;
    }
}


