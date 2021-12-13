import React, { useState, useEffect } from 'react';
import '../App.css'
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

function OrderPage() {

    const [buy_price, setBuyPrice] = useState('');
    const [rent_price, setRentPrice] = useState('');
    const [orderList, setOrderList] = useState([]);

    const history = useHistory();

    useEffect(() => {
        // get operation to select all rows in Customer table
        Axios.get("http://localhost:8000/orders").then((response) => {
            setOrderList(response.data)
        });
    }, []);
    
    const addOrder = () => {
        // post operation that updates the following fields
        Axios.post("http://localhost:8000/orders/add", {
            buy_price: buy_price,
            rent_price: rent_price,
        });
    };

    const deleteOrder = (order) => {
        Axios.delete(`http://localhost:8000/orders/delete/${order}`);
        // reloads the page after delete
        window.location.reload(false);
    };

    return (
        <>
            <div className='table-title'>
                <h2>Enter Order Information</h2>
            </div>
            <form className="form-container">
                <label>Buy Price</label>
                <input 
                    type='text'
                    name='buy_price'
                    placeholder='Price to Buy' 
                    required='required'
                    onChange={(e) => {
                        setBuyPrice(e.target.value)
                    }}
                />

                <label>Rent Price</label>
                <input 
                    type='text'
                    name='rent_price'
                    placeholder='Price to Rent' 
                    required='required'
                    onChange={(e) => {
                        setRentPrice(e.target.value)
                    }}
                />
                <button className='submit-button' type='submit' onClick={addOrder}>Submit</button>
            </form>
            <table className='table-container'>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        {/* <th>Customer ID</th> */}
                        <th>Buy Price</th>
                        <th>Rent Price</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orderList.map((order) => (
                        <tr key={order.order_id}>
                            <td>{order.order_id}</td>
                            {/* <td>{order.customer_id}</td> */}
                            <td>{order.buy_price}</td>
                            <td>{order.rent_price}</td>
                            <td>
                                <button type="submit" onClick={() => {
                                        history.push(`/orders/update/${order.order_id}`);
                                    }}>Edit</button>
                            </td>
                            <td>
                                <button type="submit" onClick={() => deleteOrder(order.order_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default OrderPage;