//to show the seached results list
import icons from 'url:../../img/icons.svg';
import View from './view.js';
import previewView from './previewView.js';

class BookmarksView extends View{
    _parentEl = document.querySelector('.bookmarks__list');
    _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it!';
    _message = '';

    addHanderRender(handler) {
        window.addEventListener('load', handler);
    }

    _generateMarkup() {
        
        return this._data.map(bookmark => previewView.render(bookmark, false)).join('');

    }


        /* OR
    _generateMarkup() {
        
        return this._data.map(this._generateMarkupPreview).join('');

    }
    _generateMarkupPreview(data) {
        //storing the current recipe being shown in detail --> if this id and list of recipes id is same then preview__link--active class will be added
        const id = window.location.hash.slice(1);
        return `
            <li class="preview">
            <a class="preview__link ${data.id === id ? 'preview__link--active' : ''}" href="#${data.id}">
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
    */
   
}

export default new BookmarksView();