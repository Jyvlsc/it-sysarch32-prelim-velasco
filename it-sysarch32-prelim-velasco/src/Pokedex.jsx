// Pokedex.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pokemon from './Pokemon';

function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [language, setLanguage] = useState('english');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://us-central1-it-sysarch32.cloudfunctions.net/pagination?page=${currentPage}`
        );
        setPokemonList(response.data.data);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();
  }, [currentPage]);

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="language-buttons">
        <button onClick={() => handleLanguageChange('english')}>English</button>
        <button onClick={() => handleLanguageChange('japanese')}>Japanese</button>
        <button onClick={() => handleLanguageChange('chinese')}>Chinese</button>
        <button onClick={() => handleLanguageChange('french')}>French</button>
      </div>
      <div>
            <button
              onClick={() => handlePagination(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Back
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePagination(page)}
                disabled={page === currentPage}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePagination(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
          <div className="loading">
          {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="pokemon-list">
          {pokemonList.map((pokemon) => (
            <Pokemon key={pokemon.id} pokemon={pokemon} language={language} />
          ))}
          
          <p>Current Page: {currentPage}</p>
          <p>Total Pages: {totalPages}</p>
        </div>
      )}
          </div>
      
    </div>
  );
}

export default Pokedex;
