import { useRouter } from 'next/router';
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

export default function ClientPokemonDetails({params}:{params: {order: number}}) {
  const router = useRouter();
  const { order } = router.query;
  const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (order) {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${order}`);
        setPokemonData(res.data);
      }
    };
    fetchData();
  }, [order]);

  if (!pokemonData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Pokemon Details</h1>
      <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
      <p>Name: {pokemonData.name}</p>
      <p>Height: {pokemonData.height}</p>
      <p>Weight: {pokemonData.weight}</p>
      <p>Types: {pokemonData.types.map((type) => type.type.name).join(', ')}</p>
      <p>Order: {pokemonData.order}</p>
    </div>
  );
}
