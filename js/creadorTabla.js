export const crearTabla = (data, colorCabecera) => {
    if (!Array.isArray(data)) return null;
    const $tabla = document.createElement("table");

    $tabla.appendChild(crearCabecera(data[0], colorCabecera));
    $tabla.appendChild(crearCuerpo(data));
    return $tabla;
};

const crearCabecera = (data, colorFondo) => {
    const $tHead = document.createElement("thead");
    const $tr = document.createElement("tr");

    //$tr.style.backgroundColor = colorFondo; // es lo mismo que la línea de abajo
    $tr.style.setProperty("background-color", colorFondo);

    for (const key in data) {
        if (key === "id") continue;

        const $th = document.createElement("th");
        $th.textContent = key;
        $tr.appendChild($th);
    }
    $tHead.appendChild($tr);

    return $tHead;
};

const crearCuerpo = (data) => {
    if (!Array.isArray(data)) return null;

    const $tBody = document.createElement("tbody");

    data.forEach((element, index) => {
        const $tr = document.createElement("tr");
        if (index % 2 == 0) {
            $tr.classList.add("rowPar");
        }

        for (const key in element) {
            if (key === "id") {
                $tr.dataset.id = element[key];
                //$tr.setAttribute("data-id", element[key]); // esta línea es equivalente a la anterior
            } else {
                const $td = document.createElement("td");
                $td.textContent = element[key];
                $tr.appendChild($td);
            }
        }
        $tBody.appendChild($tr);
    });

    return $tBody;
};

export const actualizarTabla = (contenedor, data) => {
    while (contenedor.hasChildNodes()) {
        contenedor.removeChild(contenedor.firstChild);
    }
    if (data.length > 0) {
        contenedor.appendChild(crearTabla(data, "#ff003b"));
    }
};
