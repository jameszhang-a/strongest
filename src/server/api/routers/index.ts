import { z } from "zod";
// import the champions.json file
import champInfo from "../../data/champions_updated.json";
import { createTRPCRouter, publicProcedure } from "../trpc";

const getImageURL = (champName: string) => {
  return `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champName}_0.jpg`;
};

export const lolRouter = createTRPCRouter({
  getChampByID: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => {
      const champions = champInfo.data;

      // console.log(champions.length);

      // console.log(champions[input.id]);

      if (input.id < 0 || input.id >= champions.length) {
        throw new Error(`Champion ID:${input.id} is out of bounds`);
      }

      const champion = champions[input.id]!;

      return {
        name: champion.name,
        image: getImageURL(champion.id),
        id: parseInt(champion.key),
      };
    }),

  castVote: publicProcedure
    .input(
      z.object({
        votedFor: z.number(),
        votedAgainst: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const voted = await ctx.prisma.vote.create({
        data: {
          votedFor: input.votedFor,
          votedAgainst: input.votedAgainst,
        },
      });

      return { success: true, vote: voted };
    }),
});
