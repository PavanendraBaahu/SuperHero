import View from "./view.js";

class MovieRightView extends View {
  _parentElement = document.querySelector(".movie_right");
  _errorMessage = `Request took too long! Try after sometime`;
  _heartParent = document.querySelector(".others");
  _toggle = document.querySelector(".prev_book");

  addHandler(handler) {
    ["hashchange", "load"].forEach((e) => window.addEventListener(e, handler));
  }

  addHandlerClickOnHeart() {
    this._heartParent.addEventListener("click", (e) => {
      const btn = e.target.closest(".bookmark");
      if (!btn) return;
      this._toggle.classList.toggle("active_book");
    });
  }

  addWindowHandler() {
    window.addEventListener("click", (e) => {
      console.log(e);
      this._toggle.classList.remove(".active_book");
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".fa");
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup(data) {
    const markup = `
    <div class="movie_right_img">
    <img src="${data.image.url}" alt="data" />
    <div class="shadow"></div>
    <div class="movie_info">
      <h1>${data.name}</h1>
      <p>${data.fullname}</p>
     <button> <i class="fa fa-heart${
       !data.bookmarked ? "-o" : ""
     }" aria-hidden="true"></i></button>
    </div>
  </div>

  
  <div class="movie_right_details">

  <div class="char_mainInfo">
  <div class="publisher">
    <h4>${data.publisher}</h4>
  </div>
  <div class="work">
    <h4>Work</h4>
    <p>
   ${data.occupation}
    </p>
  </div>

  <div class="work">
  <h4>Work-Base</h4>
  <p>
 ${data.base}
  </p>
</div>

  <div class="character_Det">
    <div class="birthPlace">
      <h4>Birth-Place</h4>
      <p>${data.placeOfBirth}</p>
    </div>
    <div class="occupation">
      <h4>Occupation</h4>
      <p>${data.occupation}</p>
    </div>
  </div>

  <div class="character_Det">
  <div class="birthPlace">
    <h4>Height</h4>
    <p>${data.height}</p>
  </div>
  <div class="occupation">
    <h4>Weight</h4>
    <p>${data.weight}</p>
  </div>
</div>


<div class="appearence">


<div class="gender">
<h4>Gender</h4>
<p>
  ${data.gender}
</p>
</div>

<div class="race">
<h4>Race</h4>
<p>
  ${data.race}
</p>
</div>

    <div class="hair">
    <h4>Hair-Color</h4>
    <p>
      ${data.hairColor}
    </p>
    </div>

    
    <div class="eye_color">
    <h4>Eye-Color</h4>
    <p>
      ${data.eyeColor}
    </p>
    </div>

</div>

<div class="relatives">
<h4>Alliases</h4>
<p>
  ${data.aliases}
</p>
</div>

<div class="relatives">
<h4>Alter-Egos</h4>
<p>
  ${data.egos}
</p>
</div>


  <div class="relatives">
    <h4>Relatives</h4>
    <p>
      ${data.relatives}
    </p>
  </div>

  <div class="relatives">
    <h4>Group</h4>
    <p>
      ${data.group}
    </p>
  </div>

</div>

<div class="movierightPreview">
              
<div class="prevright">
  <img src="${data.image.url}" alt="iron" />
  <p>${data.name} <br> <b>AKA</b> <br> <small>(${data.fullname})</small> </p>
</div>

<div class="powerstats">
  <h4 class="powerhead">Power stats</h4>

  <div class="powerindex">
  
    <div class="intelligence">
      <div class="intRound">
        <h5>${data.intelligence}</h5>
      </div>
      <div class="intName">
        <h4>Intelligence</h4>
      </div>
    </div>
  
  
    <div class="combat">
      <div class="intRound">
        <h5>${data.combat}</h5>
      </div>
      <div class="intName">
        <h4>Combat</h4>
      </div>
    </div>
  
  
    <div class="speed">
      <div class="intRound">
        <h5>${data.speed}</h5>
      </div>
      <div class="intName">
        <h4>Speed</h4>
      </div>
    </div>
  
  
    <div class="durability">
      <div class="intRound">
        <h5>${data.durability}</h5>
      </div>
      <div class="intName">
        <h4>Durability</h4>
      </div>
    </div>

    <div class="durability">
    <div class="intRound">
      <h5>${data.strength}</h5>
    </div>
    <div class="intName">
      <h4>Strength</h4>
    </div>
  </div>

  <div class="durability">
  <div class="intRound">
    <h5>${data.power}</h5>
  </div>
  <div class="intName">
    <h4>Power</h4>
  </div>
</div>
  
  </div>
</div>

</div>

</div>
    
    `;

    this._parentElement.innerHTML = "";
    return this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}

export default new MovieRightView();
