import "../assets/styles/Succes.css"
import check from "../assets/img/check.png"

const Sucess = ( operationType ) => {

    return (
        <div className="bg-success">
            <div className="success">
                <img src={check} alt="" />
                <h2>{operationType} realizado con éxito</h2>
            </div>
        </div>
    )
}

export default Sucess