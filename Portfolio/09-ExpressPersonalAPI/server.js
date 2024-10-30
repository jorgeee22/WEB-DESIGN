const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

var nombresArreglo = [];
var tareasArreglo = [];

app.use((error, req, res, next) => {
    if (error.status === 400) {
        res.render('index', { nombresArreglo, tareasArreglo, mensajeError: error.mensaje });
    }else{
        res.status(500).send('500');
    };
});


app.get('/borrar', (req, res)=>{
    delete tareasArreglo[req.query.indice];
    res.redirect("/");
  });

app.route("/tarea")
    .post((req, res)=>{
        var tarea = req.body.tarea;
        tareasArreglo.push(tarea);
        res.redirect("/");
    })
    .get((req, res) => {
        res.json(tareasArreglo); 
    });

app.get('/abajp', (req, res)=>{
    if(parseInt(req.query.indice) < tareasArreglo.length-1){
    copia = tareasArreglo[parseInt(req.query.indice)+1];
    tareasArreglo[parseInt(req.query.indice)+1] = tareasArreglo[parseInt(req.query.indice)];
    tareasArreglo[parseInt(req.query.indice)] = copia;
    };
res.redirect("/");
});

app.get('/arriba', (req, res)=>{
    if(parseInt(req.query.indice) > 0){
    copia = tareasArreglo[parseInt(req.query.indice)-1];
    tareasArreglo[parseInt(req.query.indice)-1] = tareasArreglo[parseInt(req.query.indice)];
    tareasArreglo[parseInt(req.query.indice)] = copia;
    };
res.redirect("/");
    });

app.get('/saludar', (req,res)=>{
    var valor = req.query.valor;
    res.render('wazzup', {"valor": valor});
});

app.put('/greet/:name', (req, res) => {
    var name = req.params.name;
    nombresArreglo.push(name);
    res.json({nombresArreglo});
});

app.get('/greet', (req, res, next) => {
    var name = req.query.name;
    if(name){
    nombresArreglo.push(name);
    res.redirect("/");
    }   else{
            var error = new Error('400');
            error.status = 400; 
            return next(error);
}
});

app.route('/')
    .get((req,res)=>{
        res.render('index', {nombresArreglo, tareasArreglo});
    });

app.listen(3000, ()=>{
    console.log("Application listening port 3000");
  });