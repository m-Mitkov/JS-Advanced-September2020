function attachGradientEvents() {
    let measuringBar = document.getElementById('gradient');
    let result  = document.getElementById('result');
   
    measuringBar.addEventListener('click', e => {
        let clickedPlace = e.offsetX;
        let width = e.currentTarget.offsetWidth;
        let percentage = Math.floor((clickedPlace / width) * 100);
        result.innerHTML = percentage + '%';
    })
}