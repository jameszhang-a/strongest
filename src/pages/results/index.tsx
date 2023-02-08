import { api } from "../../utils/api";

const champsConnection = api.champs;

export default function Page() {
  const results = champsConnection.getChampVotes.useQuery();

  return (
    <div>
      {!results.isLoading && results && results.data && (
        <div>
          {results.data.allVotes.map((champ) => (
            <div
              key={champ.id}
              className="min-w-24 flex flex-row justify-between"
            >
              <div>{champ.name}</div>
              <div>{champ.votes}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
