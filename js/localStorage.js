export function leerData(clave, array) {
    if (localStorage.getItem(clave)) {
        JSON.parse(localStorage.getItem(clave)).forEach((element) => {
            array.push(element);
        });
        return true;
    }
    return false;
}

export function agregarUnRegistro(clave, registro, array) {
    array.push(registro);
    localStorage.setItem(clave, JSON.stringify(array));
}

export function agregarRegistros(clave, registros) {
    localStorage.setItem(clave, JSON.stringify(registros));
    return true;
}
