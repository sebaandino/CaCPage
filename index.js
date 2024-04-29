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
        const movies = data.results; // Suponiendo que 'results' contiene la lista de películas populares
        const htmlResponse = movies.map(movie => `
            <div class="card">
                <div class="card_front">
                    <div class="card_img">
                        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
                    </div>
                </div>
                <a href="#">
                    <div class="card_back">
                        <div class="card_back_info">
                            <span>${movie.title}</span>
                            <span>${movie.popularity}</span>
                            <span><i class="fas fa fa-calendar"></i>${movie.release_date}</span>
                            <i class="fa fas-solid fa-share">IR A VER</i>
                        </div>
                    </div>
                </a>
            </div>
        `).join('');
        // Insertar htmlResponse en tu DOM o hacer lo que necesites con él
        document.getElementById('peliculas-container').innerHTML = htmlResponse;
    })
    .catch(err => console.error(err));


    document.addEventListener("DOMContentLoaded", function() {
        const form = document.querySelector('.buscador-form');
        
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevenir el envío del formulario
            
            const buscadorById = document.getElementById('buscadorById');
            const peliculaId = buscadorById.value.trim(); // Obtener el valor del input
            
            if (!peliculaId) {
                // Manejar caso de input vacío si es necesario
                return;
            }
            
            // Redirigir a la página de descripción de la película
            window.location.href = `movieDesc.html?id=${peliculaId}`;
        });
    });