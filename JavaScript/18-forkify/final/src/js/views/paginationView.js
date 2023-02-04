//to control the pagination
import icons from 'url:../../img/icons.svg';
import View from './view.js';

class PaginationView extends View{
    _parentEl = document.querySelector('.pagination');

    addHandlerClick(handler) {
        this._parentEl.addEventListener('click', function(e) {
            const btn = e.target.closest('.btn--inline');

            if(!btn) return;

            const gotoPage = +btn.dataset.goto;
            handler(gotoPage);
        });
    }

    _generateMarkup() {
        const curPage = this._data.page;
        //Compute number of pages
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        // console.log(numPages);

        //Pgae 1 and there are other pages 
        if(curPage === 1 && numPages > 1) {
            return `
                <button data-goto=${curPage + 1} class="btn--inline pagination__btn--next">
                    <span>Page ${curPage + 1}</span>
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
                <div class="pagination-desc">Page ${curPage} of ${numPages}</div>
            `;
        }
        //Last page
        if(curPage > 1 && curPage === numPages) {
            return `
                <button data-goto=${curPage - 1} class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${curPage - 1}</span>
                </button>
                <div class="pagination-desc">Page ${curPage} of ${numPages}</div>
            `;
        }
        //Other page in between
        if(curPage > 1 && curPage < numPages) {
            return `
                <button data-goto=${curPage - 1} class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${curPage - 1}</span>
                </button>
                <button data-goto=${curPage + 1} class="btn--inline pagination__btn--next">
                    <span>Page ${curPage + 1}</span>
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
                <div class="pagination-desc">Page ${curPage} of ${numPages}</div>
            `;
        }
        //Pgae 1 and there are NO other pages 
        return '';
    }

}

export default new PaginationView();