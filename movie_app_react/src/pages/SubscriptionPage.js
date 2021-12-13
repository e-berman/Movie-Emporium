import React, { useState, useEffect } from 'react';
import '../App.css'
import Axios from 'axios';
import { useHistory } from 'react-router-dom';


function SubscriptionPage() {

    const [subscription_level, setSubscriptionLevel] = useState('');
    const [access_to_rent, setAccessToRent] = useState('');
    const [access_to_buy, setAccessToBuy] = useState('');
    const [access_to_stream, setAccessToStream] = useState('');
    const [subscriptionList, setSubscriptionList] = useState([]);

    const history = useHistory();

    useEffect(() => {
        // get operation to select all rows in Customer table
        Axios.get("http://localhost:8000/subscriptions").then((response) => {
            setSubscriptionList(response.data)
        });
    }, []);
    
    const addSubscription = () => {
        // post operation that updates the following fields
        Axios.post("http://localhost:8000/subscriptions/add", {
            subscription_level: subscription_level,
            access_to_rent: access_to_rent,
            access_to_buy: access_to_buy,
            access_to_stream: access_to_stream
        });
    };

    const deleteSubscription = (subscription) => {
        Axios.delete(`http://localhost:8000/subscriptions/delete/${subscription}`);
        // reloads the page after delete
        window.location.reload(false);
    };

    return (
        <>
            <div className='table-title'>
                <h2>Enter Subscription Information</h2>
            </div>
            <form className="form-container">
                <label>Subscription Level</label>
                <input 
                    type='text'
                    name='subscription_level'
                    placeholder='Subscription Level' 
                    required='required'
                    onChange={(e) => {
                        setSubscriptionLevel(e.target.value)
                    }}
                />

                <label>Access To Rent</label>
                <input 
                    type='text'
                    name='access_to_rent'
                    placeholder='True or False' 
                    required='required'
                    onChange={(e) => {
                        setAccessToRent(e.target.value)
                    }}
                />

                <label>Access To Buy</label>
                <input 
                    type='text'
                    name='access_to_buy'
                    placeholder='True or False' 
                    required='required'
                    onChange={(e) => {
                        setAccessToBuy(e.target.value)
                    }}
                />

                <label>Access To Stream</label>
                <input 
                    type='text'
                    name='access_to_stream'
                    placeholder='True or False' 
                    required='required'
                    onChange={(e) => {
                        setAccessToStream(e.target.value)
                    }}
                />
                <button className='submit-button' type='submit' onClick={addSubscription}>Submit</button>
            </form>
            <table className='table-container'>
                <thead>
                    <tr>
                        <th>Subscription ID</th>
                        {/* <th>Customer ID</th>
                        <th>Stream Movie ID</th> */}
                        <th>Subscription Level</th>
                        <th>Access To Rent</th>
                        <th>Access To Buy</th>
                        <th>Access To Stream</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {subscriptionList.map((subscription) => (
                        <tr key={subscription.subscription_id}>
                            <td>{subscription.subscription_id}</td>
                            {/* <td>{subscription.customer_id}</td>
                            <td>{subscription.smovie_id}</td> */}
                            <td>{subscription.subscription_level}</td>
                            <td>{subscription.access_to_rent}</td>
                            <td>{subscription.access_to_buy}</td>
                            <td>{subscription.access_to_stream}</td>
                            <td>
                                <button type="submit" onClick={() => {
                                        history.push(`/subscriptions/update/${subscription.subscription_id}`);
                                    }}>Edit</button>
                            </td>
                            <td>
                                <button type="submit" onClick={() => deleteSubscription(subscription.subscription_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default SubscriptionPage;