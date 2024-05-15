const apiKey = "8abb33cb7535fb63ffe506dd0dfe0021";
const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YWJiMzNjYjc1MzVmYjYzZmZlNTA2ZGQwZGZlMDAyMSIsInN1YiI6IjY2MmZlMWMxMWYwMjc1MDEyNzE0ZWFhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0UWZOlQ4GkikRMacrfn28udDGfQI-HxwufFVSKV0YQg";

//  carga de peliculas populares 

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`
    }
};

fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
    .then(response => response.json())
    .then(data => {
        const movies = data.results;
        const htmlResponse = movies.map(movie => /*html*/
            `
            <div class="card" id="${movie.id}"> 
                <a href="#" class="movie">
                    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="movie poster">
                    <span class="movie-title">${movie.title}</span>
                </a>
            </div>
            `)
            .join('');
        document.getElementById('peliculas-container').innerHTML = htmlResponse;

        // Agregar escucha de eventos a los elementos de película después de que se renderizan
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('click', function () {
                cargarPelicula(this);
            });
        });
    })
    .catch(err => console.error(err));

// Función para cargar la pagina con la descripcion de la pelicula
function cargarPelicula(elementoPelicula) {
    // Obtencion de ID desde el elemento .card
    const movieId = elementoPelicula.id;
    const URL = `../html/movie-desc.html?query=${movieId}`;
    // se redirecciona
    window.location.href = URL;
}