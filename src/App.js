import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon.js";
import Card from "./components/Card/Card.js";
import Navber from "./components/Navber/Navber.js";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setnextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");

  useEffect(() => {
    const feachPokemonData = async () => {
      // 全てのポケモンのデータを取得
      let res = await getAllPokemon(initialURL);
      await loadPokemon(res.results);
      setnextURL(res.next);
      setPrevURL(res.previous);
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

  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    await loadPokemon(data.results);
    setnextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
    // 画面の一番上にスクロール
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handlePrevPage = async () => {
    if (!prevURL) return;
    setLoading(true);
    let data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setnextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
    // 画面の一番上にスクロール
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
            <div className="btn">
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
