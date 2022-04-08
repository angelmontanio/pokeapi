import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



const PokemonsInfo = () => {

    const  [error,setError]=useState("");

    const [pokemon,setPokemon]=useState();

    const {id} = useParams();

    const urlBase="https://pokeapi.co/api/v2/pokemon/";

    useEffect(()=>{
        axios.get(`${urlBase}${id}/`)
            .then(res => setPokemon(res.data))
                .catch(error => setError(error))
            
    },[id])

    return (
        <div>
            {
                error?<h2>No se encontro ningun pokemon con ese nombre</h2>:
                <div className='pokemon-general-container'>
                    
                    <div className='pokemon-info-container'>
                        <section>
                            <h3>id</h3>
                            <h3>nombre</h3>
                            <span>Peso</span>
                            <span>41</span>
                            <span>Altura</span>
                            <span>41</span>
                        </section>
                    </div>
                    <div className='type-skills'>
                        <div>Type</div>
                        <div>Skills</div>
                        <div></div>
                        <div></div>
                    </div>

                    
                    <div className='pokemons-move-container'>
                        
                    </div>
                <img src={pokemon?.sprites?.other?.dream_world?.front_default} alt="" />
                
                
                
                
                
                
                </div>
            }
            
        </div>
    );
};

export default PokemonsInfo;