export default class View {
  _parentElement = document.querySelector(".movie_left");
  _errorMessage = `We couldn't found any character related to your query. Try another one!`;
  renderSpinner() {
    const markup = `<div class="spinner">
        <svg>
          <use href="./img/icons.svg#icon-loader"></use>
        </svg>
      </div>`;
    this._parentElement.innerHTML = "";
    return this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
            <p>${message}</p>
          </div>
    
    `;
    this._parentElement.innerHTML = "";
    return this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Update the changed text

      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild.nodeValue.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUTES

      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }
}
