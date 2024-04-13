import './App.css'
import React, { useState,useEffect } from 'react'
// import jwt_decode from "jwt-decode";
import { jwtDecode } from "jwt-decode";
import { Link } from 'react-router-dom';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function App() {
  const token = localStorage.getItem("token")
  const decoded = jwtDecode(token);
  // const [profile , setProfile]=useState()
  console.log(decoded)
  console.log(decoded.email)
  const navigate = useNavigate()

  const [ user, setUser ] = useState([]);
console.log(user)
    const [ profile, setProfile ] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) =>
        setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });
    useEffect(
        () => {
            if (user) {
                
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then(async(res) => {
                        console.log(res.data)
                        const user = {
                            name:res.data.name,
                            email:res.data.email,
                            picture:res.data.picture
                        }
                        const resa =await axios.post("http://localhost:5000/google-auth",user) 
                        // setProfile(res.data);
                        console.log(resa)
                        if (resa.data) {
                            console.log(resa.data.token)
                            localStorage.setItem("token",resa.data.token)
                            navigate('/')
                        }
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile({});
    };
  return (
    <>  
    <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            {Object.keys(profile).length ? (
                <div>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={login}>Sign in with Google 🚀 </button>
            )}
        </div>
    {/* <Link to={'/login'}>Login</Link> */}

    <div>{
        decoded &&
        <>
        Emal : {decoded.email}
        Name : {decoded.name}
        { decoded.picture && 
          <img src={decoded.picture} alt="feck" />
        }
        </>
        }
        
        </div>
    </>
  )
}

export default App
