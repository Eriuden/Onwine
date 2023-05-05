import { Header } from './components/Header';
import './App.css';
import { Routes, Route } from 'react-router';
import { Home } from './pages/Home';
import { Connexion } from './pages/Connexion';
import { Inscription } from './pages/Inscription';
import { WinePage } from './pages/winePage';
import { UserProfile } from './pages/UserProfile';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path={"/"} element={<Home/>}/>
        <Route exact path={"/connexion"} element={<Connexion/>}/>
        <Route exact path={"/inscription"} element={<Inscription/>}/>
        <Route exact path={"/winepage/:id"} element={<WinePage/>}/>
        <Route exact path={"/user-profile/:id"} element={<WinePage/>}/>
      </Routes>
    </div>
  );
}

export default App;
