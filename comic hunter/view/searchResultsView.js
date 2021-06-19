import View from "./view.js";

class SeachResultsView extends View {
  _parentElement = document.querySelector(".movie_left");
  _searchField = document.querySelector(".searchField");
  _searchForm = document.querySelector(".searchForm");
  _searchIcon = document.querySelector(".fa-search");
  getQuery() {
    const query = this._searchField.value;
    this._searchField.value = "";
    return query;
  }
  addHandlerClick(handler) {
    this._searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  addHandlerClickOnIcon(handler) {
    this._searchIcon.addEventListener("click", function (e) {
      e.preventDefault();
      handler();
    });
  }

  clear() {
    this._parentElement.innerHTML = "";
  }

  _generateMarkUp(data) {
    return data
      .map((data) => {
        const id = window.location.hash.slice(1);
        const markup = `
        <a href="#${data.id}">
        <div class="movie_preview">
          <div class="movie_img">
            <img src="${data.image.url}" alt="iron" />
          </div>
          <div class="movie_img_txt">
            <div class="movie_label">
          
            </div>
            <h3>${data.name}</h3>
          </div>
        </div>
      </a>
        `;
        return this._parentElement.insertAdjacentHTML("afterbegin", markup);
      })
      .join("");
  }
}

export default new SeachResultsView();
