function RoadRadar(input) {
    const motorwayLimit = 130;
    const interstateLimit = 90;
    const cityLimit = 50;
    const residentialArea = 20;

    switch (input[1]) {
        case "city":
            SpeedReadar(cityLimit, input[0]);
            break;
        case "residential":
            SpeedReadar(residentialArea, input[0]);
            break;
        case "interstate":
            SpeedReadar(interstateLimit, input[0]);
            break;
        case "motorway":
            SpeedReadar(motorwayLimit, input[0]);
            break;
    }

    function SpeedReadar(speedLimit, currentSpeed) {
        let speedDifference = currentSpeed - speedLimit;

        if (currentSpeed > speedLimit) {

            if (speedDifference > 0 && speedDifference <= 20) {
                console.log("speeding");
            }
            else if (speedDifference > 20 && speedDifference <= 40) {
                console.log("excessive speeding");
            }
            else {
                console.log("reckless driving");
            }
        }
    }
}

RoadRadar([120, 'interstate'])
RoadRadar([21, 'residential'])
RoadRadar([200, 'motorway'])
RoadRadar(40, 'city')