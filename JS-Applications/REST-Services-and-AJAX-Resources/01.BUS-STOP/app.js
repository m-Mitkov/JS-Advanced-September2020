function getInfo() {
    const possibleOptions = [1287, 1308, 1327, 2334];
    let stopId = document.querySelector("#stopId").value;
    let stopName = document.querySelector("#stopName");

    if (!possibleOptions.some(x => x == stopId)) {
        stopName.innerHTML = 'Error';
        return;
    }

    let url = `https://judgetests.firebaseio.com/businfo/${stopId}.json`;
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', url);
    httpRequest.send();

    httpRequest.addEventListener('loadend', function () {
        var httpResponse = JSON.parse(this.responseText); // obj => name, buses [];
        stopName.innerHTML = httpResponse.name;
        let ulElementListBuses = document.getElementById('buses'); // ul

        Object.keys(httpResponse.buses).forEach(key => {
            let li = document.createElement('li');
            li.innerHTML = `Bus ${key} arrives in ${httpResponse.buses[key]}`;
            ulElementListBuses.appendChild(li);
        });
    });

    stopId.value = '';
}