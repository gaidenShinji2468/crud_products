/* Flavio
getUpPrepareUpdate(id): recibe como argumento el id del objeto que se va a actualizar.

getUpPrepareDelete(id): recibe como argumento el id del objeto que se va a eliminar.

products: arreglo de productos.
*/

const ProductsList = ({products, getUpPrepareUpdate, getUpPrepareDelete }) => {


    return(
        <ul>
            {
                products?.map( (product, index) => (
                    <li key={`user-${index}`}>
                        <h4><span>Nombre del producto:</span> {product.name} {userElement.last_name}</h4>
                        <h4><span>Categoria:</span> {product.category}</h4>
                        <h4><span>Precio:</span> {product.price}</h4>
                        <h4><span>Disponibilidad:</span> {product.isAvailable}</h4>
                 
                        <button className="btn-delete" onClick={ () => getUpPrepareDelete(id) }>Eliminar Producto</button>
                        <button className="btn-edit" onClick={ () => getUpPrepareUpdate(id) } >Seleccionar</button>
                       
                    </li>
                ) )
            }
        </ul>
    )

}

export default ProductsList