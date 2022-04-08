import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { setColor } from '../functions/setColor';
import { Link } from 'react-router-dom';

const PokemonCards = ({pokemonUrl}) => {

    const [pokemon,setPokemon]=useState({})


    useEffect(()=>{
        axios.get(pokemonUrl)
            .then(res=>setPokemon(res.data))
    },[pokemonUrl])

    
    return(
            
                <Link to={`/pokedex/${pokemon.id}`}
                    className="poke-card-link"
                    
                >
                    <div className='poke-card' style={{
                        background: setColor(pokemon.types?.[0]?.type.name)
                    }}>
                        <img src={pokemon?.sprites?.other?.dream_world?.front_default} alt="" />
                        <div className='poke-card--info'>
                            <h3>{pokemon?.species?.name}</h3>
                            <h4>
                            {
                                pokemon.types?.length > 1 ?
                                    `${pokemon.types?.[0]?.type.name}/${pokemon.types?.[1]?.type.name}` :
                                    `${pokemon.types?.[0]?.type.name}`
                            }
                            </h4>
                            <section className='info--table'>
                                <div className='table--section'>
                                    <h4>HP</h4>
                                    <p>{pokemon.stats?.[0]?.base_stat}</p>
                                </div>
                                <div className='table--section'>
                                    <h4>Attack</h4>
                                    <p>{pokemon.stats?.[1]?.base_stat}</p>
                                </div>
                                <div className='table--section'>
                                    <h4>Defense</h4>
                                    <p>{pokemon.stats?.[2]?.base_stat}</p>
                                </div>
                                <div className='table--section'>
                                    <h4>Speed</h4>
                                    <p>{pokemon.stats?.[pokemon.stats?.length - 1]?.base_stat}</p>
                                </div>
                            </section>

                        </div>
                    </div>
                </Link>
                 );
};

export default PokemonCards;