import React, { useState, useEffect } from 'react';
import '../App.css'
import Axios from 'axios';
import { useHistory } from 'react-router-dom';


function BuyRentMovie() {

    const [title, setTitle] = useState('');
    const [year_released, setYearReleased] = useState('');
    const [physMovieList, setPhysMovieList] = useState([]);
    const [keyword, setKeyword] = useState('');

    const history = useHistory();

    useEffect(() => {
        // get operation to select all rows in Customer table
        Axios.get("http://localhost:8000/physical-movies").then((response) => {
            setPhysMovieList(response.data)
        });
    }, []);
    
    const addPhysMovie = () => {
        // post operation that updates the following fields
        Axios.post("http://localhost:8000/physical-movies/add", {
            title: title,
            year_released: year_released
        });
    };

    const deletePhysMovie = (movie) => {
        Axios.delete(`http://localhost:8000/physical-movies/delete/${movie}`);
        // reloads the page after delete
        window.location.reload(false);
    };

    return (

        <>
            <div className='table-title'>
                <h2>Enter Physical Movie Data Below</h2>
            </div>
            <form className="form-container">
                <label>Title</label>
                <input 
                    type='text'
                    name='title'
                    placeholder='Title' 
                    required='required'
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                />

                <label>Year Released</label>
                <input 
                    type='text'
                    name='year_released'
                    placeholder='Year Released' 
                    required='required'
                    onChange={(e) => {
                        setYearReleased(e.target.value)
                    }}
                />
                <button className='submit-button' type='submit' onClick={addPhysMovie}>Submit</button>
            </form>
            <div className="search-container">
                <label className="search-label">Search</label>
                <input
                    type='text'
                    placeholder='Enter keyword here.'
                    onChange={(e) => {
                        setKeyword(e.target.value)
                    }}
                />
            </div>
            <table className='table-container'>
                <thead>
                    <tr>
                        <th>Physical Movie ID</th>
                        {/* <th>Order ID</th>
                        <th>Category ID</th> */}
                        <th>Title</th>
                        <th>Year Released</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {physMovieList.filter((movie) => {
                        if (keyword == '') {
                            return movie
                        } else if (movie.title.toLowerCase().includes(keyword.toLowerCase())) {
                            return movie
                        } else if (movie.year_released.toString().includes(keyword)) {
                            return movie
                        }
                    }).map((movie) => (
                        <tr key={movie.pmovie_id}>
                            <td>{movie.pmovie_id}</td>
                            <td>{movie.title}</td>
                            <td>{movie.year_released}</td>
                            <td>
                                <button type="submit" onClick={() => {
                                        history.push(`/physical-movies/update/${movie.pmovie_id}`);
                                    }}>Edit</button>
                            </td>
                            <td>
                                <button type="submit" onClick={() => deletePhysMovie(movie.pmovie_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default BuyRentMovie;
