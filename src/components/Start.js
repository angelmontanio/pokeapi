import React, { useState } from 'react';
import img from '.././assets/img';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Start = () => {
    
    const [userName,setUsername]=useState("");
    const dispatch=useDispatch();

    const navigate = useNavigate();

    
    const submit = e =>{
        e.preventDefault()
        dispatch({
            type:"GET_USERNAME",
            payload:userName
        })
        setUsername("")
        navigate("/pokedex")

    }
    
    return (
        <div>
            <div className='start-form'>
                <img src={img.pokedex} alt="pokedex" />
                <h1>¡Hola entrenador!</h1>
                <p>Para poder comenzar, dame tu nombre</p>
                <div className='start-form__input'>
                    <form action="" onSubmit={submit}>
                        <input type="text" 
                            onChange={e=>setUsername(e.target.value)}
                            value={userName}
                            required
                        />
                        <button onClick={console.log(userName)}>Comenzar</button>
                    </form>    
                </div>
            </div>

                <div className='start-form__cinta'>
                    <div className='cinta--red'>
                        <img src={img.circle} alt="circle" />
                    </div>
                    <div className='cinta--black'></div>
                </div>

            
        </div>
    );
};

export default Start;