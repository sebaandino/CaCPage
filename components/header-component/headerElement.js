class headerElement extends HTMLElement {

    constructor() {
        super();
        this.innerHTML = /*html*/ `

            <style>

                /* -- HEADER --*/

                header {
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    background-color: #2b90dd;
                    font-size: 1rem;
                    box-shadow: 0 1px 6px 4px #222;
                    width: 100%;
                    height: clamp(20px, 10dvh, 1000px);
                    padding: 0 20px 0 30px;
                }

                .header-nav {
                    display: flex;
                    align-items: center;
                }

                .header-logo {
                    display: grid;
                    align-content: center;
                    margin-left: 30px;
                    width: 152px;
                }

                .header-logo i,
                span {
                    color: #111;
                }

                .header-logo:hover {
                    animation: move .3s infinite;
                }

                @keyframes move {
                    0% {
                        transform: rotate(0deg);
                    }

                    25% {
                        transform: rotate(5deg);
                    }

                    75% {
                        transform: rotate(-5deg);
                    }

                    100% {
                        transform: rotate(0deg);
                    }
                }

                .header-nav-list {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 20px;
                }

                .header-nav-list-item {
                    padding: 5px;
                    border-radius: 15px;
                    transition: box-shadow .12s ease-in;
                }

                .header-nav-list-item a {
                    color: white;
                }

                .header-nav-list-item-btn {
                    background-color: #111;
                    border-radius: 10px;
                }

                .header-nav-list-item-btn:hover {
                    background-color: transparent;
                }

                .header-nav-list-item:hover {
                    box-shadow: 0 0 5px #333;
                }

                /* buscador del nav */

                .nav-buscador-form-input {
                    border-radius: 30px;
                    padding: 5px;
                    background-color: #154970;
                    border: none;
                    transition: box-shadow .2s ease-in-out,
                    filter .2s ease-in;
                }

                .nav-buscador-form-btn {
                    background-color: transparent;
                    border: none;
                    font-size: 1rem;
                }

                .nav-buscador-form-input:focus {
                    box-shadow: 2px 0 3px 2px #ffffff48;
                    filter: brightness(2);
                }

                .input-header {
                    display: none;
                }

                .label-header {
                    display: none;
                }

                @media screen and (max-width: 820px) {

                    .label-header {
                        display: block;
                    }

                    .header {
                        justify-content: space-around;
                        margin-left: 0;
                    }

                    .header-nav-list {
                        position: absolute;
                        display: none;
                        flex-direction: column;
                        align-items: center;
                        right: 0;
                        top: 10%;
                        gap: 30px;
                        height: auto;
                        width: 100%;
                        padding: 20px 0;
                        background-color: #ffffffc2;
                    }

                    .input-header:checked ~ .header-nav-list {
                        display: flex;
                    }

                    .nav-buscador-form-input {
                        padding: 10px;
                    }

                    .nav-buscador-form-btn {
                        background-color: transparent;
                        border: none;
                        font-size: 1.3rem;
                    }
                }
            </style>

            <header>
                <div class="header-logo">
                    <a href="../../index.html"><i class="fas fa fa-film"><span> G13 Movies</span></i></a>
                </div>
                <nav class="header-nav">
                    <label for="input-header" class="label-header"><i class="fa fa-bars"></i></label>
                    <input type="checkbox" name="input-header" id="input-header" class="input-header">
                    <ul class="header-nav-list">
                        <li class="nav-list-item">Ultimas añadidas</li>
                        <li class="nav-list-item">Generos</li>
                        <li class="nav-list-item nav-buscador-container">
                            <form class="nav-buscador-form" id="searchForm">
                                <input type="text" name="query" id="buscador" placeholder="Buscar Pelicula..."
                                    class="nav-buscador-form-input ">
                                <button type="submit" class="nav-buscador-form-btn"><i class="fa fa-search"></i></button>
                            </form>
                        </li>
                    </ul>
                </nav>
            </header>
        `;
    }
}



customElements.define("header-element", headerElement);

// evita que el formulario se envíe de forma tradicional
document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();

    //funcionalidad para el buscador de peliculas
    const movie_string = document.getElementById("buscador").value;
    const movie_search = movie_string.replace(/\s+/g, '+'); //se remplazan los espacios del string por un +

    // al buscar se redirecciona a movie_search.html con el parametro de busqueda en la URL "query"
    window.location.href = `../../movie_search.html?query=${movie_search}`;
});
