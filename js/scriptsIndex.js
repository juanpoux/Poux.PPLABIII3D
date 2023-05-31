import { leerData } from "./localStorage.js";
import { crearTarjeta } from "./creadorTarjetas.js";

const arraySuperheroes = [];
leerData("superheroes", arraySuperheroes);

const $divTarjetas = document.querySelector(".div_tarjetas");
arraySuperheroes.forEach((element) => {
    console.log(element);
    const $nuevaTarjeta = crearTarjeta(element);
    $divTarjetas.appendChild($nuevaTarjeta);
});
