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
        const htmlResponse = movies.map(movie =>
            `
            <div class="card" id="${movie.id}">
<a href="#">
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
            card.addEventListener('click', function() {
                cargarPelicula(this);
            });
        });
    })
    .catch(err => console.error(err));

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // evita que el formulario se envíe de forma tradicional

    const movie_string= document.getElementById("buscadorById").value;
    const movie_search= movie_string.replace(/\s+/g, '+'); //se remplazan los espacios del string por un +

    // al buscar se redirecciona a movie_search.html con el parametro de busqueda en la URL "query"
    window.location.href = `movie_search/movie_search.html?query=${movie_search}`;
});

// Función para cargar la página HTML con la información de la película
function cargarPelicula(elementoPelicula) {
    // Obtener el ID de la película desde el atributo id del elemento de película
    const movieId = elementoPelicula.id;
    // Construir la URL de la página HTML que muestra la información de la película
    const paginaURL = `movie-desc/movie-desc.html?query=${movieId}`;
    // Redireccionar a la página HTML de la película seleccionada
    window.location.href = paginaURL;
}