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
    let [opResult, setOpResult] = useState(null);
    
    // Metodos http para comunicar con la API
    const crudMethods = {
	// Lee a todos los productos
	getAll: url => {
            axios.get(url)
		.then(res => setProducts(res?.data))// una vez leidos se almacenan en un estado local
		.catch(err => console.log(err));
	},
	// Lee a un solo producto
	getOne: (url, id) => {
            axios.get(`${url}${id}`)
		.then(res => res?.data)
		.catch(err => console.log(err));
	},
	// Crea un nuevo producto
	create: (url, obj) => {
            axios.post(url, obj)
		.then(res => res?.data)
		.catch(err => console.log(err));
	},
	// Actualiza un producto existente
	update: (url, id, obj) => {
            axios.put(`${url}${id}/`, obj)
		.then(res => res?.data)
		.catch(err => console.log(err));
	},
	// Elimina un producto existente
	delete: (url, id) => {
            axios.delete(`${url}${id}/`)
		.then(res => res?.data)
		.catch(err => console.log(err));
	}
    };

    useEffect(() => {
        crudMethods.getAll(url); // cada vez que se abra la app se realiza una sola vez la lectura de los productos
    }, []);

    const handleProduct = product => {
        crudMethods.create(url, product); // actualiza el arreglo remoto de productos con un nuevo producto
	setProducts([...products, product]); // actualiza el arreglo local de productos con un nuevo elemento
    }

    const handleUpdatedProduct = product => {
	const productsCpy = products.map(product2change => {
            if(product2change.id === product.id)
	        return product;
	    return product2change;
	}); // actualiza un producto de los productos almacenados en local
        crudMethods.update(url, product.id, product); // actualiza un producto de los productos almacenados en remoto
	setProducts(productsCpy); // almacena esos cambios
    }

    const updateProduct = id => {
	// prepara el producto que se va a actualizar
        selectAProduct(products.find(product => product.id === id)); 
    }

    const deleteProduct = id => {
	const productsCpy = products.filter(product => product.id !== id); // actualiza los productos en local eliminando el producto seleccionado
        crudMethods.delete(url, id); // actualiza los productos en remoto eliminando el producto seleccionado
	setProducts(productsCpy); // almacena esos cambios
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
                    getUpPrepareUpdate={updateProduct}
		    getUpPrepareDelete={deleteProduct}
		    products={products}
		/>
	    }
	</div>
    );
}

export default CRUDProducts;
