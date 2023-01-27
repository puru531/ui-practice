//to show the seached results list
import icons from 'url:../../img/icons.svg';
import View from './view.js';
class ResultsView extends View{
    _parentEl = document.querySelector('.results');
    _errorMessage = 'No recipes found for your query. Please try again!';
    _message = '';

    _generateMarkup() {
        
        return this._data.map(this._generateMarkupPreview).join('');

    }
    _generateMarkupPreview(data) {
        return `
            <li class="preview">
            <a class="preview__link" href="#${data.id}">
              <figure class="preview__fig">
                <img src="${data.img}" alt="${data.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${data.title}</h4>
                <p class="preview__publisher">${data.publisher}</p>
              </div>
            </a>
          </li>
          `;
    }
}

export default new ResultsView();