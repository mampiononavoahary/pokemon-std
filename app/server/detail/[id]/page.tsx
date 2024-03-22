"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Pokemon {
  sprites: { front_default: string };
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  order: number;
}

export default function ClientPokemonDetails({ params }: { params: { id: number } }) {
  const { id } = params;
  const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemonData(res.data);
      }
    };
    fetchData();
  }, [id]);

  if (!pokemonData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container'>
      <h1 className='h1'>Pokemon Details</h1>
      <div>
      <div className='details'>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} alt={pokemonData.name} />
          <p>Name: {pokemonData.name}</p>
          <p>Height: {pokemonData.height}</p>
          <p>Weight: {pokemonData.weight}</p>
          <p>Types: {pokemonData.types.map((type) => type.type.name).join(', ')}</p>
          <p>Order: {pokemonData.order}</p>
      </div>
      </div>
    </div>
  );
}
