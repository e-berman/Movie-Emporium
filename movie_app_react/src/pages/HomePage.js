import React from 'react';
import '../App.css'
import Slideshow from '../components/slideshow/Slideshow';


function HomePage() {

    return (
        <>
            <div className="home">
                <h1>Movie Emporium allows the user the option to buy, rent, or stream a movie. </h1>
            </div>
            <div className="fader">
                <Slideshow slides={ImageData}/>
            </div>
        </>
    );
}

export default HomePage;