import { z } from "zod";
// import the champions.json file
import champInfo from "../../data/champions_updated.json";
import { createTRPCRouter, publicProcedure } from "../trpc";

const getImageURL = (champName: string, mode: "thumb" | "splash") => {
  return mode === "splash"
    ? `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champName}_0.jpg`
    : `http://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${champName}.png`;
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
        image: getImageURL(champion.id, "splash"),
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

    // version one
    const votes = await ctx.prisma.vote.findMany();
    const champVotes = champions.map((champ) => {
      const champId = parseInt(champ.key);
      let votedFor = 0;
      let votedAgainst = 0;

      votes.forEach((vote) => {
        if (vote.votedFor === champId) {
          votedFor++;
        } else if (vote.votedAgainst === champId) {
          votedAgainst++;
        }
      });

      // win percentage, if either votedFor or votedAgainst is 0, then the win percentage is 0
      const winPercentage =
        votedFor + votedAgainst === 0
          ? 0
          : votedFor / (votedFor + votedAgainst);

      return {
        name: champ.name,
        image: getImageURL(champ.id, "thumb"),
        id: champId,
        votedFor,
        votedAgainst,
        winPercentage,
      };
    });

    return {
      allVotes: champVotes,
    };
  }),
});
