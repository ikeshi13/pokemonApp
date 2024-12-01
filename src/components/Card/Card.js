import React, { useEffect, useState } from "react";
import "./Card.css";

const Card = ({ pokemon }) => {
  const [pokemonName, setPokemonName] = useState([]);
  const [pokemonImage, setPokemonImage] = useState([]);
  const [pokemonType, setPokemonType] = useState([]);

  const loadPokemonDetails = async (data) => {
    // ポケモンの名前（日本語）を取得
    let responseName = await fetch(data.species.url);
    let result = await responseName.json();
    let jaName = result.names.find((name) => name.language.name === "ja").name;
    setPokemonName(jaName);

    // ポケモンのタイプ（日本語）を取得
    const responseType = await Promise.all(data.types.map((type) => fetch(type.type.url).then((res) => res.json())));
    const typeNames = responseType.map((type) => type.names.find((name) => name.language.name === "ja").name);
    const typeName = typeNames.join("/");
    setPokemonType(typeName);
  };

  useEffect(() => {
    loadPokemonDetails(pokemon);
    setPokemonImage(pokemon.sprites.other.home.front_default);
  }, []);

  return (
    <div className="card">
      <img src={pokemonImage} className="cardImg"></img>
      <h3 className="cardName">{pokemonName}</h3>
      <div className="cardTypes">
        <span className="typeName">タイプ：{pokemonType}</span>
      </div>
      <div className="cardInfo">
        <div className="cardData">
          <p className="title">重さ：{pokemon.weight}</p>
        </div>
        <div className="cardData">
          <p className="title">高さ：{pokemon.height}</p>
        </div>
        <div className="cardData">
          <p className="title">アビリティ：{pokemon.abilities[0].ability.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
