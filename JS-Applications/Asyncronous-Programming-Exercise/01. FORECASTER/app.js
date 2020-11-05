function attachEvents() {
    let URLgetLocations = `https://judgetests.firebaseio.com/locations.json`;
    let baseURL = `https://judgetests.firebaseio.com/forecast/`;
    let divForecast = document.querySelector("#forecast");

    let symbols = {
        Sunny: '&#x2600;', // ☀
        'Partly sunny': '&#x26C5;', // ⛅
        Overcast: '&#x2601;', // ☁
        Rain: '&#x2614;', // ☂
        Degrees: '&#176;' // °
    };

    let locationElement = document.getElementById('location');
    let buttonElement = document.getElementById('submit');

    buttonElement.addEventListener('click', (e) => {
        // e.preventDefault();

        fetch(URLgetLocations)
            .then(response => response.json())
            .then(data => {
                let { name, code } = data.find((city) => city.name === locationElement.value);
                locationElement.value = '';

                let currentForecast =
                    fetch(baseURL + `today/${code}.json`)
                        .then(response => response.json()
                        );

                let forecastForThreeDays =
                    fetch(baseURL + `upcoming/${code}.json`)
                        .then(response => response.json());

                Promise.all([currentForecast, forecastForThreeDays])
                    .then(([currentDayForecast, forecastThreeDays]) => {
                        createForecast(currentDayForecast, forecastThreeDays);
                    })
                    .catch((e) => console.log(e));
            });

    });

    function createForecast(currentForecast, forecastForThreeDays) {
        createForecastForTheDay(currentForecast);
        createForecastForThreeDays(forecastForThreeDays);
    }

    function createForecastForTheDay(currentForecast) {
        let divCondition = createElement('div', 'forecast', '');
        let spanEmojiElement = createElement('span', 'condition symbol', symbols[currentForecast.forecast.condition]);
        divCondition.appendChild(spanEmojiElement);

        let conditionSpanElement = createElement('span', 'condition', '');
        let cityElement = createElement('span', 'forecast-data', currentForecast.name);
        let highLowTemperatureElement = createElement('span', 'forecast-data', `${currentForecast.forecast.low}/${currentForecast.forecast.high}`);
        let conditionElement = createElement('span', 'forecast-data', currentForecast.forecast.condition);

        conditionSpanElement.appendChild(cityElement);
        conditionSpanElement.appendChild(highLowTemperatureElement);
        conditionSpanElement.appendChild(conditionElement);

        divCondition.appendChild(conditionSpanElement);

        let divIDcurrent = document.getElementById('current');
        divIDcurrent.appendChild(divCondition);
        divForecast.style = 'block'
    }

    function createForecastForThreeDays(forecastForThreeDays) {

        let divUpcoming = document.getElementById('upcoming');
        let divForecastInfo = createElement('div', 'forecast-info', '');

        for (let i = 0; i < forecastForThreeDays.forecast.length; i++) {
            let currentDay = forecastForThreeDays.forecast[i];
            let spanUpcoming = createElement('span', 'upcoming', '');

            let symbolElement = createElement('span', 'symbol', symbols[currentDay.condition]);
            let highLowTemperatureElement = createElement('span', 'forecast-data', `${currentDay.low}/${currentDay.high}`);
            let conditionElement = createElement('span', 'forecast-data', currentDay.condition);

            spanUpcoming.appendChild(symbolElement);
            spanUpcoming.appendChild(highLowTemperatureElement);
            spanUpcoming.appendChild(conditionElement);
            divForecastInfo.appendChild(spanUpcoming);
        }

        divUpcoming.appendChild(divForecastInfo);
    }

    function createElement(element, $class, textContent) {
        let result = document.createElement(element);
        result.className = $class;
        result.innerHTML = textContent;

        return result;
    }
}

attachEvents();