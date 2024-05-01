
// se obtiene la parte de la URL que contiene los parámetros
const urlParams = new URLSearchParams(window.location.search);

// se extrae el valor del parametro "query"
const query = urlParams.get('query');

// prueba del parametro
console.log('peli a buscar:', query);

const apiKey = "8abb33cb7535fb63ffe506dd0dfe0021";
const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YWJiMzNjYjc1MzVmYjYzZmZlNTA2ZGQwZGZlMDAyMSIsInN1YiI6IjY2MmZlMWMxMWYwMjc1MDEyNzE0ZWFhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0UWZOlQ4GkikRMacrfn28udDGfQI-HxwufFVSKV0YQg";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`
    }
};

fetch(`https://api.themoviedb.org/3/search/movie?query=${query}`, options)
    .then(response => response.json())
    .then(data => {
        const movies = data.results;
        const htmlResponse = movies.map(movie =>
            `
            <div class="card">
                <a href="#" class="movie">
                    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="movie poster">
                    <span class="movie-title">${movie.title}</span>
                </a>
            </div>
        `)
        .join('');
        document.getElementById('busqueda-container').innerHTML = htmlResponse;
    })
    .catch(err => console.error(err));