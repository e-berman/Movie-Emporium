import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import '../../App.css'

const EditBuyRentMovie = (props) => {

    // Initializes State and History hooks. State hooks initialized to values of id matched object.

    const [title, setTitle] = useState('');
    const [year_released, setYearReleased] = useState('');
    const [data, setData] = useState([]);

    const history = useHistory();

    const { pmovie_id } = props.match.params

    useEffect(() => {

        Axios.get(`http://localhost:8000/physical-movies/update/${pmovie_id}`).then((response) => {
            setTitle(response.data[0].title)
            setYearReleased(response.data[0].year_released)
        });
    }, []);

    const updatePhysMovie = (pmovie_id) => {

        Axios.put(`http://localhost:8000/physical-movies/update/${pmovie_id}`, {
            title: title,
            year_released: year_released
        });
        history.push('/physical-movies');
    };

    return (
        <> 
            <div className="table-title">
                <h1>Edit Physical Movie</h1>
            </div>
            <form className="form-container">
                <div className="form-container" key={data.title}>
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        name="title"
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                    />
                </div>
                <div className="form-container" key={data.year_released}>
                    <label>Year Released</label>
                    <input
                        type="text"
                        value={year_released}
                        name="year_released"
                        onChange={(e) => {
                            setYearReleased(e.target.value)
                        }}
                    />
                </div>
                <button className="submit-button"
                    onClick={() => updatePhysMovie(pmovie_id)}
                >Confirm</button>
            </form>
        </>
    )

}

export default EditBuyRentMovie;