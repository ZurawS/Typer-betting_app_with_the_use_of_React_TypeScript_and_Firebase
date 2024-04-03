import React from "react";
import { useTable } from "react-table";
import { Match } from "../../../types/Match.model";

const MyTable = ({ data = [] }: any) => {
  const columns = React.useMemo(() => {
    const uniqueHostsArray: string[] = [];

    data.map((game: Match, index: number, array: Match[]) => {
      if (!uniqueHostsArray.includes(game.host)) {
        uniqueHostsArray.push(game.host);
      }
    });

    return uniqueHostsArray.map((value) => ({
      Header: value,
      accessor: value,
    }));
  }, [data]);

  const flatData = React.useMemo(() => {
    const flatGameData = data.map((game: any) => {
      const flatGameRow: any = {
        id: game.host,
        [game.id]: {
          hostGuest: `${game.host} vs ${game.guest}\n${game.score90} - ${game.finalScore}`,
        },
      };

      game.matchBets.forEach((bet: any) => {
        flatGameRow[game.id][bet.id] = bet.host + " - " + bet.guest;
      });

      return flatGameRow;
    });

    return flatGameData;
  }, [data]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: flatData,
  });

  return (
    <table {...getTableProps()} style={{ width: "100%" }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MyTable;
