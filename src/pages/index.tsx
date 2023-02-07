/* eslint-disable @next/next/no-img-element */
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Champion from "../components/Champion";

import { api } from "../utils/api";
import { getOptions } from "../utils/getChamps";

const Home: NextPage = () => {
  const [ids, setIds] = useState(() => getOptions());

  const [first, second] = ids;

  const firstChamp = api.champs.getChampByID.useQuery({ id: first });
  const secondChamp = api.champs.getChampByID.useQuery({ id: second });

  const voteMutation = api.champs.castVote.useMutation();

  const voteForStronger = (votedFor: string) => {
    if (!firstChamp.data?.id || !secondChamp.data?.id) return;

    if (votedFor === "first") {
      // console.log(
      //   `voting for ${String(
      //     firstChamp.data?.name
      //   )}, with a id of ${first}, actual id is ${firstChamp.data?.id}`
      // );

      voteMutation.mutate({
        votedFor: firstChamp.data?.id,
        votedAgainst: secondChamp.data?.id,
      });
    } else if (votedFor === "second") {
      // console.log(
      //   `voting for ${String(
      //     secondChamp.data?.name
      //   )}, with a id of ${second}, actual id is ${secondChamp.data?.id}`
      // );

      voteMutation.mutate({
        votedFor: secondChamp.data?.id,
        votedAgainst: firstChamp.data?.id,
      });
    }

    setIds(getOptions());
  };

  return (
    <>
      <Head>
        <title>Strongest Champ</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
        />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center px-4 py-16 ">
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
      </main>
      <div className="flex items-center justify-center bg-[#15162c]">
        Made by JZ
        <a
          href="https://github.com/jameszhang-a/strongest"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa-brands fa-github-alt fa-xl relative pl-2"></i>
        </a>
      </div>
    </>
  );
};

export default Home;
