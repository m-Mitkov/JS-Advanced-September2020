function createArticle() {

	const htmlElements = {
		'titleInputElement': () => document.querySelector("#createTitle"),
		'createContentElements': () => document.querySelector('#createContent'),
		'articlesElement': () => document.querySelector('#articles'),
	};

	if (htmlElements.titleInputElement().value != '' && htmlElements.createContentElements().value != '') {
		let title = createElements('h3', htmlElements.titleInputElement().value);
		let content = createElements('p', htmlElements.createContentElements().value);

		let article = createElements('article', '');
		article.appendChild(title);
		article.appendChild(content);
		htmlElements.articlesElement().appendChild(article);

		htmlElements.titleInputElement().value = '';
		htmlElements.createContentElements().value = '';

		function createElements(element, textContext) {
			let result = document.createElement(element);
			result.innerHTML = textContext;

			return result;
		}
	}
}
