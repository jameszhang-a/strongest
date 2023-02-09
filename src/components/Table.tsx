import type { RouterOutputs } from "../utils/api";
import Image from "next/image";
import { useState } from "react";

type TableProps = RouterOutputs["champs"]["getChampVotes"]["allVotes"];

type RowData = {
  name: string;
  image: string;
  id: number;
  votedFor: number;
  votedAgainst: number;
  winPercentage: number;
};

type TableHeader = "votedFor" | "votedAgainst" | "winPercentage" | "name";

const formatPercentage = (num: number) => {
  return num % 1 === 0 ? `${num * 100}%` : `${(num * 100).toFixed(2)}%`;
};

const sortData = (
  data: RowData[],
  payload: { sortBy: TableHeader | null; reversed: boolean; search: string }
) => {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  // Sort differently depending on the column
  let sorted = [...data];

  switch (sortBy) {
    case "name":
      sorted = sorted.sort((a, b) =>
        !payload.reversed
          ? b["name"].localeCompare(a["name"])
          : a["name"].localeCompare(b["name"])
      );
      break;

    default:
      sorted = sorted.sort((a, b) =>
        payload.reversed ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy]
      );
      break;
  }

  // filter the final sorted table
  return filterData(sorted, payload.search);
};

const filterData = (data: RowData[], search: string) => {
  const query = search.toLowerCase().trim();
  // return final data with champs that the user searched for
  return data.filter((item) => item["name"].toLowerCase().includes(query));
};

const Table: React.FC<{ allVotes: TableProps }> = ({ allVotes }) => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<TableHeader | null>("winPercentage");
  const [sortedData, setSortedData] = useState<RowData[]>(
    sortData(allVotes, { sortBy: "winPercentage", reversed: false, search: "" })
  );
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(allVotes, {
        sortBy,
        reversed: reverseSortDirection,
        search: value,
      })
    );
  };

  const setSorting = (field: TableHeader) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(allVotes, { sortBy: field, reversed, search }));
  };

  return (
    <>
      <input
        placeholder="search for champ"
        type="text"
        onChange={handleSearchChange}
        className="mb-4 w-full rounded-md border border-[#3a3f53] p-2"
      />
      <table className="w-[90vw] border-collapse overflow-hidden border border-slate-700 bg-zinc-800 lg:w-[800px]">
        <thead>
          <tr>
            <CustomHeader
              onClick={() => setSorting("name")}
              label="Champion"
              header="name"
              sortBy={sortBy}
              reverseSortDirection={reverseSortDirection}
            />
            <CustomHeader
              onClick={() => setSorting("votedFor")}
              label="Win"
              header="votedFor"
              sortBy={sortBy}
              reverseSortDirection={reverseSortDirection}
            />
            <CustomHeader
              onClick={() => setSorting("votedAgainst")}
              label="Loss"
              header="votedAgainst"
              sortBy={sortBy}
              reverseSortDirection={reverseSortDirection}
            />
            <CustomHeader
              onClick={() => setSorting("winPercentage")}
              label="Win Rate"
              header="winPercentage"
              sortBy={sortBy}
              reverseSortDirection={reverseSortDirection}
            />
            {/* <th>Name</th>
            <th>W</th>
            <th>L</th>
            <th>Ratio</th> */}
          </tr>
        </thead>

        <tbody>
          {sortedData.map((champ) => (
            <tr key={champ.id}>
              <Cell
                className="cursor-pointer p-2"
                onClick={() => console.log(champ.name)}
              >
                <Image
                  src={champ.image}
                  alt={champ.name}
                  width={30}
                  height={30}
                  className="mask mask-squircle mr-4 rounded-md"
                />
                {champ.name}
              </Cell>
              <Cell center>{champ.votedFor}</Cell>
              <Cell center>{champ.votedAgainst}</Cell>
              <Cell className="justify-between">
                <progress
                  className="progress progress-primary w-20 pr-1 max-[400px]:hidden sm:w-32"
                  value={
                    champ.winPercentage === 0 ? 5 : champ.winPercentage * 100
                  }
                  max="100"
                ></progress>
                {formatPercentage(champ.winPercentage)}
              </Cell>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;

type CustomHeaderProps = {
  onClick: () => void;
  label: string;
  header: TableHeader;
  sortBy: TableHeader | null;
  reverseSortDirection: boolean;
};

const CustomHeader = (props: CustomHeaderProps) => {
  const { onClick, label, header, sortBy, reverseSortDirection } = props;

  let degree = 0;
  if (sortBy === header) {
    degree = reverseSortDirection ? -90 : 90;
  }

  return (
    <th className="border-r border-l border-gray-700 p-2">
      {label}
      <span className="ml-3" />
      <i
        onClick={onClick}
        className={`fa-solid fa-chevron-right cursor-pointer p-3 transition-transform max-[400px]:hidden`}
        style={{ transform: `rotate(${degree}deg)` }}
      />
    </th>
  );
};

const Cell = ({
  children,
  className,
  onClick,
  center = false,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  center?: boolean;
}) => {
  return (
    <td className="border border-slate-700" onClick={onClick}>
      <div
        className={`flex flex-row items-center ${
          center ? "justify-center" : ""
        } ${className ? className : ""}`}
      >
        {children}
      </div>
    </td>
  );
};
