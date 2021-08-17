

let socket = io.connect('http://localhost:8000', { forceNew: true });


socket.on('askProduct')

 const sendProduct = (e) => {
    
   
    const title     = document.getElementById('title')
    const price     = document.getElementById('price')
    const thumbnail = document.getElementById('thumbnail')
  
    const product = { title:title.value, price:price.value , thumbnail:thumbnail.value }
    
    socket.emit('new-product',product)
    
    
}
const render = (productos) => {
    
 
    let productsHtml = ''
    productos.forEach((producto )=> {
        productsHtml +=`
           <tr>
              <td(scope="col")>${producto.title}</td>
              <td(scope="col")>${producto.price}</td>
              <td(scope="col")>${producto.thumbnail}</td>
           </tr>
        `  
    })
    
    document.getElementById('table_body').innerHTML = productsHtml
  }
  
  
 socket.on('products', (lista)=> {
     
     render(lista);
});

socket.on('askMensajes')

sendMensaje=(e) => {
   const email = document.getElementById('email_id')
   const mensaje = document.getElementById('txtMensaje')
   
   const mensajeId = { email:email.value, mensaje:mensaje.value , }
   socket.emit('new-mensaje',mensajeId)
    
}
 
const renderizar = (mensajes) =>{
    let mensajesHTML = '';
    mensajes.forEach( ({email,mensaje,fecha  }) => {

        mensajesHTML += `
            <li class="border float-left ">
                <p class="fw-bolder text-primary float-left ">${email} <p class="text-warning float-left"> ${fecha} </p> : </p> <p col-sm-6 float-left">${mensaje} </p>   
            </li>
        `;
    });

    ulMensajes.innerHTML = mensajesHTML;
}


socket.on('mensajes', (mensajes)=> {
     console.log(mensajes)
    renderizar(mensajes);
});


 



