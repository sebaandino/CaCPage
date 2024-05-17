const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YWJiMzNjYjc1MzVmYjYzZmZlNTA2ZGQwZGZlMDAyMSIsInN1YiI6IjY2MmZlMWMxMWYwMjc1MDEyNzE0ZWFhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0UWZOlQ4GkikRMacrfn28udDGfQI-HxwufFVSKV0YQg";

// Configuración de la solicitud HTTP
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`
    }
};

// Función para cargar películas populares
function loadPopularMovies() {
    fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch popular movies');
            }
            return response.json();
        })
        .then(data => renderMovies(data.results))
        .catch(error => console.error('Error:', error));
}

// Función para renderizar películas
function renderMovies(movies) {
    const htmlResponse = movies.map(movie => `
        <div class="card" id="${movie.id}"> 
            <a href="#" class="movie">
                <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="movie poster">
                <span class="movie-title">${movie.title}</span>
            </a>
        </div>
    `).join('');

    document.getElementById('peliculas-container').innerHTML = htmlResponse;

    // Agregar escucha de eventos a los elementos de película después de que se renderizan
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => cargarPelicula(card));
    });
}

// Función para cargar la página con la descripción de la película
const cargarPelicula = (elementoPelicula) => {
    const movieId = elementoPelicula.id;
    const URL = `movie-desc.html?query=${movieId}`;
    window.location.href = URL;
};

// Cargar películas populares al cargar la página
loadPopularMovies();


// cargar los generos 


// fetch('https://api.themoviedb.org/3/genre/movie/list?language=es', options).
//     then(response => response.json()).
//     then(data => {
//         const gemeros = data.genres;
//         const htmlResponse = gemeros.map(genero => /*html*/ `
//         <li class="genero-item" id=${genero.id}>${genero.name}</li>
//         `).join('');
//         document.getElementById('generos-list').innerHTML = htmlResponse;
//     // Agregar escucha de eventos a los elementos de película después de que se renderizan
//     const cards = document.querySelectorAll('.genero-item');
//     cards.forEach(card => {
//         card.addEventListener('click', function () {
//             cargarGenero(this);
//         });
//     });
// })
//     .catch(err => console.error(err));

//     // Función para cargar la pagina con las peliculas de un género
// function cargarGenero(genero) {
//     // Obtencion de ID desde el elemento .card
//     const generoId = genero.id;
//     const URL = `movie_search.html?query=${generoId}`;
//     // se redirecciona
//     window.location.href = URL;
// }


    
