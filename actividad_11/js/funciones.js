
class Paciente {
    constructor(nombre, oxigenacion, ritmo, riesgo) {
        this.nombre = nombre;
        this.oxigenacion = oxigenacion;
        this.ritmo = ritmo;
        this.riesgo = riesgo;
    }
}

function determinarRiesgo(oxigeno, ritmo) {
    if (oxigeno < 90 || ritmo > 130) return "Rojo (Crítico)";
    if (oxigeno >= 90 && oxigeno <= 94) return "Amarillo (Urgente)";
    return "Verde (Estable)";
}

document.addEventListener("DOMContentLoaded", mostrarPacientes);

document.getElementById("btnRegistrar").addEventListener("click", () => {
    let nombre = document.getElementById("nombreP").value;
    let oxigeno = parseFloat(document.getElementById("oxigenoP").value);
    let ritmo = parseFloat(document.getElementById("ritmoP").value);

    let riesgo = determinarRiesgo(oxigeno, ritmo);
    let nuevoPaciente = new Paciente(nombre, oxigeno, ritmo, riesgo);

    let pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
    pacientes.push(nuevoPaciente);
    localStorage.setItem("pacientes", JSON.stringify(pacientes));

    mostrarPacientes();
});

function mostrarPacientes() {
    let pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
    let lista = document.getElementById("listaPacientes");
    lista.innerHTML = "";

    pacientes.forEach(p => {
        // 1. Elegimos el color de la fila según el riesgo
        let claseFila = "";
        if (p.riesgo === "Rojo (Crítico)") claseFila = "table-danger";
        else if (p.riesgo === "Amarillo (Urgente)") claseFila = "table-warning";
        else claseFila = "table-success";

        // 2. Le inyectamos esa variable claseFila a la etiqueta <tr>
        lista.innerHTML += `
            <tr class="${claseFila}">
                <td>${p.nombre}</td>
                <td>${p.oxigenacion}%</td>
                <td>${p.ritmo}</td>
                <td>${p.riesgo}</td>
            </tr>
        `;
    });
}
