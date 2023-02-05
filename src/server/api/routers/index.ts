import { z } from "zod";
import type { Root } from "../../../types/lol.types";

import { createTRPCRouter, publicProcedure } from "../trpc";

const imageURL =
  "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Zoe_0.jpg";

const getImageURL = (champName: string) => {
  return `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champName}_0.jpg`;
};

export const lolRouter = createTRPCRouter({
  getChampByID: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const res = await fetch(
        "https://ddragon.leagueoflegends.com/cdn/12.23.1/data/en_US/champion.json"
      );

      const champions = (await res.json()) as Root;

      const champNames = Object.keys(
        champions.data
      ) as (keyof typeof champions.data)[];

      if (input.id < 0 || input.id >= champNames.length) {
        throw new Error("Champion ID is out of bounds");
      }

      const champName = champNames[input.id]!;

      const image = getImageURL(champName);
      const name = champions.data[champName].name;

      return {
        name,
        image,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});
