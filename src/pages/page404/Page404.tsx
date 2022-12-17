import { Link } from "react-router-dom";

export const Page404 = () => {
    return (
        <div>
            <h1>Oops! You seem to be lost.</h1>
            <p>Here are some helpful links:</p>
            <div><Link to='/'>Home</Link></div>
            <div><Link to='/cart'>Cart</Link></div>
        </div>
    )
}