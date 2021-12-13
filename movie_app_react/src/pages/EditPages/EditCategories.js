import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import '../../App.css'

const EditCategories = (props) => {

    // Initializes State and History hooks. State hooks initialized to values of id matched object.

    const [genre, setGenre] = useState('');
    const [data, setData] = useState([]);

    const history = useHistory();

    const { category_id } = props.match.params

    useEffect(() => {

        Axios.get(`http://localhost:8000/categories/update/${category_id}`).then((response) => {
            setGenre(response.data[0].genre)
        });
    }, []);

    const updateCategory = (category_id) => {

        Axios.put(`http://localhost:8000/categories/update/${category_id}`, {
            genre: genre
        });
        history.push('/categories');
    };

    return (
        <> 
            <div className="table-title">
                <h1>Edit Category</h1>
            </div>
            <form className="form-container">
                <div className="form-container" key={data.genre}>
                    <label>Genre</label>
                    <input
                        type="text"
                        value={genre}
                        name="genre"
                        onChange={(e) => {
                            setGenre(e.target.value)
                        }}
                    />
                </div>
                <button className="submit-button"
                    onClick={() => updateCategory(category_id)}
                >Confirm</button>
            </form>
        </>
    )

}

export default EditCategories;