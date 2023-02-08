/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
import type { RouterOutputs } from "../utils/api";
import { blurDataURL } from "../utils/placeholder-img";

type ChampionProp = RouterOutputs["champs"]["getChampByID"];

const Champion: React.FC<{
  champion?: ChampionProp;
  vote: () => void;
}> = ({ champion, vote }) => {
  // showing a placeholder while loading
  if (!champion)
    return (
      <div className="w-62 flex aspect-[5/9] h-80 flex-col items-center">
        <Image
          src={blurDataURL}
          alt="placeholder"
          width="178"
          height="323"
        ></Image>
        <button className="mx20 w-22 btn-warning btn-sm btn mt-4 capitalize">
          loading...
        </button>
      </div>
    );

  const { name, image } = champion;

  return (
    <div className="w-62 flex aspect-[5/9] h-80 flex-col items-center">
      <Image src={image} alt={name} width="178" height="323"></Image>
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
