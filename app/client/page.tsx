"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import '../home.css'

interface Pokemon {
  name: string;
  url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png";
}

export default function ClientHome() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=50&offset=0');
      setPokemonList(res.data.results);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className='h1'>Client Home</h1>
      <ul className='card'>
        {pokemonList.map((pokemon, index) => (
           <li key={index}>
           <Link href={`/client/${index + 1}`}>
             <div className='pokemon'>
               <img className='image' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} alt={pokemon.name} />
               <p>{pokemon.name}</p>
               <button className='btn'>details</button>
             </div>
           </Link>
         </li>
        ))}
      </ul>
    </div>
  );
}
