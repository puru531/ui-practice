//contains common functions of resultView and recipeView
import icons from 'url:../../img/icons.svg';
export default class View {
    _data;

    /**
     * Render the recived object to the DOM
     * @param {Object | Object[]} data The data to be rendered (e.g. a recipe or a list of of recipes)
     * @param {boolean} [render=true] if false, create markup string instead of rendering to the DOM
     * @return {undefined | string} A markup string is returned if render=false
     * @this {Object} View instance
     * @author Purushottam Kumar <purushottam1619@gmail.com>
     * @todo Finish implementation
    */
    render(data, render = true) {
        if(!data || (Array.isArray(data) && data.length === 0)) {
            this.renderError();
            return;
        } 
      this._data = data;
      const markup = this._generateMarkup();
      
      if(!render) return markup;

      this._clear();
      this._parentEl.insertAdjacentHTML('afterbegin', markup);
    }

    update(data) {
        this._data = data;
        const newMarkup = this._generateMarkup();

        //compare old markup with new markup and update it

        //convert new markup to a DOM element in order to compare old markup
        const newDom = document.createRange().createContextualFragment(newMarkup); 
        const newElements = Array.from(newDom.querySelectorAll('*')); //conver dom element to Array of nodes
        const currentElements = Array.from(this._parentEl.querySelectorAll('*'));

        //comparison of old markup with new markup
        newElements.forEach((newEl, i) => {
            const curEl = currentElements[i];

        ////////////Updates the current TEXT only,not attribute value i.e data-update-to attribute
            // console.log(curEl, newEl.isEqualNode(curEl)); //to check if two nodes are equal
            if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {    //to check if two nodes are equal or not ,,,,, and node has some text in it
                // console.log(newEl.firstChild.nodeValue); //inter text of changed values
                curEl.textContent = newEl.textContent;
            }

            //Updates the attribute value
            if(!newEl.isEqualNode(curEl)) {
                // console.log(newEl.attributes); //OBJECT of attributes of all the nodes that are changed
                Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));  //setting the attribute to current element
            }
        })
    }
  
    _clear() {
      this._parentEl.innerHTML = '';
    }
  
    renderSpinner() {
      const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
      `;
      this._clear();
      this._parentEl.insertAdjacentHTML('afterbegin', markup);
    };
  
    renderError(message = this._errorMessage) {
      const markup = ` 
          <div class="error">
              <div>
              <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
              </svg>
              </div>
              <p>${message}</p>
          </div>
      `;
      this._clear();
      this._parentEl.insertAdjacentHTML('afterbegin', markup);
    }
  
    renderMessage(message = this._message) {
      const markup = ` 
          <div class="message">
              <div>
              <svg>
                  <use href="${icons}#icon-smile"></use>
              </svg>
              </div>
              <p>${message}</p>
          </div>
      `;
      this._clear();
      this._parentEl.insertAdjacentHTML('afterbegin', markup);
    }

}
