import { crearTabla, actualizarTabla } from "./creadorTabla.js";
import { Superheroe } from "./personaje.js";
import {
    agregarRegistros,
    agregarUnRegistro,
    leerData,
} from "./localStorage.js";
import {
    validarCampoVacio,
    agregarErrorAControles,
    validarForm,
    validarNumero,
    quitarErrorAControles,
} from "./validaciones.js";
import { armasBkp } from "./armas.js";



function agregarArmasSelect() {
    const $select = document.getElementById("slArma");

    const armas = [];
    if (!leerData("armas", armas)) {
        agregarRegistros("armas", armasBkp);
    }

    armas.forEach((element) => {
        const $op = document.createElement("option");
        $op.textContent = element;
        $select.appendChild($op);
    });
}
agregarArmasSelect();
const arraySuperheroes = [];
leerData("superheroes", arraySuperheroes);
const $spinner = document.getElementById("spinner_container");
$spinner.style.display = "none";

const $tabla = document.getElementById("container_tabla");
actualizarTabla($tabla, arraySuperheroes);
const $btnGuardar = document.getElementById("btnGuardar");
const $form = document.forms[0];
const $containerBtns = document.querySelector(".container_botones");

// Agregar
function agregarSuperheroe() {
    if (!validarForm($form)) {
        agregarErrorAControles($form);
    } else {
        $spinner.style.display = "flex";
        setTimeout(() => {
            agregarUnRegistro("superheroes", nuevoSuperheroe(), arraySuperheroes);
            actualizarTabla($tabla, arraySuperheroes);
            $spinner.style.display = "none";
            $form.reset();
        }, 500);
    }
}

const {
    txtId,
    txtNombre,
    txtAlias,
    rngFuerza,
    rdoEditorial,
    slArma,
} = $form;

function nuevoSuperheroe() {
    return new Superheroe(
        Date.now(),
        txtNombre.value,
        rngFuerza.value,
        txtAlias.value,
        rdoEditorial.value,
        slArma.value
    );
}

function getSuperheroeConID() {
    return new Superheroe(
        txtId.value,
        txtNombre.value,
        rngFuerza.value,
        txtAlias.value,
        rdoEditorial.value,
        slArma.value
    );
}

// MODIFICAR
function modificarSuperheroe(superheroeEdit) {
    const superheroe = arraySuperheroes.find(
        (element) => element.id == superheroeEdit.id
    );
    if (!validarForm($form)) {
        agregarErrorAControles($form);
    } else {
        $spinner.style.display = "flex";
        setTimeout(() => {
            superheroe.nombre = superheroeEdit.nombre;
            superheroe.alias = superheroeEdit.alias;
            superheroe.editorial = superheroeEdit.editorial;
            superheroe.fuerza = superheroeEdit.fuerza;
            superheroe.arma = superheroeEdit.arma;
            agregarRegistros("superheroes", arraySuperheroes);
            actualizarTabla($tabla, arraySuperheroes);
            $spinner.style.display = "none";
            $btnGuardar.classList.remove("disabled");
            $form.reset();
            $containerBtns.style.display = "none";
        }, 2000);
    }
}

// ELIMINAR
function eliminarSuperheroe(id, titulo) {
    if (confirm(`Desea eliminar el superheroe ${titulo}?`)) {
        $spinner.style.display = "flex";
        setTimeout(() => {
            let index = arraySuperheroes.findIndex((element) => element.id == id);
            arraySuperheroes.splice(index, 1);
            agregarRegistros("superheroes", arraySuperheroes);
            actualizarTabla($tabla, arraySuperheroes);
            $spinner.style.display = "none";
            $btnGuardar.classList.remove("disabled");
            $form.reset();
            $containerBtns.style.display = "none";
        }, 2000);
    }
}

function handlerClick(e) {
    const emisor = e.target;

    if (emisor.matches("#container_tabla table tbody tr td")) {
        quitarErrorAControles($form);
        const id = emisor.parentElement.dataset.id;
        const superheroe = arraySuperheroes.find((element) => element.id == id);
        cargarTabla(superheroe);
        $btnGuardar.classList.add("disabled");
        $containerBtns.style.display = "flex";
    } else if (emisor.matches("#btnModificar")) {
        modificarSuperheroe(getSuperheroeConID());
    } else if (emisor.matches("#btnCancelar")) {
        $form.reset();
        $containerBtns.style.display = "none";
        $btnGuardar.classList.remove("disabled");
    } else if (emisor.matches("#btnEliminar")) {
        const id = txtId.value;
        if (id) {
            eliminarSuperheroe(txtId.value, txtNombre.value);
        }
    }
}

function cargarTabla(superheroe) {
    console.log(superheroe);
    txtId.value = superheroe.id;
    txtNombre.value = superheroe.nombre;
    txtAlias.value = superheroe.alias;
    rdoEditorial.value = superheroe.editorial;
    rngFuerza.value = superheroe.fuerza;
    slArma.value = superheroe.arma;
}

// EVENTOS ↓↓

// CLICK
window.addEventListener("click", handlerClick, true);

// AGREGAR
$form.addEventListener("submit", (e) => {
    e.preventDefault();

    agregarSuperheroe();
});

// VALIDACIONES
const controles = $form.elements;
for (let i = 0; i < controles.length; i++) {
    const control = controles.item(i);
    if (control.matches("input")) {
        if (control.matches("[type=text]")) {
            control.addEventListener("blur", validarCampoVacio);
        } else if (control.matches("[type=number]")) {
            control.addEventListener("blur", validarNumero);
        }
    }
}
