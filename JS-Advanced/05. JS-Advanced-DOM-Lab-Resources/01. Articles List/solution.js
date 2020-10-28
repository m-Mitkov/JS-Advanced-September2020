function createArticle() {
	let headingElement = document.createElement('h3');
	let titleInput = document.getElementById('createTitle');

	let contentElement = document.createElement('p');
	let textInput = document.getElementById('createContent');

	let articleElement = document.createElement('article');
	articleElement.appendChild(headingElement);
	articleElement.appendChild(contentElement);

	if (titleInput.value !== '' && textInput.value !== '') {
		headingElement.innerHTML = titleInput.value;
		contentElement.innerHTML = textInput.value;

		titleInput.value = '';
		textInput.value = '';

		let articleSectionElement = document.getElementById('articles');
		articleSectionElement.appendChild(articleElement);
	}
}