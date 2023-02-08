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

      if (input.id < 0 || input.id >= champions.length) {
        throw new Error(`Champion ID:${input.id} is out of bounds`);
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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

  // return a list of all champions and how many votes they each have, as well as the total number of votes, and an image url
  getChampVotes: publicProcedure.query(async ({ ctx }) => {
    const champions = champInfo.data;
    const votes = await ctx.prisma.vote.findMany();

    const champVotes = champions.map((champ) => {
      const champId = parseInt(champ.key);
      const champVotes = votes.filter(
        (vote) => vote.votedFor === champId || vote.votedAgainst === champId
      );

      return {
        name: champ.name,
        image: getImageURL(champ.id),
        id: champId,
        votes: champVotes.length,
      };
    });

    return {
      allVotes: champVotes,
    };
  }),
});
