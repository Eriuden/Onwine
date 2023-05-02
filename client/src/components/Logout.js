import React from 'react'
import axios from 'axios'
import cookie from "js-cookie"

export const Logout = () => {
    const removeCookie = (key) => {
        if (window !== "undefined") {
            cookie.remove(key, { expires: 1})
        }
    }

    const logout = async () => {
        await axios({
            method:"get",
            url: `${process.env.REACT_APP_API_URL}api/user/logout`,
            withCredentials: true,
        })
        .then(() => removeCookie("jwt"))
        .catch((err) => window.alert(err))

        window.location="/"
    }

  return (
    <div><li onClick={logout}>
            <h3>Se déconnecter</h3>
        </li>
    </div>
  )
}
