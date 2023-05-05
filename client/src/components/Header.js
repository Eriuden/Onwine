import React, {useState, useContext} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UidContext } from './AppContext';
import { Squash as Hamburger} from "hamburger-react";
import { Logout } from './Logout';

//Rappel, j'utilise tout le temps le système de l'Uid context
//ca personnalise un peu l'expérience mais c'est surtout pour savoir si on est co

export const Header = () => {
    const [ hamburger, setHamburger] = useState(false)
    const uid = useContext(UidContext)
    const user = useSelector((state)=> state.userReducer)

  return (
    <div>
        <div>
            <h1>Onwine</h1>
            <p>Les vins pour garder la ligne</p>
        </div>

        <nav>
            <Link to={"/"}>Acceuil</Link>
            {uid ? (
                <>
                    <Link to={"/user-profile/:id"}>
                    <h5>Bonjour {user.name}</h5>
                    </Link>

                    <Logout/>
                </>
                
            ) : (
                <>
                    <Link to={"/connexion"}>Connexion</Link>
                    <Link to={"/inscription"}>Inscription</Link>
                </>
                
            )}
        </nav>

        <h2 onClick={()=> setHamburger(!hamburger)}>
            <Hamburger/>
        </h2>

        {hamburger ? (
            <nav>
                <Link to={"/"}>Acceuil</Link>
                {uid ? (
                    <>
                        <Link to={"/user-profile/:id"}>
                        <h5>Bonjour {user.name}</h5>
                        </Link>

                        <Logout/>
                    </>
                    
                ) : (
                    <>
                        <Link to={"/connexion"}>Connexion</Link>
                        <Link to={"/inscription"}>Inscription</Link>
                    </>
                    
                )}
            </nav>
        ):""}
    </div>
  )
}
