import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import '../../App.css'

const EditSubscription = (props) => {

    // Initializes State and History hooks. State hooks initialized to values of id matched object.

    const [subscription_level, setSubscriptionLevel] = useState('');
    const [access_to_rent, setAccessToRent] = useState('');
    const [access_to_buy, setAccessToBuy] = useState('');
    const [access_to_stream, setAccessToStream] = useState('');
    const [data, setData] = useState([]);

    const history = useHistory();

    const { subscription_id } = props.match.params

    useEffect(() => {

        Axios.get(`http://localhost:8000/subscriptions/update/${subscription_id}`).then((response) => {
            setSubscriptionLevel(response.data[0].subscription_level)
            setAccessToRent(response.data[0].access_to_rent)
            setAccessToBuy(response.data[0].access_to_buy)
            setAccessToStream(response.data[0].access_to_stream)
        });
    }, []);

    const updateSubscription = (subscription_id) => {

        Axios.put(`http://localhost:8000/subscriptions/update/${subscription_id}`, {
            subscription_level: subscription_level,
            access_to_rent: access_to_rent,
            access_to_buy: access_to_buy,
            access_to_stream: access_to_stream
        });
        history.push('/subscriptions');
    };

    return (
        <> 
            <div className="table-title">
                <h1>Edit Subscription</h1>
            </div>
            <form className="form-container">
                <div className="form-container" key={data.subscription_level}>
                    <label>Subscription Level</label>
                    <input
                        type="text"
                        value={subscription_level}
                        name="subscription_level"
                        onChange={(e) => {
                            setSubscriptionLevel(e.target.value)
                        }}
                    />
                </div>
                <div className="form-container" key={data.access_to_rent}>
                    <label>Access To Rent</label>
                    <input
                        type="text"
                        value={access_to_rent}
                        name="access_to_rent"
                        onChange={(e) => {
                            setAccessToRent(e.target.value)
                        }}
                    />
                </div>
                <div className="form-container" key={data.access_to_buy}>
                    <label>Access To Buy</label>
                    <input
                        type="text"
                        value={access_to_buy}
                        name="access_to_buy"
                        onChange={(e) => {
                            setAccessToBuy(e.target.value)
                        }}
                    />
                </div>
                <div className="form-container" key={data.access_to_stream}>
                    <label>Access To Stream</label>
                    <input
                        type="text"
                        value={access_to_stream}
                        name="access_to_stream"
                        onChange={(e) => {
                            setAccessToStream(e.target.value)
                        }}
                    />
                </div>
                <button className="submit-button"
                    onClick={() => updateSubscription(subscription_id)}
                >Confirm</button>
            </form>
        </>
    )

}

export default EditSubscription;