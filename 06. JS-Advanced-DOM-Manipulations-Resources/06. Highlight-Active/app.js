function focus() {
    let inputFieldElement = document.querySelectorAll('div > input');

    for (const element of inputFieldElement) {
        element.addEventListener('focus', focusElement);
        element.addEventListener('blur', blurElement);
    }

    function focusElement(e) {
       let parent = e.target.parentElement;
       parent.classList.add('focused');
    }

    function blurElement(e){
        let parent = e.target.parentElement;
        parent.classList.remove('focused');
    }
}