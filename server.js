const express = require("express");
const { MongoClient } = require("mongodb"); // Importamos el MongoClient

const app = express();
const PORT = process.env.PORT || 3000;

// Aquí va tu cadena de conexión de MongoDB Atlas
// ¡Recuerda cambiar <db_username> y <db_password>!
const uri = "mongodb+srv://dockerapp:nIiOE736icN2kZJZ@cluster0.tkgqyqx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Creamos un nuevo cliente de Mongo
const client = new MongoClient(uri);

async function run() {
  try {
    // Conectamos el cliente al servidor
    await client.connect();
    console.log("¡Conectado exitosamente a MongoDB!");

    // Hacemos que la base de datos esté disponible para nuestras rutas
    app.locals.db = client.db(); 

  } catch (err) {
    console.error("Error al conectar a MongoDB", err);
    process.exit(1); // Si no nos podemos conectar, detenemos la app
  }
}

// Ejecutamos la función para conectar a la base de datos
run();

// Modificamos la ruta principal para probar la conexión
app.get("/", async (req, res) => {
  try {
    // Obtenemos la lista de bases de datos como prueba
    const databasesList = await client.db().admin().listDatabases();
    let dbNames = databasesList.databases.map(db => db.name).join(", ");
    res.send(`Hola, estoy conectado a MongoDB. Estas son las bases de datos: ${dbNames}`);
  } catch (err) {
    res.status(500).send("Error al consultar la base de datos");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
