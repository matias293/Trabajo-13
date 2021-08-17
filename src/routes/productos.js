import express from 'express';

import Product from '../Productos'


const products = new Product()
const router = express.Router();



  router.get('/productos/listar', (req, res) => {
  let productos =  products.leerProductos()
     res.json({
      productos 
     });
   });


router.put('/productos/actualizar/:id', (req, res) => {
  const {id} = req.params
  
  const {title,price,thumbnail} = req.body

  const productoActualizado = products.actualizarProducto(title,price,thumbnail,id)

  if(!productoActualizado) return res.json({msg: 'Producto no existe '})
  else{
    res.json({
      productoActualizado
    });

  }
   
});

router.delete('/productos/borrar/:id', (req, res) => {
 const {id}= req.params

  const productoBorrado = products.eliminarProducto(id)

    if( !productoBorrado ) res.json({msg: 'Producto no existe o ya fue eliminado '})
    
     res.json({
       msg:'Usuario Eliminado',
       productoBorrado
     });
});



router.get('/productos/vista', (req, res) => {
  let productos =  products.leerProductos()
  let dato = {
    mensaje:'No hay productos disponibles',
    productos,
    estado:true
  }
 
  if (productos.length > 0) dato.estado = false

  res.render("index", {dato} )
    
    

  
  

})
export default router;