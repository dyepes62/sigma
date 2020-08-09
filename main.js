const express = require("express");
const bodyParser = require("body-parser");
const server = express();
server.use(bodyParser.json());

const registroUsuario = require("./js/modelos/registroServer");
const cors = require("cors");

server.use(cors());

server.use(bodyParser.json());

server.post("/registro", async (req, res) => {
  const {
    departamento,
    ciudad,
    nombre,
    email
  } = req.body;
  await registroUsuario.agregar(departamento, ciudad, nombre, email);
  res.status(201).json({
    icon: 'success',
    title: 'Felicitaciones',
    text: 'Tu información ha sido recibida satisfactoriamente!',
  });


});

server.listen(3000, () => {
  console.log("Servidor creado exitosamente");
});

server.get("/", async (req, res) => {
  res.send("Hello World")
});