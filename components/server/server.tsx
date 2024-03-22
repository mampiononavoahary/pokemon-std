import React from 'react';
import Link from 'next/link';
import '../../app/home.css'

interface Props {
    pokemonData: {
        name: string;
        url: string;
    }[];
}

export default function SimpleSSRComponent(props: Props) {
    const { pokemonData } = props;

    return (
        <div>
      <h1 className='h1'>Server Home</h1>
      <ul className='card'>
        {pokemonData.map((pokemon, index) => (
           <li key={index}>
           <Link href={`/client/detail/${index + 1}`}>
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

export async function getServerSideProps() {
    try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon");
        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }
        const jsonData = await res.json();
        const pokemonData = jsonData.results;
        return {
            props: {
                pokemonData
            }
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                pokemonData: []
            }
        };
    }
}

function getIdFromUrl(url: string) {
    return url.split("/").slice(-2, -1)[0];
}