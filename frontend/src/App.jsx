import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Products } from "./components/Products";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { ProductsCreate } from "./components/ProductsCreate";
import { Orders } from "./components/Orders";
import { Inventory } from "./components/Inventory";


function App() {
  return <BrowserRouter>  
    <Routes>
        <Route path="/" element={<Products/>} />
        <Route path="/create" element={<ProductsCreate/>}/>
        <Route path="/orders/:id" element={<Orders/>}/>
        <Route path="/inventory" element={<Inventory/>}/>
    </Routes>
    </BrowserRouter>
 }

export default App;
