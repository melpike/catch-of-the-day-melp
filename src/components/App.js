import React, { useState, useEffect } from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

const App = (props) => {
    const storeId = props.match.params.storeId;
    const localStorageRef = localStorage.getItem(storeId);

    const [fishes, setFishes] = useState({});
    const [order, setOrder] = useState(JSON.parse(localStorageRef) || {})

    useEffect(() => {
        if (localStorageRef) {
            setOrder(JSON.parse(localStorageRef));
        }
        const ref = base.syncState(`${storeId}/fishes`, {
            context: {
              setState: ({ fishes }) => setFishes({ ...fishes }),
            },
            state: 'fishes'
          })
      
          return () => {
            base.removeBinding(ref);
          }
      }, []);

    useEffect(() => {
        localStorage.setItem(storeId, JSON.stringify(order));
    },[order]);

    const addFish = (fish) => {
        const addFishes = { ...fishes, [`fish${Date.now()}`]: fish };
        setFishes(addFishes);
        base.post(`${storeId}/fishes`, {
            data: addFishes
        });
    }

    const updateFish = (key, updatedFish) => {
        const updatedFishes = { ...fishes, [key]: updatedFish };
        setFishes(updatedFishes);
        base.post(`${storeId}/fishes`, {
            data: updatedFishes
        });
    }

    const deleteFish = (key) => {
        const updatedFishes = { ...fishes, [key]: null }
        setFishes(updatedFishes);
        base.post(`${storeId}/fishes`, {
            data: updatedFishes
        });
    }

    const loadSampleFishes = () => {
        const loadFishes = { ...fishes, ...sampleFishes };
        setFishes(loadFishes);
            base.post(`${storeId}/fishes`, {
            data: loadFishes
        });
    }

    const addToOrder = (key) => {
        setOrder({
            ...order,
            [key]: order[key] + 1 || 1
        })
    }

    const deleteFromOrder = (key) => {
        const orders = { ...order };
        delete orders[key];
        setOrder(orders);
    }

    return (
        <div className='catch-of-the-day'>
            <div className='menu'>
                <Header tagline="Fresh Seafood Market" />
                <ul className='fishes'>
                    {Object.entries(fishes).map(([key, fish]) => (
                        <Fish
                            key={key}
                            details={fish}
                            addToOrder={() => addToOrder(key)}
                        />)
                    )}
                </ul>
            </div>
            <Order 
                fishes={fishes} 
                order={order} 
                deleteFromOrder={deleteFromOrder} 
            />
            <Inventory 
                fishes={fishes} 
                addFish={addFish} 
                loadSampleFishes={loadSampleFishes} 
                updateFish={updateFish} 
                deleteFish={deleteFish}
                storeId={storeId}
            />
        </div>
    )
}

export default App;