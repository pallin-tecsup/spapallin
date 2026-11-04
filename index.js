const express = require('express');

const mysql=require("mysql2");
const app = express()
app.use("/css", express.static(__dirname + "/css"));
app.use("/img", express.static(__dirname + "/img"));
app.use("/js", express.static(__dirname + "/js"));

let conexion=mysql.createConnection({
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    database: process.env.MYSQLDATABASE,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD
});
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html')
})
app.post('/validar', function(req, res){
  const datos=req.body;
  console.log(datos);
  let nombres=datos.nombres;
  let celular=datos.celular;
  let correo=datos.correo;
  let mensaje=datos.mensaje;

  let registrar= "INSERT INTO info (nombres, celular, correo, mensaje) VALUES ('"+nombres+"','"+celular+"','"+correo+"','"+mensaje+"')"
conexion.query(registrar, function(error){
    if (error) {
        throw error;
    }else{
        //console.log("Datos almacenados correctamente");
        res.send(`
            <script>
                alert("Datos enviados correctamente");
                window.location.href="/";
            </script>
            `);
    }
});
});

app.listen(3000, () => {
  console.log("Servidor creado en localhost");
})