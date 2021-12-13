import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import '../../App.css'

const EditOrder = (props) => {

    // Initializes State and History hooks. State hooks initialized to values of id matched object.

    const [buy_price, setBuyPrice] = useState('');
    const [rent_price, setRentPrice] = useState('');
    const [data, setData] = useState([]);

    const history = useHistory();

    const { order_id } = props.match.params

    useEffect(() => {

        Axios.get(`http://localhost:8000/orders/update/${order_id}`).then((response) => {
            setBuyPrice(response.data[0].buy_price)
            setRentPrice(response.data[0].rent_price)
        });
    }, []);

    const updateOrder = (order_id) => {

        Axios.put(`http://localhost:8000/orders/update/${order_id}`, {
            buy_price: buy_price,
            rent_price: rent_price,
        });
        history.push('/orders');
    };

    return (
        <> 
            <div className="table-title">
                <h1>Edit Order</h1>
            </div>
            <form className="form-container">
                <div className="form-container" key={data.buy_price}>
                    <label>Buy Price</label>
                    <input
                        type="text"
                        value={buy_price}
                        name="buy_price"
                        onChange={(e) => {
                            setBuyPrice(e.target.value)
                        }}
                    />
                </div>
                <div className="form-container" key={data.rent_price}>
                    <label>Rent Price</label>
                    <input
                        type="text"
                        value={rent_price}
                        name="rent_price"
                        onChange={(e) => {
                            setRentPrice(e.target.value)
                        }}
                    />
                </div>
                <button className="submit-button"
                    onClick={() => updateOrder(order_id)}
                >Confirm</button>
            </form>
        </>
    )

}

export default EditOrder;