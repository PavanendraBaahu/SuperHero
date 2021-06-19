import View from "./view.js";

class BookMarkView extends View {
  _parentElement = document.querySelector(".prev_book");
  _initialMessage = `No bookmarks found Yet!`;
  _initialMessgeParent = document.querySelector(".prev_book");

  _showInitialMessage(data) {
    if (!data.length) {
      const html = `
      <p class ="errorBook">${this._initialMessage}</p>
      `;
      return this._initialMessgeParent.insertAdjacentHTML("afterbegin", html);
    }
  }

  // addWindowClick() {
  //   window.addEventListener("click", (e) => {
  //     this._parentElement.classList.remove(".active_book");
  //   });
  // }

  clearParentBookmark() {
    this._parentElement.innerHTML = "";
  }

  _generateMarkup(data) {
    return data.map((data) => {
      const id = window.location.hash.slice(1);
      const html = ` 
      <a href="#${data.id}"
      <div class="bookmark_details ${data.id === id ? "bd_active" : ""}">
    <div class="bookmark_img">
      <img src="${data.image.url}" alt="iron" />
    </div>
    <div class="bookmarkPreview_info">
      <h4>${data.name}</h4>
      <p>${data.publisher}</p>
    </div>
  </div>
  </a>
  
  
  `;
      return this._parentElement.insertAdjacentHTML("afterbegin", html);
    });
  }
}

export default new BookMarkView();
