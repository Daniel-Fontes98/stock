import { type Table } from "@tanstack/react-table";

type Props = {
  table: Table<any>;
};

const Pagination = ({ table }: Props) => {
  const state = table.getState().pagination;
  const goLastPage = () => table.setPageIndex(table.getPageCount() - 1);
  return (
    <div className="my-2">
      <div className="flex items-center gap-2">
        <div className="btn-sm btn-group">
          <button
            className="btn-sm btn"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="btn-sm btn"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            className="btn-sm btn"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className="btn-sm btn"
            onClick={goLastPage}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
        </div>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {state.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            defaultValue={state.pageIndex + 1}
            type="number"
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="input-bordered input input-sm mx-2 w-20"
          />
        </span>
        <select
          value={state.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          className="select-bordered select select-sm"
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;
