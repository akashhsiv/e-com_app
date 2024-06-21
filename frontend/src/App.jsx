import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Products } from "./components/Products";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { ProductsCreate } from "./components/ProductsCreate";


function App() {
  return <BrowserRouter>  
    <Routes>
        <Route path="/" element={<Products/>} />
        <Route path="/create" element={<ProductsCreate/>}/>

    </Routes>
    </BrowserRouter>
 }

export default App;
