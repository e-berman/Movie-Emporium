import React, { useState, useEffect } from 'react';
import '../App.css'
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

function CategoriesPage() {

    const [genre, setGenre] = useState('');
    const [categoriesList, setCategoriesList] = useState([]);

    const history = useHistory();

    useEffect(() => {
        // get operation to select all rows in Categories table
        Axios.get("http://localhost:8000/categories").then((response) => {
            setCategoriesList(response.data)
        });
    }, []);
    
    const addCategory = () => {
        // post operation that updates the following fields
        Axios.post("http://localhost:8000/categories/add", {
            genre: genre
        });
    };

    const deleteCategory = (category) => {
        Axios.delete(`http://localhost:8000/categories/delete/${category}`);
        // reloads the page after delete
        window.location.reload(false);
    };

    return (
        <>
            <div className='table-title'>
                <h2>Enter Category Information</h2>
            </div>
            <form className="form-container">
                <label>Genre</label>
                <input 
                    type='text'
                    name='genre'
                    placeholder='Genre' 
                    required='required'
                    onChange={(e) => {
                        setGenre(e.target.value)
                    }}
                />
                <button className='submit-button' type='submit' onClick={addCategory}>Submit</button>
            </form>
            <table className='table-container'>
                <thead>
                    <tr>
                        <th>Category ID</th>
                        {/* <th>Stream Movie ID</th>
                        <th>Physical Movie ID</th> */}
                        <th>Genre</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {categoriesList.map((category) => (
                        <tr key={category.category_id}>
                            <td>{category.category_id}</td>
                            <td>{category.genre}</td>
                            <td>
                                <button type="submit" onClick={() => {
                                        history.push(`/categories/update/${category.category_id}`);
                                    }}>Edit</button>
                            </td>
                            <td>
                                <button type="submit" onClick={() => deleteCategory(category.category_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default CategoriesPage;
