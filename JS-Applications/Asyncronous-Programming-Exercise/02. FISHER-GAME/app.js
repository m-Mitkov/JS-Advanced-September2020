function attachEvents() {
    let getPostUrl = `https://fisher-game.firebaseio.com/catches.json`;
    let deleteUpdateURL = `https://fisher-game.firebaseio.com/catches/`
    let loadButton = document.querySelector("body > aside > button");
    let addButton = document.querySelector("#addForm > button");

    doAddFunction();
    doLoadFunction();

    function doAddFunction() {
        addButton.addEventListener('click', addCatchFunction);

        function addCatchFunction() {
            fetch(getPostUrl, {
                method: 'POST',
                body: getInfoInput(),
            });
        }

        function getInfoInput() {
            let anglerElement = document.querySelector("#addForm > input.angler");
            let weightElement = document.querySelector("#addForm > input.weight");
            let speciesElement = document.querySelector("#addForm > input.species");
            let locationElement = document.querySelector("#addForm > input.location");
            let baitElement = document.querySelector("#addForm > input.bait");
            let captureTimeElement = document.querySelector('#addForm > input.captureTime');

            let obj = {
                angler: anglerElement.value,
                weight: weightElement.value,
                species: speciesElement.value,
                location: locationElement.value,
                bait: baitElement.value,
                captureTime: captureTimeElement.value,
            };

            anglerElement.value = '';
            weightElement.value = '';
            speciesElement.value = '';
            locationElement.value = '';
            baitElement.value = '';
            captureTime.value = '';

            return JSON.stringify(obj);
        }
    }

    function doLoadFunction() {
        loadButton.addEventListener('click', loadFunction);

        function loadFunction() {
            fetch(getPostUrl)
                .then(response => response.json()
                    .then(data => createElementsForCurrentCatch(data)));
        }

        function createElementsForCurrentCatch(data) {
            Object.keys(data).forEach(key => {
                appednCatchElements(key, data);
            });
        }

        function appednCatchElements(key, data) {
            let { angler, weight, species, location, bait, captureTime } = data[key];

            let divCatch = createElement('div', 'catch', '', '');
            divCatch.setAttribute('data-id', key);

            let anglerLabel = createElement('label', '', 'Angler', '');
            let anglerInput = createElement('input', 'angler', angler, 'text');
            let hr1 = createElement('hr', '', '', '');

            let weightLabel = createElement('label', '', 'Weight', '');
            let weightInput = createElement('input', 'weight', weight, 'number');
            let hr2 = createElement('hr', '', '', '');

            let speciesLabel = createElement('label', '', 'Species', '');
            let speciesInput = createElement('input', 'species', species, 'text');
            let hr3 = createElement('hr', '', '', '');

            let locationLabel = createElement('label', '', 'location', '');
            let locationInput = createElement('input', 'Location', location, 'text');
            let hr4 = createElement('hr', '', '', '');

            let baitLabel = createElement('label', '', 'bait', '');
            let baitInput = createElement('input', 'Bait', bait, 'text');
            let hr5 = createElement('hr', '', '', '');

            let captureTimeLabel = createElement('label', '', 'captureTime', '');
            let captureTimeInput = createElement('input', 'captureTime', captureTime, 'text');
            let hr6 = createElement('hr', '', '', '');

            let updateButton = createElement('button', 'update', 'Update', '');
            let deleteButton = createElement('button', 'delete', 'Delete', '');

            deleteButton.addEventListener('click', () => {
                fetch(deleteUpdateURL + `${key}.json`, {
                    method: 'DELETE',
                });
            });

            updateButton.addEventListener('click', () => {

                let newObj = JSON.stringify({
                    angler: anglerInput.value,
                    weight: weightInput.value,
                    species: speciesInput.value,
                    location: locationInput.value,
                    bait: baitInput.value,
                    captureTime: captureTimeInput.value,
                });

               fetch(deleteUpdateURL + `${key}.json`, {
                   method: "PUT",
                   body: newObj
               });
            })

            divCatch.appendChild(anglerLabel);
            divCatch.appendChild(anglerInput);
            divCatch.appendChild(hr1);
            divCatch.appendChild(weightLabel);
            divCatch.appendChild(weightInput);
            divCatch.appendChild(hr2);
            divCatch.appendChild(speciesLabel);
            divCatch.appendChild(speciesInput);
            divCatch.appendChild(hr3);
            divCatch.appendChild(locationLabel);
            divCatch.appendChild(locationInput);
            divCatch.appendChild(hr4);
            divCatch.appendChild(baitLabel);
            divCatch.appendChild(baitInput);
            divCatch.appendChild(hr5);
            divCatch.appendChild(captureTimeLabel);
            divCatch.appendChild(captureTimeInput);
            divCatch.appendChild(hr6);
            divCatch.appendChild(updateButton);
            divCatch.appendChild(deleteButton);

            let divCatches = document.querySelector("#catches");
            divCatches.appendChild(divCatch);
        }

        function createElement(element, $class, content, type) {
            let newElement = document.createElement(element);

            if (element === 'input') {
                newElement.type = type;
                newElement.value = content;
            } else {
                newElement.innerHTML = content;
            }
            if (element === 'hr') {
                return newElement;
            }
            newElement.className = $class;

            return newElement;
        }
    }
}

attachEvents();

