          
                   
        const Product = ({product, getUpPrepareDelete, getUpPrepareUpdate}) => { 
            
                   return(
                   <li >
                        <h4><span>Nombre del producto:</span> {product.name} </h4>
                        <h4><span>Categoria:</span> {product.category}</h4>
                        <h4><span>Precio:</span> {product.price}</h4>
                        <h4><span>Disponibilidad:</span> {product.isAvailable}</h4>
                 
                        <button className="btn-delete" onClick={ () => getUpPrepareDelete(product.id) }>Eliminar Producto</button>
                        <button className="btn-edit" onClick={ () => getUpPrepareUpdate(product.id) } >Seleccionar</button>
                       
                    </li>
                    ) 
}
export default Product