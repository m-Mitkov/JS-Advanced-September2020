const htmlElements = {
  'possibleAnswerFields': () => document.querySelectorAll('.answer-wrap'),
  'sectionQuestions': () => document.querySelectorAll('#quizzie > section'),
  'mainDiv': () => document.querySelector('#quizzie'),
}

function solve() {
  htmlElements.mainDiv().addEventListener('click', startQuiz);
}

let countPassedSections = 0;
let answers = { 'correct': 0, 'incorect': 0 };

function startQuiz(e) {
  const correctAnswers = ['onclick', 'JSON.stringify()', 'A programming API for HTML and XML documents'];
  let clickedPlace = e.target;

  if (countPassedSections < htmlElements.sectionQuestions().length) {
    if (clickedPlace.className == 'answer-text') {

      if (correctAnswers.includes(clickedPlace.innerHTML)) {
        answers.correct++;

      } else {
        answers.incorect++;
      }
    }

    htmlElements.sectionQuestions()[countPassedSections].style.display = 'none'
    countPassedSections++;
    
    if (countPassedSections < 3) {
      htmlElements.sectionQuestions()[countPassedSections].style.display = 'block'
    }

    if (countPassedSections == 3) {
      if (answers.correct == 3) {
        htmlElements.mainDiv().innerHTML = 'You are recognized as top JavaScript fan!';
        return;
      } else {
        console.log('wrong');
        htmlElements.mainDiv().innerHTML = `You have ${answers.correct} right answers.`;
        return;
      }
    }

  }
}
