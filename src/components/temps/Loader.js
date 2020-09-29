import React from 'react';
import "./profile.css";
export function Loader(){
    return (
        <div class="lds-roller">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
    )
}
export function LoginLoader({width,height}){
    return (
        <div class="lds-rollerLogin">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
    )
}

export default Loader;