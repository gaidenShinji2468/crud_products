import check from "../assets/img/check"

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