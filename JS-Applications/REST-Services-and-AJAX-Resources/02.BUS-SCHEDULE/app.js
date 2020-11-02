function solve() {
    let currentStop = 'depot';
    let currentstopName;
    let baseUrl = `https://judgetests.firebaseio.com/schedule/`;
    let departButton = document.querySelector("#depart");
    let arriveButton = document.querySelector("#arrive");

    let infoElement = document.querySelector("#info")

    function depart() {
        let url = `${baseUrl}${currentStop}.json`;
        fetch(url)
            .then(response => response.json()) // return promise => parse it as json
            .then(data => {
                currentStop = data.next;
                infoElement.innerHTML = `Next stop ${data.name}`;
                currentstopName = data.name;
            });

        arriveButton.disabled = false;
        departButton.disabled = true;
    }

    function arrive() {
        infoElement.innerHTML = `Arriving at ${currentstopName}`;

        arriveButton.disabled = true;
        departButton.disabled = false;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();