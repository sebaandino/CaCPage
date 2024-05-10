
// Obtener los parámetros de la URL
const urlParams = new URLSearchParams(window.location.search);
// Obtener el valor del parámetro 'query'
const query = urlParams.get('query');
// prueba
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

// function para buscar la traduccion de la descripcion de la pelicula 

let descripcionTraducida;
fetch(`https://api.themoviedb.org/3/movie/${query}/translations`, options)
    .then(response => response.json())
    .then(data => {
        const translations = data.translations;
        const descripcionEncontrada = translations.find(translation => translation.iso_639_1 === 'es');
        if (descripcionEncontrada) {
            descripcionTraducida = descripcionEncontrada.data.overview;
        } else {
            console.log('No se encontró una traducción en español.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

    //carga de la pelicula

fetch(`https://api.themoviedb.org/3/movie/${query}`, options)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        const movie = data;
        const roundedVoteAverage = Math.round(movie.vote_average);
        const año= movie.release_date.slice(0,4)
        const htmlResponse = /*html*/ ` 
            <img src="https://image.tmdb.org/t/p/w300/${movie.poster_path}" alt="movie poster" class="p-img">
            <div class="movie-stats">
                <span class="p-votes"><i class="fab fa fa-star"></i>${roundedVoteAverage}/10</span><br>
                <span class="p-date"><i class="fab fa fa-calendar"></i>${año}</span><br>
            </div>
            <div class="movie-info">
                <h1 class="p-title">${movie.title}</h1>
                <h2 class="p-desc">${descripcionTraducida || movie.overview}</h2>
            </div>
        `;
        document.getElementById('pelicula-container').innerHTML = htmlResponse;
    })
    .catch(error => {
        console.error('Error:', error);
    });
