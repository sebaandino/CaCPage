class footerElement extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = /*html*/ `

            <style>

footer {
    background-image: linear-gradient(90deg, #9995 ,#2b90dd, #9995);
    box-shadow: 0 0 3px #272727;
    height: clamp(20px,10dvh,1000px);
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.3rem;
    width: 100%;
    position: relative;
}

footer a{
    color: white;
}

footer span{
    text-wrap: pretty;
}

    @media screen and (width < 820px) {

        footer{
            position: relative;
        }

    } 
        
    </style>

<footer>
        <span>Derechos Reservados @ grupo 13</span>
        <a href="credits.html">Creditos API</a>
    </footer>
        `;
    }
}

customElements.define("footer-element", footerElement);
