/* eslint-disable @next/next/no-img-element */
import React from "react";
import type { RouterOutputs } from "../utils/api";

type ChampionProp = RouterOutputs["champs"]["getChampByID"];

const Champion: React.FC<{
  champion: ChampionProp;
  vote: () => void;
}> = ({ champion, vote }) => {
  const { name, image } = champion;

  return (
    <div className="flex aspect-[5/9] h-80 flex-col items-center">
      <img src={image} alt={name} className="aspect-auto h-full"></img>
      <button
        className="mx20 w-22 btn-warning btn-sm btn mt-4 capitalize"
        onClick={() => vote()}
      >
        {name}
      </button>
    </div>
  );
};

export default Champion;
