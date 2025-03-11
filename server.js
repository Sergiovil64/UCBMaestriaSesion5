
// Importar Express
const express = require('express'); // obtiene la dependencia de express
const app = express(); // inicializa express en la variable

// Hacer que Express sepa que vamos a recibir y enviar JSON
app.use(express.json()); // configura el uso del JSON en los request

// Datos de prueba: un arreglo de objetos // Listado de usuarios
let usuarios = [
  { id: 1, nombre: 'Juan', edad: 28 },
  { id: 2, nombre: 'Ana', edad: 22 },
  { id: 3, nombre: 'Luis', edad: 35 }
];  
// Endpoint Inicial

app.get('/', (req, res) => {
    res.send('Bienvenido a la API REST con Express.js'); // respuesta al request en url base
  }); 

// Endpoint: Obtener todos los usuarios

app.get('/api/usuarios', (req, res) => {
  res.status(200).json(usuarios); // respuesta 200 con el listado de usuarios 
});

// Endpoint: Obtener un usuario por ID

app.get('/api/usuarios/:id', (req, res) => {
    const usuarioId = parseInt(req.params.id); // parse el id que obtiene de la URL
  const usuario = usuarios.find(u => u.id === usuarioId); // busca el usuario por Id en la lista de ususarios
  if (!usuario) return res.status(404).send('Usuario no encontrado'); // retorna estado 404 en caso de no encontrar el usuario en la lista
  res.status(200).json(usuario); // respuesta 200 con los datos del usuario
});

// Endpoint: Crear un nuevo usuario

app.post('/api/usuarios', (req, res) => {
  const { nombre, edad } = req.body; // obtiene los datos del usuario del body del requests
  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre,
    edad
  }; // adiciona el id del nuevo usuario a crear
  usuarios.push(nuevoUsuario); // agrega el usuario a la lista
  res.status(201).json(nuevoUsuario); // responde 201 indicando que se ha agregado el usuario
});

// Endpoint: Actualizar un usuario

app.put('/api/usuarios/:id', (req, res) => {
  const usuario = usuarios.find(u => u.id === parseInt(req.params.id)); // busca el usuario por Id
  if (!usuario) return res.status(404).send('Usuario no encontrado'); // retorna respuesta 404 en caso de no encontrar el usuario

  const { nombre, edad } = req.body; // obtiene los datos del body para actualizar el usuario
  usuario.nombre = nombre || usuario.nombre; // cambia el dato de nombre del usuario
  usuario.edad = edad || usuario.edad; // cambia el dato de edad del usuario

  res.status(200).json(usuario); // responde 200 con el nuevo usuario 
});

// Endpoint: Eliminar un usuario

app.delete('/api/usuarios/:id', (req, res) => { 
  const usuarioIndex = usuarios.findIndex(u => u.id === parseInt(req.params.id)); // busca el indice del usuario en la lista
  if (usuarioIndex === -1) return res.status(404).send('Usuario no encontrado'); // retorna 404 en caso de no encontrar al usuario

  const usuarioEliminado = usuarios.splice(usuarioIndex, 1); // elimina el usuario de de la lista
  res.status(200).json('usuarioEliminado'); // responde 200 y el mensaje de usuarioEliminado 
});

// Configurar el puerto y levantar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
