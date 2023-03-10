import React, { useRef } from 'react';
import { getFunName } from '../helpers';

const StorePicker = (props) => {
    const myInput = useRef(null);
    
    const goToStore = (event) => {
        event.preventDefault();
        const storeName = myInput.current.value;
        props.history.push(`/store/${storeName}`);
    }

    return (
        <form className='store-selector' onSubmit={goToStore}>
            <h2>Please Enter a Store</h2>
            <input 
                type='text' 
                ref={myInput}
                required 
                placeholder='Store Name' 
                defaultValue={getFunName()} 
            />
            <button type='submit'>Visit Store</button>
        </form>
    );
}

export default StorePicker;