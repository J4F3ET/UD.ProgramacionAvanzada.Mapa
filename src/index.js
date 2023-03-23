import express from "express";
import path from "path";
import {fileURLToPath} from "url";
import {ethernetIP, ethernet2IP} from "./app/admIP.js";
import readline from "readline";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
//Configucion del servidor
const SERVER = ethernetIP() || ethernet2IP();
const PORT = 3000;
const app = express();
//Coneccion con el cliente


//Estableciendo la carpeta publica para los archivos estaticos(la carpeta de las vistas del cliente)

app.use(
	"/bootstrap",
	express.static(path.join(__dirname, "../node_modules/bootstrap/dist"))
);
app.use(
	"/icons",
	express.static(path.join(__dirname, "../node_modules/bootstrap-icons/font"))
);
app.use(
	"/proj4",
	express.static(path.join(__dirname, "../node_modules/proj4/dist"))
);
console.log(path.join(__dirname, "../node_modules/proj4"));
app.use(express.static(path.join(__dirname + "/public")));

//Configurando el puerto en donde se va ejecutar el servidor
app.listen(PORT, SERVER, () => {
	console.log(`Servidor: ${SERVER}:${PORT}`);
});
