import React from 'react';
import img from '.././assets/img';

const Header = () => {
    return (
        <div className='header'>
            <div className='header--redzone'> 
                <img src={img.pokedex} alt="" />
            </div>
            
               
            <div className='header--blackzone'>
                <img src="https://pngimg.com/uploads/pokeball/pokeball_PNG8.png" alt="" />
            </div>
        </div>
    );
};

export default Header;