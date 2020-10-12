function lockedProfile() {
    let buttons = [...document.getElementsByTagName('button')];
    buttons.forEach(e => e.addEventListener('click', showHideInformation));

    function showHideInformation(event) {
        const button = event.target;
        const profile = button.parentNode;
        const hidenInformation = profile.getElementsByTagName('div')[0];
        const lockStatus = profile.querySelector('input[type="radio"]:checked').value;

        if (lockStatus === 'unlock') {
            if (button.innerHTML === 'Show more') {
                hidenInformation.style.display = 'inline-block';
                button.innerHTML = 'Hide it';
            } else if (button.innerHTML === 'Hide it') {
                hidenInformation.style.display = 'none';
                button.innerHTML = 'Show more';
            }
        }
    }
}