function carFactory(obj) {

    function createEngine(hp) {
        let engine = { };

        if (hp <= 90) {
            engine.power = 90;
            engine.carFactory = 1800;
        } else if (hp <= 120) {
            engine.power = 120;
            engine.volume = 2400;
        } else {
            engine.power = 200;
            engine.volume = 3500;
        }

        return engine;
    }

    function createCarrige(customColor, type) {
        const carrige = { type, customColor};

        return carrige;
    }

    function createWheels(inches) {
        let inchesWheels = inches % 2 == 0 ? inches - 1 : inches;
        const wheels = new Array(4).fill(inchesWheels);
        return wheels;
    }

    return {
        model: obj.model,
        engine: createEngine(obj.power),
        carrige: createCarrige(obj.carrige, obj.color),
        wheels: createWheels(obj.wheelsize)
    };
}