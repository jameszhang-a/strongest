/* eslint-disable @next/next/no-img-element */
import { type NextPage } from "next";
import Head from "next/head";
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
      <div className="container flex flex-col items-center justify-center px-4 py-16">
        <h1 className="mt-[-10rem] pb-4 text-5xl font-extrabold tracking-tight text-white">
          Strongest <span className="text-[hsl(280,100%,70%)]">Champ</span>
        </h1>

        <h2 className="text-2xl text-white">
          Which champ will win a 1 v 1 fight with full build?
        </h2>

        <div className="flex items-center justify-end border border-rose-200 p-8">
          {firstChamp.data &&
            secondChamp.data &&
            !firstChamp.isLoading &&
            !secondChamp.isLoading && (
              <>
                <Champion
                  champion={firstChamp.data}
                  vote={() => voteForStronger("first")}
                />

                <div className="p-8 text-xl text-white">vs.</div>
                <Champion
                  champion={secondChamp.data}
                  vote={() => voteForStronger("second")}
                />
              </>
            )}
        </div>
      </div>
    </>
  );
};

export default Home;
