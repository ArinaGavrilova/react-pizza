import cartEmptyImg from '../../assets/img/empty-cart.png';
import { Link } from 'react-router-dom';

import './cartEmpty.scss';

const CartEmpty = () => {
   return (
        <>
            <div className="cart cart--empty">
                <h2>Cart is empty <icon>😕</icon></h2>
                <p>
                    You probably haven't ordered a pizza yet.
                    <br />
                    To order a pizza go to the home page.
                </p>
                <img src={cartEmptyImg} alt="Empty cart" />
                <Link to="/" className="button button--black">
                    <span>Back</span>
                </Link>
            </div>
        </>
   )
}

export default CartEmpty;