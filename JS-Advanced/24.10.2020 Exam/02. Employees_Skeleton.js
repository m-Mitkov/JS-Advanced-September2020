function solveClasses() {

    class Developer {
        constructor(firstName, lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.baseSalary = 1000;
            this.tasks = [];
            this.experience = 0;
        }

        addTask(id, taskName, priority) {
            let currentTask = {
                id,
                taskName,
                priority
            };

            if (priority === 'high') {
                this.tasks.unshift(currentTask);
            } else {
                this.tasks.push(currentTask);
            }

            return `Task id ${id}, with ${priority} priority, has been added.`;
        }

        doTask() {
            if (this.tasks.length > 0) {
                let currentTask = this.tasks.shift();
                return `${currentTask.taskName}`;
            } else {
                return `${this.firstName}, you have finished all your tasks. You can rest now.`
            }
        }

        getSalary() {
            return `${this.firstName} ${this.lastName} has a salary of: ${this.baseSalary}`;
        }

        reviewTasks() {
            let result = '';
            result += 'Tasks, that need to be completed:';
            if (this.tasks.length > 0) {
                for (let index = 0; index < this.tasks.length; index++) {
                    let currentTask = this.tasks[index];

                    result += '\n';
                    result += `${currentTask.id}: ${currentTask.taskName} - ${currentTask.priority}`;
                }

                return result;
            }
        }
    }

    class Junior extends Developer {
        constructor(firstName, lastName, bonus, experience) {
            super(firstName, lastName);
            this.baseSalary = 1000 + Number(bonus);
            this.tasks = [];
            this.experience = Number(experience);
        }

        learn(years) {
            this.experience += years;
        }
    }

    class Senior extends Developer{
        constructor(firstName, lastName, bonus, experience){
            super(firstName, lastName);
            this.baseSalary = 1000 + Number(bonus);
            this.tasks = [];
            this.experience = Number(experience) + 5;
        }

        changeTaskPriority(taskId) {
            let taskToChangePriority = this.tasks.find(x => x.id == taskId);

            if (!taskToChangePriority) {
                return;
            }else{
                if (taskToChangePriority.priority === 'high') {
                    taskToChangePriority.priority = 'low';
                    this.tasks.splice(x => x.id === taskId);
                    this.tasks.push(taskToChangePriority);
                }else{
                    taskToChangePriority.priority = 'high';
                    this.tasks.splice(x => x.id === taskId);
                    this.tasks.unshift(taskToChangePriority);
                }
            }

            return taskToChangePriority;
        }
    }

    return {
        Developer,
        Junior,
        Senior
    }
}

let classes = solveClasses();
// const developer = new classes.Developer("George", "Joestar");
// console.log(developer.addTask(1, "Inspect bug", "low"));
// console.log(developer.addTask(2, "Update repository", "high"));
// console.log(developer.reviewTasks());
// console.log(developer.getSalary());

// const junior = new classes.Junior("Jonathan", "Joestar", 200, 2);
// console.log(junior.getSalary());

const senior = new classes.Senior("Joseph", "Joestar", 200, 2);
senior.addTask(1, "Create functionality", "low");
senior.addTask(2, "Update functionality", "high");
console.log(senior.changeTaskPriority(1)["priority"]);


