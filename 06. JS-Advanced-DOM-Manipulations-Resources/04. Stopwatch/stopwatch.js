function stopwatch() {
    let startButton = document.getElementById('startBtn');
    let stoptButton = document.getElementById('stopBtn');
    let time = document.getElementById('time');

    let seconds = 0, minutes = 0, counter = null;

    startButton.addEventListener('click', function () {
        seconds = '00';
        minutes = '00';
        time.textContent = `${minutes}:${seconds}`;
         counter = setInterval(timeCounter, 1000);
       
        stoptButton.disabled = false;
        startButton.disabled = true;
    });

    stoptButton.addEventListener('click', function(){
        stoptButton.disabled = true;
        startButton.disabled = false;
        clearInterval(counter);
    });

    function timeCounter(){
      seconds++;

      if (seconds < 10) {
          seconds = '0' + seconds;
      }

      if (seconds >= 60) {
          minutes++;
          if (minutes < 10) {
              minutes = '0' + minutes;
          }
          seconds = 0;
      }

      time.textContent = `${minutes}:${seconds}`;
    }
}