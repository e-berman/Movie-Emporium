import React, { useState, useEffect } from 'react';
import '../App.css'
import Axios from 'axios';
import { useHistory } from 'react-router-dom';


function StreamMovie() {
    
    const [title, setTitle] = useState('');
    const [year_released, setYearReleased] = useState('');
    const [streamMovieList, setStreamMovieList] = useState([]);
    const [keyword, setKeyword] = useState('');

    const history = useHistory();

    useEffect(() => {
        // get operation to select all rows in Customer table
        Axios.get("http://localhost:8000/stream-movies").then((response) => {
            setStreamMovieList(response.data)
        });
    }, []);
    
    const addStreamMovie = () => {
        // post operation that updates the following fields
        Axios.post("http://localhost:8000/stream-movies/add", {
            title: title,
            year_released: year_released
        });
    };

    const deleteStreamMovie = (movie) => {
        Axios.delete(`http://localhost:8000/stream-movies/delete/${movie}`);
        // reloads the page after delete
        window.location.reload(false);
    };

    return (
        <>
            <div className='table-title'>
                <h2>Enter Streamable Movie Data Below</h2>
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
                <button className='submit-button' type='submit' onClick={addStreamMovie}>Submit</button>
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
                        <th>Stream Movie ID</th>
                        <th>Title</th>
                        <th>Year Released</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {streamMovieList.filter((movie) => {
                        if (keyword == '') {
                            return movie
                        } else if (movie.title.toLowerCase().includes(keyword.toLowerCase())) {
                            return movie
                        } else if (movie.year_released.toString().includes(keyword)) {
                            return movie
                        }
                    }).map((movie) => (
                        <tr key={movie.smovie_id}>
                            <td>{movie.smovie_id}</td>
                            <td>{movie.title}</td>
                            <td>{movie.year_released}</td>
                            <td>
                                <button type="submit" onClick={() => {
                                        history.push(`/stream-movies/update/${movie.smovie_id}`);
                                    }}>Edit</button>
                            </td>
                            <td>
                                <button type="submit" onClick={() => deleteStreamMovie(movie.smovie_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default StreamMovie;
