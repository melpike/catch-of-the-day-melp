import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from '../base';

const Inventory = ({ fishes, addFish, loadSampleFishes, updateFish, deleteFish, storeId }) => {
    const [uid, setUid] = useState(null);
    const [owner, setOwner] = useState(null);
    
    useEffect(() => {
        console.log('this ran');
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                console.log(user);
                authHandler({user});
            }
        })
    }, []);
    const authHandler = async authData => {
        const store = await base.fetch(storeId, { context: this });
        if (!store.owner) {
            await base.post(`${storeId}/owner`, {
                data: authData.user.uid,
            })
        }
        setUid(authData.user.uid);
        setOwner(store.owner || authData.user.uid)
    }

    const authenticate = async (provider) => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        await firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(authHandler);
    }

    const handleLogout = async () => {
        await firebase.auth().signOut();
        setUid(null);

    }

    const Logout = <button onClick={handleLogout}>Log Out!</button>

    return (<>
        {!uid ? (
            <Login authenticate={authenticate} />
        ) : (<>
        {uid !== owner ? (
            <div>
                <p>Sorry, you are not the owner!</p>
                {Logout}
            </div>
        ) : (
            <div className='inventory'>
                <h2>Inventory</h2>
                {Logout}
                {Object.entries(fishes).map(([key, fish]) => <EditFishForm key={key} index={key} fish={fish} updateFish={updateFish} deleteFish={deleteFish} />)}
                <AddFishForm addFish={addFish} />
                <button onClick={loadSampleFishes}>Load Sample Fishes</button>
            </div>
        )}
        </>)}
        
    </>);
    
};

Inventory.propTypes = {
    fishes: PropTypes.shape({
        image: PropTypes.string,
        name: PropTypes.string,
        desc: PropTypes.string,
        status: PropTypes.string,
        price: PropTypes.number,
    }),
    addFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    storeId: PropTypes.string,
}

export default Inventory;