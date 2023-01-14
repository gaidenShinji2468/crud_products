import '/src/assets/styles/Error.css'
const Error = ({operationType}) => {
return(
    <div className="error">
        <h4>¡{`${operationType}`} FALLIDA!</h4>
    </div>
)
}
export default Error
