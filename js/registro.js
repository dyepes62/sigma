const formulario = document.getElementById("formularioRegistro");
const fdepartamento = document.getElementById("fdepartamento");
const fciudad = document.getElementById("fciudad");
const fname = document.getElementById("fname");
const femail = document.getElementById("femail");
var departamentosObj = {};
var arraydep = [];
var arrayciudades = [];
let registro = {};

formulario.addEventListener("submit", submitRegistro);

function submitRegistro(event) {
    event.preventDefault();
    registro.departamento = fdepartamento.value;
    registro.ciudad = fciudad.value;
    registro.nombre = fname.value;
    registro.email = femail.value;
    let varNombre = typeof registro.nombre;
    let varEmail = typeof registro.email;
    let caracteres;
    let tipo;
    if ((registro.nombre == "") || (registro.email == "")) {
        caracteres = false;
    } else {
        caracteres = true;
    }

    if ((varNombre == "string") || (varEmail = "string")) {
        tipo = true;
    } else {
        tipo = false;
    }

    if (tipo && caracteres) {
        fetch("http://localhost:3000/registro", {
                method: "POST",
                body: JSON.stringify(registro),
                headers: {
                    'content-type': 'application/json'
                }
            })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                Swal.fire(res);
                if (res.icon == "success") {
                    fdepartamento.value = "";
                    fciudad.value = "";
                    fname.value = "";
                    femail.value = "";
                }
            })
            .catch((err) => {
                alert(err);
            });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Tus datos no son validos',
          });
    }
}

function obtenerDepartamentos() {


    let departamentos = fetch('https://sigma-studios.s3-us-west-2.amazonaws.com/test/colombia.json' 
        )
        .then(response => {
            return response.json();
        }).then(data => {
            var opt = "";
            departamentosObj = data;
            arraydep = Object.getOwnPropertyNames(departamentosObj);
            arraydep.forEach(function (arraydep) {
                opt = new Option(arraydep);
                fdepartamento.appendChild(opt);
            });
        })
        .catch(error => {
            return error;
        });
    return departamentos;
}

fdepartamento.addEventListener("change", obtenerCiudad);

function obtenerCiudad() {
    let departamentos = fetch('https://sigma-studios.s3-us-west-2.amazonaws.com/test/colombia.json')
        .then(response => {
            return response.json();
        }).then(data => {
            var dep = fdepartamento.value;
            arrayciudades = data[dep];
            arrayciudades.forEach(function (arrayciudades) {
                opt = new Option(arrayciudades);
                fciudad.appendChild(opt);
            });
        })

        .catch(error => {
            return error;
        });
    return departamentos;
}

obtenerDepartamentos();