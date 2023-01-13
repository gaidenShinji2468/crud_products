import {
    useState,
    useEffect
} from "react";
import axios from "axios";
import ProductsList from "./components/ProductsList";
import ProductsForm from "./components/ProductsForm";
//import Success from "./components/Success";
import Error from "./components/Error";

function CRUDProducts()
{
    // Esto manejo los datos de forma local
    let [products, setProducts] = useState([]);
    // la url base para todos los metodos http
    let [url, setUrl] = useState("https://products-crud.academlo.tech/products/");
    let [selectedProduct, selectAProduct] = useState(null);

    // Metodos http para comunicar con la API
    // Lee a todos los productos
	const getProducts = () => {
            axios.get(url)
		.then(res => setProducts(res?.data))// una vez leidos se almacenan en un estado local
		.catch(err => console.log(err));
	}

	// Lee a un solo producto
	const getProduct = id => {
            axios.get(`${url}${id}`)
		.then(res => res?.data)
		.catch(err => console.log(err));
	}

	// Crea un nuevo producto
	const createProduct = product => {
            axios.post(url, product)
		.then(() => getProducts(url))
		.catch(err => console.log(err));
	}

	// Actualiza un producto existente
	const updateProduct = (id, updatedProduct) => {
            axios.put(`${url}${id}/`, updatedProduct)
		.then(() => getProducts(url))
		.catch(err => console.log(err));
	}

	// Elimina un producto existente
	const deleteProduct = id => {
            axios.delete(`${url}${id}/`)
		.then(() => getProducts(url))
		.catch(err => console.log(err));
	}
    
    useEffect(() => {
        getProducts(url); // cada vez que se abra la app se realiza una sola vez la lectura de los productos
    }, []);

    const handleProduct = product => {
        createProduct(product); // actualiza el arreglo remoto de productos con un nuevo producto
    }

    const handleUpdatedProduct = product => {
        updateProduct(product.id, product); // actualiza un producto de los productos almacenados en remoto
    }

    const prepareToUpdate = id => {
	// prepara el producto que se va a actualizar
        selectAProduct(products.find(product => product.id === id)); 
    }

    return (
        <div id="crud-products">
	    <ProductsForm
	        getUpProduct={handleProduct}
	        getUpProductUpdated={handleUpdatedProduct}
	        getUpFieldsCleaned={() => selectAProduct(null)}
	        selectedProduct={selectedProduct}
	    />
	    {
                Boolean(products?.length) && <ProductsList
                    getUpPrepareUpdate={prepareToUpdate}
		    getUpPrepareDelete={deleteProduct}
		    products={products}
		/>
	    }
	</div>
    );
}

export default CRUDProducts;

