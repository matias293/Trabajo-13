import express from 'express';
import path from 'path';
import * as http from 'http';
import io from 'socket.io';
import moment from 'moment';

import Product from './Productos'
import Mensaje from './Mensajes'
import prod from './routes/productos';


/** INICIALIZACION API con EXPRESS */
const app = express();
const puerto = 8000;

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

app.set('view engine', 'pug');
const viewsPath = path.resolve(__dirname, '../views');
app.set('views', viewsPath);


app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const myServer = http.Server(app);


myServer.on('error', (err) => {
  console.log('ERROR ATAJADO', err);
});


myServer.listen(puerto, () => console.log('Server up en puerto', puerto));

app.use('/api', prod)

const myWSServer = io(myServer);


const products = new Product()
const mensajes = new Mensaje()




myWSServer.on('connect', (socket) => {
  

   socket.on('new-product', (product) => {
    
     let {title,price,thumbnail} = product
     products.guardarProducto(title,price,thumbnail)
    
  })
  
  let listaProductos = products.leerProductos()
  myWSServer.emit('products', listaProductos);

  socket.on('askProduct', (productos) => {
   let listaProductos = products.leerProductos()
   
   socket.emit('products', listaProductos);
 });


 socket.on('new-mensaje', async(mensaje) => {
  let fecha = moment().format('lll')
  let msj = {...mensaje,fecha}

   mensajes.guardar(msj)
 })

 let todosMensajes =  mensajes.leer()
 console.log(todosMensajes)
 
 myWSServer.emit('mensajes', todosMensajes);

 socket.on('askMensajes', (mensajes) => {
  let todosMensajes =  mensajes.leer()
  
  socket.emit('mensajes', todosMensajes);
});

  
 
 
 
})




