import React, { useState, useEffect } from 'react';
import '../App.css'
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

function CustomerPage() {

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [customerList, setCustomerList] = useState([]);

    const history = useHistory();

    useEffect(() => {
        // get operation to select all rows in Customer table
        Axios.get("http://localhost:8000/customers").then((response) => {
            setCustomerList(response.data)
        });
    }, []);
    
    const addCustomer = () => {
        // post operation that updates the following fields
        Axios.post("http://localhost:8000/customers/add", {
            first_name: first_name,
            last_name: last_name,
            email: email
        });
    };

    const deleteCustomer = (customer) => {
        Axios.delete(`http://localhost:8000/customers/delete/${customer}`);
        // reloads the page after delete
        window.location.reload(false);
    };

        
    return (
        <>
            <div className='table-title'>
                <h2>Enter Customer Information</h2>
            </div>
            <form className="form-container">
            
                <label>First Name</label>
                <input 
                    type='text'
                    name='first_name'
                    placeholder='First Name' 
                    required='required'
                    onChange={(e) => {
                        setFirstName(e.target.value)
                    }}
                />
            
                <label>Last Name</label>
                <input 
                    type='text'
                    name='last_name'
                    placeholder='Last Name' 
                    required='required'
                    onChange={(e) => {
                        setLastName(e.target.value)
                    }}
                />
            
                <label>Email</label>
                <input 
                    type='text'
                    name='email'
                    placeholder='Email' 
                    required='required'
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                />
                <button className='submit-button' onClick={addCustomer}>Submit</button>
            </form>
            <form>
                <table className='table-container'>
                    <thead>
                        <tr>
                            <th>Customer ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {customerList.map((customer) => (
                            <tr key={customer.customer_id}>
                                <td>{customer.customer_id}</td>
                                <td>{customer.first_name}</td>
                                <td>{customer.last_name}</td>
                                <td>{customer.email}</td>
                                <td>
                                    <button type="submit" onClick={() => {
                                            history.push(`/customers/update/${customer.customer_id}`);
                                        }}>Edit</button>
                                </td>
                                <td>
                                    <button type="submit" onClick={() => deleteCustomer(customer.customer_id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </form>
        </>
    );
}

export default CustomerPage;