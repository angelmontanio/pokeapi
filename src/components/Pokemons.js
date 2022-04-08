import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from "axios";
import PokemonCards from './PokemonCards';
import { useNavigate } from 'react-router-dom';


const Pokemons = () => {

    const navigate=useNavigate();
    
    //Pokemons renderizandose
    const [pokemons,setPokemons]=useState([])
    //const [listPokemonSelected,setListPokemonSelected] = useState([])
    
    //Traemos userName del state -redux-
    const userName = useSelector(state => state.userName)
    
    //Estado para buscar por nombre o id
    const [searchPokemon,setSearchPokemon]=useState()

    //Estado para seleccionar tipos de pokemon
    const [pokemonType,setPokemontype]=useState([])

    useEffect(()=>{
        axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${200}`)
            .then(res => setPokemons(res.data.results))

        axios.get(`https://pokeapi.co/api/v2/type`)
            .then(res => setPokemontype(res.data.results))

        
    },[]);


    const submit = e =>{

        navigate(`${searchPokemon}/ `)
    }

    const selectPokemon = (e) =>{
        if(e.target.value==="all"){
            axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${200}`)
            .then(res => setPokemons(res.data.results))
            setPage(1)
        }

        console.log(e.target.value);
        axios.get(e.target.value)
            .then(res=>setPokemons(res.data.pokemon))
            setPage(1)
            
    }

    /*Paginacion*/
    const [page,setPage] = useState(1);
    const itemsNumber = 8;
    const lastIndesx=itemsNumber*page;
    const firstIndex=lastIndesx-itemsNumber;
    const pokemonPaginated=pokemons?.slice(firstIndex,lastIndesx);
    const totalPages = Math.ceil(pokemons?.length/itemsNumber);
    const pageNumbers =[]
    
    for(let i=1; i<=totalPages;i++){
        pageNumbers.push(i)
    }
    
    /**Fin de paginacion */
    
    return (
        <div className='pokemons'>
            
            
            <div className='select'>
                <span></span>
                <select onChange={selectPokemon}>
                    <option value="all">All pokemons</option>
                    {
                        pokemonType.map(type => (<option key={type.name} value={type.url}>{type.name}</option>))
                    }
                </select>
            </div>

            <form className='input-container' onSubmit={submit}>
                <label htmlFor="pokemon-name">Busca por nombre</label>
                <input 
                    type="text" 
                    id="pokemon-name" 
                    onChange={e => setSearchPokemon(e.target.value)}/>
                <button>Buscar</button>
            </form>

            <h1>Pokemones</h1>
            <h3>Hola bienvenido a la pokedex {userName}</h3>
            <br />
            <div className='pokemons--container'>
            {
                pokemons && pokemonPaginated.map((pokemon,i)=>(
                    <PokemonCards 
                        pokemonUrl={pokemon.url?pokemon.url:pokemon.pokemon.url} 
                        key={pokemon.url?pokemon.url:pokemon.pokemon.url} />

                ))
            }
            </div>
            <div>
                {pageNumbers.map(page=>
                    <button 
                        key={page} 
                        onClick={()=>setPage(page)}
                    >
                        {page}
                    </button>)}
            </div>
        </div>
    );
};

export default Pokemons;