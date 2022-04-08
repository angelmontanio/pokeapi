import './App.css';
import {
  HashRouter,
  Routes,
  Route
} from "react-router-dom"
import Start from './components/Start';
import Pokemons from './components/Pokemons';
import PokemonsInfo from './components/PokemonsInfo';
import ProtectedRoutes from './components/ProtectedRoutes';


function App() {
  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Start/>} />

          <Route element={<ProtectedRoutes/>}>
            <Route path='/pokedex' element={<Pokemons/>}/>
            <Route path='/pokedex/:id' element={<PokemonsInfo/>}/>
          </Route>
        </Routes>
        
      </div>
    </HashRouter>
    
  );
}

export default App;
