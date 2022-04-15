import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { setColor } from '../functions/setColor';
import Header from './Header';
import ProgressBar from './ProgressBar';


const PokemonsInfo = () => {

    const [pokemon,setPokemon]=useState({});

    const {id} = useParams();
    

    const urlBase="https://pokeapi.co/api/v2/pokemon/";

    useEffect(()=>{
        axios.get(`${urlBase}${id}/`)
            .then(res => setPokemon(res.data))

            
    },[id])

    return (
        <>
        <Header/>
         <div className="container" >
            
            
            <div className="pokemon-card-container" >
                <div 
                    style={ { background: setColor( pokemon.types?.[0]?.type.name ) } }
                    className="poke-type-back" 
                ></div>
                <section className="section pokedex-pokemon-header" >
                    <div className="pokedex-pokemon-pagination">
                    </div>
                    <div className="pokedex-pokeTitle" >
                        {pokemon.name}
                        <span className="poke-number" >N.º{pokemon.id}</span>
                        <img src={ pokemon.sprites?.other?.dream_world.front_default } alt="" />
                    </div>
                </section>
                <section className="pokedex-pokemon-details" >
                    <div className="column1" >
                        <div className="pokemon-details-right" >
                            <h3>Tipe/s</h3>
                            <span>
                                {
                                    pokemon.types?.length > 1 ?
                                        <div className="poke-types" >
                                            <div
                                                style={ { background: setColor( pokemon.types?.[0]?.type.name ) } }
                                            >{pokemon.types?.[0]?.type.name}</div>
                                            <div
                                                style={ { background: setColor( pokemon.types?.[1]?.type.name ) } }
                                            >{pokemon.types?.[1]?.type.name}</div>
                                        </div> :
                                        <div className="poke-type" >
                                            <div
                                                style={ { background: setColor( pokemon.types?.[0]?.type.name ) } }
                                            >{pokemon.types?.[0]?.type.name}</div>
                                        </div>
                                }
                            </span>
                        </div>
                        <div className="pokemon-details-right" >
                            <h3>Abilities</h3>
                            <span>
                                {
                                    pokemon.abilities?.length > 1 ?
                                        <div className="poke-abilities" >
                                            <div>
                                                {pokemon.abilities?.[0]?.ability.name}
                                            </div>
                                            <div>
                                                {pokemon.abilities?.[1]?.ability.name}
                                            </div>
                                        </div> :
                                        <div className="poke-abilitie" >
                                            <div>
                                                {pokemon.abilities?.[0]?.ability.name}
                                            </div>
                                        </div>
                                }
                            </span>
                        </div>
                    </div>
                </section>
                <ProgressBar 
                    hp={ pokemon.stats?.[0]?.base_stat }
                    attack={ pokemon.stats?.[1]?.base_stat }
                    defense={ pokemon.stats?.[2]?.base_stat }
                    speed={ pokemon.stats?.[pokemon.stats?.length - 1]?.base_stat }
                />                
                <section className="moves-wrapper" >
                    <ul className="moves-container" >
                        {
                            pokemon.moves?.map( idx => (
                                <li key={idx.move?.name}>{ idx.move?.name }</li>
                            ))
                        }
                    </ul>
                </section>
            </div>

        </div>
            
        </>   
        
    );
};

export default PokemonsInfo;
