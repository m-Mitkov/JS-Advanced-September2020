function solve() {

    class Product {
        constructor(manufacturer) {
            if (new.target === Product) {
                throw new Error('Cannot instantiate abstract class!');
            }
            this.manufacturer = manufacturer;
        }
    }

    class Keyboard extends Product{
        constructor(manufacturer, responseTime){
            super(manufacturer);
            this.responseTime = responseTime;
        }
    }

    class Monitor extends Product {
        constructor(manufacturer, width, height) {
            super(manufacturer);
            this.width = width;
            this.height = height;
        }
    }

    class Battery extends Product{
        constructor(manufacturer, expectedLife){
            super(manufacturer);
            this.expectedLife = expectedLife;
        }
    }

    class Computer extends Product {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace) {
            if (new.target === Computer) {
                throw new Error('Cannot instantiate abstract class!');
            }
    
            super(manufacturer);
            this.processorSpeed = processorSpeed;
            this.ram = ram;
            this.hardDiskSpace = hardDiskSpace;
        }
    }

    class Laptop extends Computer {
        constructor(manufacturer, processorSpeed, ram, hardDisk,
            weight, color, battery) {
                if (!(battery instanceof Battery)) {
                    throw new TypeError('Instance of object missing!');
                }
            super(manufacturer, processorSpeed, ram, hardDisk);
            this.weight = weight;
            this.color = color;
            this.battery = battery;
        }
    }

    class Desktop extends Computer{
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, keyboard, monitor){
            if (!(keyboard instanceof Keyboard) || !(monitor instanceof Monitor)) {
                throw new TypeError('Instance of object missing!');
            }
            super(manufacturer, processorSpeed, ram, hardDiskSpace);
            this.keyboard = keyboard;
            this.monitor = monitor;
        }
    }

    return {Keyboard, Monitor, Battery, Computer, Laptop, Desktop};
}

let app = solve();
let asd = new app.Keyboard('asd', 0001);
let dfg = new app.Monitor('wsdffdsfdsf', 321, 23);
let laptop = new app.Desktop('asus', 2.7, 8, 999, asd, dfg);
console.log(laptop);