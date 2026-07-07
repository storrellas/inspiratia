'use client'
import "@fortawesome/fontawesome-free/css/all.min.css";

import { useState } from "react";
import Item from "@/lib/models/Item";

const Filtering = ({ onFilter, onReset, onHide }: { onFilter: (filter: Item) => void, onReset: () => void, onHide: () => void }) => {
  const [filter, setFilter] = useState<Item>(new Item(null, null, "", ""));

  const onFilterLocal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFilter(filter);
  }

  const onResetLocal = () => {
    setFilter(new Item(null, null, "", ""));
    onReset();
  }

  return (
    <form onSubmit={onFilterLocal}>
      <div className="flex justify-between">   
        <h1 className="text-xl font-bold mb-2">Filtering</h1>
        <i className="fas fa-times text-lg mt-1 cursor-pointer" onClick={onHide}></i>
      </div>
      <div className="gap-3">
        <div className="flex gap-3 w-full">
          <div className="w-1/2">
            <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">
              ID:
            </label>
            <input type="number"  placeholder="Filter by ID..." value={filter.id !== null ? filter.id : ""}
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => {
                const filterText = e.target.value.toLowerCase();
                setFilter({ ...filter, id: Number(filterText) });
              }}
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">
              User ID:
            </label>
            <input type="number" placeholder="Filter by user ID..." value={filter.userId !== null ? filter.userId : ""}
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => {
                const filterText = e.target.value.toLowerCase();
                setFilter({ ...filter, userId: Number(filterText) });                  
              }}
            />
          </div>
        </div>

        <div className="flex gap-3 w-full mt-3">
          <div className="w-1/2">
            <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by title:
            </label>
            <input type="text"  placeholder="Filter by title..." value={filter.title}
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => {
                const filterText = e.target.value.toLowerCase();
                setFilter({ ...filter, title: filterText });
              }}
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by body:
            </label>
            <input type="text" placeholder="Filter by body..." value={filter.body}
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => {
                const filterText = e.target.value.toLowerCase();
                setFilter({ ...filter, body: filterText });                  
              }}
            />
          </div>
        </div>
      </div>
      <div className="text-right mt-3">
        <button type="button"
          className="cursor-pointer bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors mr-2" onClick={onResetLocal}>
          Reset
        </button>
        <button type="submit"
          className=" cursor-pointer inspiratia-bg-color text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          Filter
        </button>
      </div>
    </form> 
  );
}

export default Filtering;
