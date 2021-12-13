// Citation for Slideshow library
// Date: 10/28/2021
// Version: 3.6.0
// Author: https://www.npmjs.com/~femioladeji
// Source URL: https://www.npmjs.com/package/react-slideshow-image

import React from "react";
import { Fade } from "react-slideshow-image";
import ImageData from "./ImageData";
import 'react-slideshow-image/dist/styles.css'

function Autoplay() {

    const properties = {
        autoplay: true,
        duration: 4000,
        indicators: true,
        arrows: false,
        pauseOnHover: false,
    };

    return (
        <div className='slide-container'>
            <Fade {...properties}>
                <div className="each-fade">
                    <div>
                        <img src={ImageData[0].image} />
                    </div>
                </div>
                <div className="each-fade">
                    <div>
                        <img src={ImageData[1].image} />
                    </div>
                </div>
                <div className="each-fade">
                    <div>
                        <img src={ImageData[2].image} />
                    </div>
                </div>
                <div className="each-fade">
                    <div>
                        <img src={ImageData[3].image} />
                    </div>
                </div>
                <div className="each-fade">
                    <div>
                        <img src={ImageData[4].image} />
                    </div>
                </div>
            </Fade>
        </div>
      );
    };

export default Autoplay;