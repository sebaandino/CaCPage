// Obtener los parámetros de la URL
const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get('query');
console.log('Parámetro de búsqueda:', query);

const apiKey = "8abb33cb7535fb63ffe506dd0dfe0021";
const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YWJiMzNjYjc1MzVmYjYzZmZlNTA2ZGQwZGZlMDAyMSIsInN1YiI6IjY2MmZlMWMxMWYwMjc1MDEyNzE0ZWFhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0UWZOlQ4GkikRMacrfn28udDGfQI-HxwufFVSKV0YQg";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`
    }
};

async function fetchData(url, options) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function getTranslatedDescription(query) {
    const data = await fetchData(`https://api.themoviedb.org/3/movie/${query}/translations`, options);
    const translation = data.translations.find(t => t.iso_639_1 === 'es');
    return translation ? translation.data.overview : 'No se encontró una traducción en español.';
}

async function loadMovie(query) {
    const movie = await fetchData(`https://api.themoviedb.org/3/movie/${query}`, options);
    const translatedDescription = await getTranslatedDescription(query);

    const roundedVoteAverage = Math.round(movie.vote_average);
    const año = movie.release_date.slice(0, 4);
    const htmlResponse = /*html*/ `
        <img src="https://image.tmdb.org/t/p/w300/${movie.poster_path}" alt="movie poster" class="p-img">
        <div class="movie-stats">
            <span class="p-votes"><i class="fab fa fa-star"></i>${roundedVoteAverage}/10</span><br>
            <span class="p-date"><i class="fab fa fa-calendar"></i>${año}</span><br>
        </div>
        <div class="movie-info">
            <h1 class="p-title">${movie.title}</h1>
            <h2 class="p-desc">${translatedDescription || movie.overview}</h2>
        </div>
    `;
    document.getElementById('pelicula-container').innerHTML = htmlResponse;
}

async function loadSimilarMovies(query) {
    const data = await fetchData(`https://api.themoviedb.org/3/movie/${query}/similar`, options);
    const similares = data.results;

    const htmlResponse = similares.map(similar => /*html*/ `
        <div class="card similar-item" id="${similar.id}">
            <a href="#" class="movie">
                <img src="https://image.tmdb.org/t/p/w500/${similar.poster_path}" alt="movie poster">
                <span class="movie-title">${similar.title}</span>
            </a>
        </div>
    `).join('');

    document.getElementById('similares-container').innerHTML = htmlResponse;

    // Agregar escucha de eventos a los elementos de película después de que se renderizan
    document.querySelectorAll('.similar-item').forEach(card => {
        card.addEventListener('click', () => cargarPelicula(card));
    });
}

function cargarPelicula(pelicula) {
    const movieId = pelicula.id;
    const URL = `movie-desc.html?query=${movieId}`;
    window.location.href = URL;
}

async function initialize() {
    try {
        await loadMovie(query);
        await loadSimilarMovies(query);
    } catch (error) {
        console.error('Error al inicializar la página:', error);
    }
}

initialize();
