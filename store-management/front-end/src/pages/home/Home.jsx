import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { isLogUser } from "../../function/isLogUser";
const Home = () =>{

    isLogUser();
    return(
        <>
        <h1>QUESTA E' LA HOME </h1>
        </>
    )
}

export default Home;