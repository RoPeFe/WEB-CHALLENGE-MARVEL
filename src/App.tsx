import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import MarvelCharactersList from './components/MarvelCharactersList';
import MarvelCharacterSheet from './components/MarvelCharacterSheet';
import {MarvelCharactersProvider} from './context/MarvelCharacterContext';
import './App.css';

function App() {
    return (
        <MarvelCharactersProvider>
            <Router>
                <Header />
                <Routes>
                    <Route path='/' element={<MarvelCharactersList />} />
                    <Route path='/fav' element={<MarvelCharactersList />} />
                    <Route path='/character/:id' element={<MarvelCharacterSheet />} />
                </Routes>
            </Router>
        </MarvelCharactersProvider>
    );
}

export default App;
