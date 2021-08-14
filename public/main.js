

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
    
  if (productos.length >= 1) {
    let productsHtml = ''
    productos.forEach((producto )=> {
        productsHtml +=`
           <tr>
            <td(scope="col")> ${producto.title} </td>
            <td(scope="col")> ${producto.price}  </td>
            <td(scope="col")> ${producto.thumbnail} </td>
           </tr>
        `  
    })
    
    document.getElementById('table_body').innerHTML = productsHtml
  }

  else return

}

 


socket.on('products', (lista)=> {
    
    
    render(lista);
  });