function solve() {
    let divInputSections = document.querySelector("body > main > section.admin-view.section-view > div > div > form");
    let trainingsSection = document.querySelector("body > main > section.user-view.section-view > div");


    let addButton = divInputSections.lastElementChild;

    addButton.addEventListener('click', (e) => {
        e.preventDefault();

        let moduleElement = document.querySelector("body > main > section.admin-view.section-view > div > div > form > div:nth-child(1) > input[type=text]")
        let dateElement = document.querySelector("body > main > section.admin-view.section-view > div > div > form > div:nth-child(2) > input[type=datetime-local]")
        let lectureElement = document.querySelector("body > main > section.admin-view.section-view > div > div > form > div:nth-child(3) > select")

        var ModuleIndex = lectureElement.options[lectureElement.selectedIndex].value;

        if (lectureElement.value === '' || dateElement.value === '' ||  ModuleIndex === 'Select module') {
            return;
        } else {


            let  = document.querySelectorAll('div.module > h3');
           let modulesElement = document.querySelectorAll("body > main > section.user-view.section-view > div");
           console.log(modulesElement);


            
            let h3Keeper = document.querySelectorAll('div.module > h3');
            let array = Array.from(h3Keeper).filter(x => x.innerText === lectureElement.value.toUpperCase() + "-MODULE")
            let divElement = document.createElement('div');
            if (array.length > 0) {
                divElement = array[0].parentElement
            } else {
                divElement.className = 'module';
                let headerElement = document.createElement('h3');
                headerElement.innerHTML = lectureElement.value.toUpperCase() + "-MODULE";
                divElement.appendChild(headerElement);
            }


            let ulElement = document.createElement('ul');

            let liElement = document.createElement('li');
            liElement.className = 'flex';

            let h4Element = document.createElement('h4');
            let date = new Date(dateElement.value);
            var options = { year: 'numeric', month: '2-digit', day: '2-digit'};

            h4Element.innerHTML = `${moduleElement.value} - ${new Intl.DateTimeFormat('en-US', options).format(date)} - 18:00`;

            let deleteButton = document.createElement('button');
            deleteButton.className = 'red';
            deleteButton.innerHTML = 'Del';

            liElement.appendChild(h4Element);
            liElement.appendChild(deleteButton);
            
            ulElement.appendChild(liElement);

            divElement.appendChild(ulElement);
            trainingsSection.appendChild(divElement);   

            deleteButton.addEventListener('click', (e) => {
                if (ulElement.hasChildNodes()) {
                    ulElement.removeChild(liElement);
                    let ulToRemove = ulElement.parentElement;
                    ulToRemove.removeChild(ulElement);
                    if (ulToRemove.childNodes.length <= 1) {

                        let parentElemet = ulToRemove.parentElement;
                        
                        parentElemet.removeChild(ulToRemove);
                    }
                }
            })
        }
    })
};