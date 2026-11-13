
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
        lista.innerHTML += `
            <tr>
                <td>${p.nombre}</td>
                <td>${p.oxigenacion}%</td>
                <td>${p.ritmo}</td>
                <td>${p.riesgo}</td>
            </tr>
        `;
    });
}