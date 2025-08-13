// index.js
import { moviesData } from "./data.js";

const moodRadios = document.getElementById("mood-radios");
const getMovieBtn = document.getElementById("get-movie-btn");
const classicsOnlyOption = document.getElementById("classics-only-option");
const movieModalInner = document.getElementById("movie-modal-inner");
const movieModal = document.getElementById("movie-modal");
const movieModalCloseBtn = document.getElementById("movie-modal-close-btn");


moodRadios.addEventListener("change", highlightCheckedOption);
getMovieBtn.addEventListener("click", renderMovie);
movieModalCloseBtn.addEventListener("click", function() {
     movieModal.style.display = "none";
    });


function renderMovie() {
    const movieObject = getSingleMovieObject();

    if (!movieObject) {
        alert("Please select a mood first.");
        return;
    }

    movieModalInner.innerHTML = ` 
        <img class="movie-poster" src="${movieObject.poster}" alt="${movieObject.title}" />
        <h2 class="movie-title">${movieObject.title}</h2>
        <p class="movie-details">Year: ${movieObject.year}</p>
        <p class="movie-details">Rating: ${movieObject.rating}</p>
        <div class="movie-genre">${movieObject.genre}</div>
    `;

    movieModal.style.display = "flex";
}


function getSingleMovieObject() {
    const moviesArray = getMatchingMoviesArray();
    if (!moviesArray || moviesArray.length === 0) ;

    if (moviesArray.length === 1) {
        return moviesArray[0];
    } else {
        const randomNumber = Math.floor(Math.random() * moviesArray.length);
        return moviesArray[randomNumber];
    }
}


function getMatchingMoviesArray() {
    const selectedRadio = document.querySelector(`input[type="radio"]:checked`);
    if (!selectedRadio) return null;

    const isClassic = classicsOnlyOption.checked;
    const selectedMood = selectedRadio.value;

    return moviesData.filter(movie => {
        if (isClassic) {
            return movie.moodTags.includes(selectedMood) && movie.isClassic === true;
        } else {
            return movie.moodTags.includes(selectedMood);
        }
    });
}


function highlightCheckedOption(e) {
    const radios = document.getElementsByClassName("radio");
    for (let radio of radios) {
        radio.classList.remove("highlight");
    }
    document.getElementById(e.target.id).parentElement.classList.add("highlight");
}


function getMoodsArray(movies) {
    const moodsArray = [];
    for (let movie of movies) {
        for (let mood of movie.moodTags) {
            if (!moodsArray.includes(mood)) {
                moodsArray.push(mood);
            }
        }
    }
    return moodsArray;
}


function renderMoodsRadios(movies) {
    let radioItems = "";
    const moods = getMoodsArray(movies);
    for (let mood of moods) {
        radioItems += `
        <div class="radio">
         <input type="radio" id="${mood}" value="${mood}" name="moods" />
        <label for="${mood}">${mood}</label>
           
        </div>`;
    }
    moodRadios.innerHTML = radioItems;
}


renderMoodsRadios(moviesData);