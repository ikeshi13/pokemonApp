import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon.js";

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
    <div className="App">
      {loading ? (
        <h1>ロード中だよ.....</h1>
      ) : (
        <>
          <h1>ポケモンデータを取得しました！</h1>
        </>
      )}
    </div>
  );
}

export default App;
