const sequelize = require("../config");

const registroUsuario = {};
registroUsuario.agregar = async (
  departamento,
  ciudad,
  nombre,
  email
) => {
  const result = await sequelize.query(
    "INSERT INTO contacts (name,email,state,city) VALUES (?,?,?,?)",
    {
      replacements: [
        nombre,
        email,
        departamento,
        ciudad
      ],
    }
  );
  return result;
}

module.exports = registroUsuario;