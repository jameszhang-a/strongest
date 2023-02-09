/* eslint-disable @next/next/no-img-element */
import { type NextPage } from "next";
import { useState } from "react";
import Champion from "../components/Champion";

import { api } from "../utils/api";
import { getOptions } from "../utils/getChamps";

const champsConnection = api.champs;

const Home: NextPage = () => {
  const [[first, second], setIds] = useState(() => getOptions());

  const firstChamp = champsConnection.getChampByID.useQuery({ id: first });
  const secondChamp = champsConnection.getChampByID.useQuery({ id: second });

  const voteMutation = champsConnection.castVote.useMutation();

  const voteForStronger = (votedFor: string) => {
    if (!firstChamp.data?.id || !secondChamp.data?.id) return;

    if (votedFor === "first") {
      voteMutation.mutate({
        votedFor: firstChamp.data?.id,
        votedAgainst: secondChamp.data?.id,
      });
    } else if (votedFor === "second") {
      voteMutation.mutate({
        votedFor: secondChamp.data?.id,
        votedAgainst: firstChamp.data?.id,
      });
    }

    setIds(getOptions());
  };

  return (
    <>
      <h1 className="mt-[-10rem] pb-4 text-center text-4xl font-extrabold tracking-tight text-white">
        Strongest <span className="text-[hsl(280,100%,70%)]">Champ</span>
      </h1>

      <h2 className="text-l pb-2 text-center text-white">
        Who will win a 1 v 1 with full build?
      </h2>

      <div className="flex items-center justify-end">
        <Champion
          champion={firstChamp.data}
          vote={() => voteForStronger("first")}
        />

        <div className="divider divider-horizontal">vs.</div>

        <Champion
          champion={secondChamp.data}
          vote={() => voteForStronger("second")}
        />
      </div>
    </>
  );
};

export default Home;
