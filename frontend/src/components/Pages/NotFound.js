import { Link } from 'react-router-dom';
import './NotFound.css';


const NotFound = () =>{
    return(
        <div className="Notfound-div">
            <h1><span>404</span> Error</h1><br/>
            <h3>This page doesn't exist<span> !</span></h3><br/>
            <h3><Link to="/">Back to Home page</Link></h3>
        </div>
    )
}

export default NotFound;