import '/src/assets/styles/Error.css'
import error from '../assets/img/error.png'
const Error = ({operationType}) => {
return(
    <div className="conteiner">
        <div className='conteiner__error'>
            <img src={error} alt="" />
            <h4 >¡{`${operationType}`} FALLIDA!</h4>
        </div>
        
    </div>
)
}
export default Error
