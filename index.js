
//const fs = require('fs');
const leer=require('./funcionesTxt');
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

app.listen(port, () => {
    console.log('listo leer las direcciones en el readme');
})

app.get('/listaProductos', (req, res) => {
    //let catalogo = fs.readFileSync('./dbProductos', 'utf8');
    let catalogo = leer.data.readFile('dbProductos','utf8');
    let catalogoJson = JSON.parse(catalogo);
    console.log(catalogoJson);
    res.send(catalogoJson);
})


app.post('/carritoAdd', function (req, res) {
    let carritoActual = leer.data.readFile('carrito','utf8');
    let carritoJson = JSON.parse(carritoActual);
    let objectJson= req.body;
    let persons=[];
    persons.push(objectJson);
    carritoJson.push(persons[0]);
    leer.data.writeFile('carrito','');
    leer.data.writeFile('carrito',JSON.stringify(carritoJson));
    console.log("se agrego al carrito");
    res.send(persons);
    

});

app.get('/comprar', (req, res) => {
  
    let productos = leer.data.readFile('dbProductos','utf8');
    let productosJson = JSON.parse(productos);

    let carrito = leer.data.readFile('carrito','utf8');
    let carritoJson = JSON.parse(carrito);

    carritoJson.forEach(carritoE => {
        let index = productosJson.findIndex(productoE => productoE.nombre === carritoE.nombre);
        productosJson[index].cantida -= carritoE.cantida;
    });

    leer.data.writeFile('carrito','[]');

    leer.data.writeFile('dbProductos','');
    leer.data.writeFile('dbProductos',JSON.stringify(productosJson));

    
    let carritoVacio = leer.data.readFile('carrito','utf8');
    let carritoVacioJson = JSON.parse(carritoVacio);
    console.log(carritoVacioJson);
  
    res.send('Pagado, el carrio a quedado vacio y catidades en catalogo descontadas.');
})


app.post('/buscar', (req, res) => {
    let filter = req.params.filter;
    let keyword = req.params.keyword;
    let catalogoProductos = leer.data.readFile('dbProductos','utf8');
    let productosJson = JSON.parse(catalogoProductos);
    let objectJson= req.body;
    let persons=[];
    persons.push(objectJson);
    let resultadoBusqueda = productosJson.filter(product => product[objectJson.filter] === objectJson.palabra);
    console.log(resultadoBusqueda);
    res.send(resultadoBusqueda);
})


