import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from "axios";
import PokemonCards from './PokemonCards';
import { useNavigate } from 'react-router-dom';
import Header from './Header';


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
        axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${1126}`)
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
            setNumberPageSection(1)
        }

        console.log(e.target.value);
        axios.get(e.target.value)
            .then(res=>setPokemons(res.data.pokemon))
            setPage(1)
            setNumberPageSection(1)
            
    }

    /*Paginacion*/
    const [page,setPage] = useState(1);
    const itemsNumber = 8;
    const lastIndesx=itemsNumber * page;
    const firstIndex=lastIndesx-itemsNumber;
    const pokemonPaginated=pokemons?.slice(firstIndex,lastIndesx);
    const totalPages = Math.ceil(pokemons?.length/itemsNumber);
    const pageNumbers =[]
    
    for(let i=1; i<=totalPages;i++){
        pageNumbers.push(i)
    }

    /**PAGINACION DE LA PAGINACION */
    const [numberPageSection,setNumberPageSection]=useState(1)
    const lastNumberPagination=numberPageSection*8
    const numberPaginates=pageNumbers.slice(lastNumberPagination-8,lastNumberPagination)
    const totalNumbersPagination=Math.ceil(numberPaginates.length/8)
    
    
    /**Fin de paginacion */
    
    return (
        <div className='pokemons'>
            
            <Header/>
            <h3> <span>Bienvenido {userName},</span> aquí podrás encontrar tu pokemón favorito.</h3>
            
            <div className='search-and-filtrer'>
            
            <form className='input-container' onSubmit={submit}>
                <input 
                    type="text" 
                    id="pokemon-name" 
                    onChange={e => setSearchPokemon(e.target.value)}
                    placeholder="Buscar por nombre o Id"   
                />
                <button>Buscar</button>
            </form>
            
            
            
            <div className='select'>
                
                <select onChange={selectPokemon}>
                    <option value="all">All pokemons</option>
                    {
                        pokemonType.map(type => (<option key={type.name} value={type.url}>{type.name}</option>))
                    }
                </select>
            </div>
            </div>

            

            
            
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
                {
                numberPageSection > 1 && 
                <button 
                    className="button-pagination"
                    onClick={()=>setNumberPageSection(numberPageSection-1)}
                >
                    
                    
                    <b>&lt; &lt;</b>
                </button>
                }
                {numberPaginates.map(page=>
                    <button 
                        key={page} 
                        onClick={()=>setPage(page)}
                        className="button-pagination"
                    >
                        {page}
                    </button>)}
                {totalNumbersPagination >=1 && <button 
                    className="button-pagination"
                    onClick={()=>setNumberPageSection(numberPageSection+1)}
                >
                    <b>&gt; &gt;</b>
                </button>}
            </div>
        </div>
    );
};

export default Pokemons;