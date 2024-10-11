import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon.js";
import Card from "./components/Card/Card.js";
import Navber from "./components/Navber/Navber.js";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const feachPokemonData = async () => {
      // 全てのポケモンのデータを取得
      let res = await getAllPokemon(initialURL);
      loadPokemon(res.results);
      setLoading(false);
    };
    feachPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    // Promise.all内には配列を渡さないといけない（data）
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  console.log(pokemonData);
  return (
    <>
      <Navber />
      <div className="App">
        {loading ? (
          <h1>ロード中だよ.....</h1>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
