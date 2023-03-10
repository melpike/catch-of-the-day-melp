import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

const Fish = ({ details, addToOrder }) => {
    const { name, image, price, status, desc } = details;
    const isAvailable = status === 'available';

    return (
        <li className='menu-fish'>
            <img src={image} alt={name} />
            <h3 className='fish-name'>
                {name}
                <span className='price'>{formatPrice(price)}</span>
            </h3>
            <p>{desc}</p>
            <button disabled={!isAvailable} onClick={addToOrder}>{isAvailable ? 'Add to Order' : 'Sold Out'}</button>
        </li>
    )
}

Fish.propTypes = {
    details: PropTypes.shape({
        image: PropTypes.string,
        name: PropTypes.string,
        desc: PropTypes.string,
        status: PropTypes.string,
        price: PropTypes.number,
    }),
    addToOrder: PropTypes.func,
}

export default Fish;