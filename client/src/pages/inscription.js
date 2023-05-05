import React, { useState} from "react"
import axios from "axios"
import Connexion from "./Connexion"

import React from 'react'

export const Inscription = () => {
  const [formSubmit, setFormSubmit] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [password, setPassword] = useState("")
  const [ passwordControl, setPasswordControl] = useState("")

  const handleRegister = async(e)=> {
    e.preventDefault()

    const terms = document.getElementById("terms")
    const nameError = document.querySelector(".name.error")
    const emailError = document.querySelector(".email.error")
    const addressError = document.querySelector(".address.error")
    const passwordError = document.querySelector(".password.error")
    const passwordControlError = document.querySelector(".password-control.error")
    const termsError = document.querySelector(".terms.error")
    passwordControlError.innerHtml=""
    termsError.innerHTML=""

    if(password !== passwordControlError || !terms.checked) {
        if (password !== passwordControl){
            passwordControlError.innerHTML="Les mots de passes ne correspondent pas"
        }

        if ( !terms.checked) {
            termsError.innerHTML="Veuillez accepter les conditions d'utilisations"
        }
    } else {
        await axios({
            method:"post",
            url: `${process.env.REACT_APP_API_URL}api/user/register`,
            data: {
                name, 
                address,
                email,
                password
            }
        })
        .then((res)=> {
            if (res.data.errors){
                nameError.innerHTML = res.data.errors.name
                addressError.innerHTML = res.data.errors.address
                emailError.innerHTML = res.data.errors.email
                passwordError.innerHTML = res.data.errors.passwordError

            } else {
                setFormSubmit(true)
            }
        })
        .catch((err)=> window.alert(err))
    }
  }

  //Pour les prochains, il pourrait être bons de se servir de la balise dialog
  //pour en faire des modals
  //Je préfère les pages de log par vieille habitude perso, mais à méditer
  //Et ce système convient bien mieux à des components

  return (
    <div>
        <>
            { formSubmit ? (
                <>
                    <h4>Votre inscription s'est bien déroulée</h4>
                    <Connexion/>
                </>
            ):(
                
                <form action="" onSubmit={handleRegister}>
                    <label htmlFor="name">Votre nom</label>
                        <input type="text" name="name" id="name" value={name}
                        onChange={(e)=>setName(e.target.value)} />
                    <div className="name error"></div>

                    <label htmlFor="email">Votre email</label>
                        <input type="text" name="email" id="email" value={email}
                        onChange={(e)=>setEmail(e.target.value)} />
                    <div className="email error"></div>

                    <label htmlFor="address">Votre adresse</label>
                        <input type="text" name="address" id="address" value={address}
                        onChange={(e)=>setAddress(e.target.value)} />
                    <div className="address error"></div>

                    <label htmlFor="password">Votre mot de passe</label>
                        <input type="password" name="password" id="password" value={password}
                        onChange={(e)=>setPassword(e.target.value)} />
                    <div className="password error"></div>

                    <label htmlFor="password-control">Confirmez le mot de passe</label>
                        <input type="password" name="password" id="password" value={passwordControl}
                        onChange={(e)=>setPasswordControl(e.target.value)} />
                    <div className="password-control error"></div>

                    <input type="submit" value="inscription" />
                </form>    
            )}
        </>
    </div>
  )
}
