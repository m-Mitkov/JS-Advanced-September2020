function solve() {
    let form = document.getElementById('container');
    let petListForAdoption = document.querySelector('#adoption > ul');
    let adopted = document.querySelector('#adopted > ul');

    let [name, age, kind, currentOwner, addBtn] = Array.from(form.children);
    addBtn.addEventListener('click', adoptPet);

    function adoptPet(e) {
        e.preventDefault();
        if (!(name.value && Number(age.value) && kind.value && currentOwner.value)) {
            return;
        }

        let li = document.createElement('li');
        let paragraph = document.createElement('p');
        paragraph.innerHTML = `<strong>${name.value}</strong> is a <strong>${age.value}</strong> year old <strong>${kind.value}</strong>`
        let spanElement = document.createElement('span');
        spanElement.innerHTML = `Owner: ${currentOwner.value}`;

        let buttonContactOwner = document.createElement('button');
        buttonContactOwner.innerHTML = 'Contact with owner';
        
        li.appendChild(paragraph);
        li.appendChild(spanElement);
        li.appendChild(buttonContactOwner);
        petListForAdoption.appendChild(li);
        
        name = '';
        age = '';
        kind = '';
        currentOwner = '';
        addBtn = '';
        buttonContactOwner.addEventListener('click', contactOwnerFunction)
    }

    function contactOwnerFunction(e) {
        let parentElement = e.target.parentElement;
        e.target.remove();

        let divElement = document.createElement('div');
        let inputElement = document.createElement('input');
        inputElement.setAttribute('placeholder', 'Enter your names');
        let btnITakeIt = document.createElement('button');
        btnITakeIt.innerHTML = 'Yes! I take it!';

        divElement.appendChild(inputElement);
        divElement.appendChild(btnITakeIt);
        parentElement.appendChild(divElement);

        btnITakeIt.addEventListener('click', moveToAdoptedSection);
    }

    function moveToAdoptedSection(e) {
        let parentButtonElement = e.currentTarget.parentElement;
        let liElement = parentButtonElement.parentElement;

        let newOwnerInputElement = liElement.querySelector('input');
        let ownerNameSpanElement = liElement.querySelector('span');

        let newOwnerName = newOwnerInputElement.value;

        if (!newOwnerName) {
            return;
        }

        ownerNameSpanElement.textContent = `New Owner: ${newOwnerName}`;

        adopted.appendChild(liElement);

        parentButtonElement.remove();

        let checkedButtonElement = document.createElement('button');
        checkedButtonElement.textContent = 'Checked';

        liElement.appendChild(checkedButtonElement);

        checkedButtonElement.addEventListener('click', e => {
            // liElement.remove();
            e.currentTarget.parentElement.remove();
        });
    }
}
