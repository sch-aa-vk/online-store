import { Link } from "react-router-dom";

import './page404.css';

export const Page404 = () => {
  return (
    <div className="error">
      <div className="error__wrapper">
        <h1>Oops! You seem to be lost</h1>
        <p>Here are some helpful links: <Link to='/' className="link">Home</Link>, <Link to='/cart' className="link">Cart</Link></p>
      </div>
    </div>
  )
}