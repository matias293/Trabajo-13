import { v4 as uuidv4 } from 'uuid';
export default class Product { 
    constructor(){
        this.productos = []
    }

    leerProductos= ()=> {
        if(this.productos.length === 0) return []
        return this.productos
    }

    leerProductosPorId = (id) => {
        const producto =  productos.find(product => product.id === id)
        
        return producto
    }

    guardarProducto = (title,price,thumbnail) =>{
        let obj= {
            title,
            price,
            thumbnail,
            id : uuidv4()
          }
        
        this.productos.push(obj)
        return obj
        
    }

    actualizarProducto = (title,price,thumbnail,id) => {
        
        let productoActualizado
        
        let productos = this.productos
         for (let index = 0; index < productos.length; index++) {
            if (productos[index].id === id ){
              
                productoActualizado = {title,price,thumbnail,id}
                this.productos.splice(index,1,productoActualizado)
            } 
             
         }
         

        return productoActualizado

    }
    eliminarProducto = (id) =>{
     let productoBorrado
     let productos = this.productos
      for (let index = 0; index < productos.length; index++) {
        if (productos[index].id === id ){  
            productoBorrado = productos[index]
            this.productos.splice(index,1)
        }     
      }
      return productoBorrado
    }

}