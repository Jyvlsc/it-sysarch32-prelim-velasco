// Pokemon.jsx
import React from 'react';

function Pokemon({ pokemon, language }) {
  return (
    <div className="pokemon">
      <img className="pokemon-image" src={pokemon.image} alt={pokemon.name.english} />
      <div className="pokemon-id">{pokemon.id} {pokemon.name[language]}</div>
    </div>
  );
}

export default Pokemon;
