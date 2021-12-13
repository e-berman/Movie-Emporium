import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import '../../App.css'

const EditCustomer = (props) => {

    // Initializes State and History hooks. State hooks initialized to values of id matched object.

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [data, setData] = useState([]);

    const history = useHistory();

    const { customer_id } = props.match.params

    useEffect(() => {

        Axios.get(`http://localhost:8000/customers/update/${customer_id}`).then((response) => {
            setFirstName(response.data[0].first_name)
            setLastName(response.data[0].last_name)
            setEmail(response.data[0].email)
        });
    }, []);

    const updateCustomer = (customer_id) => {

        Axios.put(`http://localhost:8000/customers/update/${customer_id}`, {
            first_name: first_name,
            last_name: last_name,
            email: email
        });
        history.push('/customers');
    };

    return (
        <> 
            <div className="table-title">
                <h1>Edit Customer</h1>
            </div>
            <form className="form-container">
                <div className="form-container" key={data.first_name}>
                    <label>First Name</label>
                    <input
                        type="text"
                        value={first_name}
                        name="first_name"
                        onChange={(e) => {
                            setFirstName(e.target.value)
                        }}
                    />
                </div>
                <div className="form-container" key={data.last_name}>
                    <label>Last Name</label>
                    <input
                        type="text"
                        value={last_name}
                        name="last_name"
                        onChange={(e) => {
                            setLastName(e.target.value)
                        }}
                    />
                </div>
                <div className="form-container" key={data.email}>
                    <label>Email</label>
                    <input
                        type="text"
                        value={email}
                        name="email"
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    />
                </div>
                <button className="submit-button"
                    onClick={() => updateCustomer(customer_id)}
                >Confirm</button>
            </form>
        </>
    )

}

export default EditCustomer;