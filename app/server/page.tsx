import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import '../home.css';

interface Pokemon {
  name: string;
  url: string; // Fix type here
}

export default function ClientHome() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=50&offset=0');
        setPokemonList(res.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []); // Run effect only once on component mount

  return (
    <div>
      <h1>Client Home</h1>
      <ul className='card'>
        {pokemonList.map((pokemon, index) => (
          <li key={index}>
            <Link href={`/server/${index + 1}`}>
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
