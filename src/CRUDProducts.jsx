import {
    useState,
    useEffect
} from "react";
import axios from "axios";
import ProductsList from "./components/ProductsList";
import ProductsForm from "./components/ProductsForm";
import Success from "./components/Success";
import Error from "./components/Error";

function CRUDProducts()
{
    // Esto manejo los datos de forma local
    let [products, setProducts] = useState([]);
    // la url base para todos los metodos http
    let [url, setUrl] = useState("https://products-crud.academlo.tech/products/");
    let [selectedProduct, selectAProduct] = useState(null);
    let [operation, setOperation] = useState(null);
    let [didOpOcurr, setDidOpOcurr] = useState(false);

    // Metodos http para comunicar con la API
    // Lee a todos los productos
	const getProducts = () => {
            axios.get(url)
		.then(res => setProducts(res?.data))// una vez leidos se almacenan en un estado local
		.catch(err => handleError(console.log(err), "Lectura de productos"));
	}

	// Lee a un solo producto
	const getProduct = id => {
            axios.get(`${url}${id}`)
		.then(res => res?.data)
		.catch(err => handleError(console.log(err), "Lectura del producto"));
	}

	// Crea un nuevo producto
	const createProduct = product => {
            axios.post(url, product)
		.then(() => handleSuccess(getProducts(), "Creación del producto"))
		.catch(err => handleError(console.log(err), "Creación del producto"));
	}

	// Actualiza un producto existente
	const updateProduct = (id, updatedProduct) => {
            axios.put(`${url}${id}/`, updatedProduct)
		.then(() => handleSuccess(getProducts(url), "Actualización del producto"))
		.catch(err => handleError(console.log(err), "Actualización del producto"));
	}

	// Elimina un producto existente
	const deleteProduct = id => {
            axios.delete(`${url}${id}/`)
		.then(() => handleSuccess(getProducts(url), "Eliminación del producto"))
		.catch(err => handleError(console.log(err), "Eliminación del producto"));
	}
    
    useEffect(() => {
        getProducts(url); // cada vez que se abra la app se realiza una sola vez la lectura de los productos
    }, []);

    // cada vez que ocurra un toast, tiene un tiempo de vida de 3 segundos
    useEffect(() => {
        setTimeout(() => {
            setOperation(null);
	}, 3000);
    }, [didOpOcurr]);

    // manejador de operaciones exitosas
    const handleSuccess = (resolve, operationType) => {
        resolve();
	setDidOpOcurr(!didOpOcurr);
	setOperation(<Success operationType={opertationType}/>);
    }

    // manejador de operaciones fallidas
    const handleError = (reject, operationType) => {
        reject();
	setDidOpOcurr(!didOpOcurr);
	setOperation(<Error operationType={opertationType}/>);
    }

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
	    {operation}
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

