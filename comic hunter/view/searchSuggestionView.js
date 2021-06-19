import View from "./view.js";

class SearchSuggestionView extends View {
  _searchField = document.querySelector(".searchField");
  _autoParent = document.querySelector(".autocom_box");
  _errorMessage = `No Suggestions Found!..`;

  getQuery() {
    const query = this._searchField.value;
    return query;
  }

  addHandlerSuggestion(handler) {
    this._searchField.addEventListener("input", () => {
      handler();
    });
  }

  clearAutoParent() {
    this._autoParent.innerHTML = "";
  }

  clearWindow() {
    window.addEventListener("click", () => {
      this._autoParent.innerHTML = "";
    });
  }

  selectSuggestion() {
    this._autoParent.addEventListener("click", (e) => {
      const el = e.target.closest(".row").textContent;
      if (!el) return;
      if (el === this._errorMessage) {
        this._searchField.value = "";
      } else {
        this._searchField.value = el;
        this._autoParent.innerHTML = "";
        this._searchField.focus();
        console.log(el);
      }
    });
  }

  renderError(msg = this._errorMessage) {
    const html = `<div class="search_auto">
    <li class="row">${msg}</li>
  </div> `;
    this._autoParent.innerHTML = "";
    return this._autoParent.insertAdjacentHTML("afterbegin", html);
  }

  generateMarkup(data) {
    return data.map((data) => {
      const html = `
      <div class="search_auto">
      <li>
        <i class="fa fa-search autoSearch" aria-hidden="true"></i
        ><span class = "row">${data.name}</span>
      </li>
    </div>
      
      `;
      return this._autoParent.insertAdjacentHTML("afterbegin", html);
    });
  }
}

export default new SearchSuggestionView();
