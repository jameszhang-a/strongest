import { z } from "zod";
import type { Root } from "../../../types/lol.types";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const exampleRouter = createTRPCRouter({
  getChampByID: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const res = await fetch(
        "https://ddragon.leagueoflegends.com/cdn/12.23.1/data/en_US/champion.json"
      );

      const champions = (await res.json()) as Root;

      console.log(champions);
      const champNames = Object.keys(champions.data);

      return {
        champs: champNames,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});
