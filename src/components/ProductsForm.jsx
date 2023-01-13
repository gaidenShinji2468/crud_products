import { useForm } from "react-hook-form"
import { useEffect } from "react"

const ProductsForm = ( {getUpProduct, getUpProductUpdated, getUpFieldsCleaned, selectedProduct} ) => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const getFormData = data => {
        if(selectedProduct) {
            getUpProductUpdated(data)
            resetForm()
        } else {
            getUpProduct(data)
            resetForm()
        }
    }

    useEffect( () => {
        if(selectedProduct) {
            reset(selectedProduct)
        } 
    }, [selectedProduct] )

    const resetForm = () => {
        reset(
            {
                name: "",
                category: "",
                price: null,
                isAvailable: false
            }
        )
        getUpFieldsCleaned()
    }

    return (
        <div>
            <form onSubmit={ handleSubmit(getFormData) }>
                <div>
                    <label htmlFor="product-name">Nombre del producto: </label>
                    <input
                    type="text"
                    id="product-name"
                    { ...register("name", {
                        required : true
                    }) }
                    />
                </div>
                <div>
                    <label htmlFor="product-category">Categoría: </label>
                    <input
                    type="text"
                    id="product-category"
                    { ...register("category", {
                        required : true
                    }) }
                    />
                </div>
                <div>
                    <label htmlFor="product-price">Precio: </label>
                    <input
                    type="number"
                    id="product-price"
                    { ...register("price", {
                        required : true
                    }) }
                    />
                </div>
                <div>
                    <label htmlFor="product-available">Disponibilidad: </label>
                    <input
                    type="checkbox"
                    id="product-available"
                    { ...register("isAvailable") }
                    />
                </div>
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}

export default ProductsForm