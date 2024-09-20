import Image from "next/image";
import React from "react";

type PokemonImageProps = {
  url: string;
};

const PokemonImage: React.FC<PokemonImageProps> = ({ url }) => {
  const id = url.split("/")[6];
  const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <Image
      src={imgSrc}
      alt={id}
      width={96}
      height={96}
      className="w-full h-auto"
    />
  );
};

export default PokemonImage;
