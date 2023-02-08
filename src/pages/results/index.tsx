import Table from "../../components/Table";
import { api } from "../../utils/api";

const champsConnection = api.champs;

export default function Page() {
  const results = champsConnection.getChampVotes.useQuery();

  return (
    <div className="min-h-max">
      {!results || !results.data || results.isLoading ? (
        <div>Loading...</div>
      ) : (
        <Table allVotes={results.data.allVotes} />
      )}
    </div>
  );
}
