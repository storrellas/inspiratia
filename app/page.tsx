'use client';
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import ReactPaginate from 'react-paginate';



// https://jsonplaceholder.typicode.com/posts
class Item {
  id: number;
  userId: number;
  title: string;
  body: string;

  constructor(id: number, userId: number, title: string, body: string) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.body = body;
  }
}



export default function Home() {
  const [data, setData]  = useState<Item[]>([]);
  const [dataDisplay, setDataDisplay] = useState<Item[]>([]);
  const [filter, setFilter] = useState<Item>(new Item(0, 0, "", ""));
  const currentPageRef = useRef(0);

  // ------------------------------
  // Handlers
  // ------------------------------
  const onFilter = () => {
    const filteredData = data.filter(item =>
      item.title.toLowerCase().includes(filter.title.toLowerCase()) &&
      item.body.toLowerCase().includes(filter.body.toLowerCase()) &&
      (filter.id === 0 || item.id === filter.id) &&
      (filter.userId === 0 || item.userId === filter.userId)
    );
    setDataDisplay(filteredData.slice(0, 10));
    currentPageRef.current = 0; // Reset to first page
  };

  // ------------------------------
  // Hooks
  // ------------------------------

  useEffect(() => {
    ( async () => {
      try{
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
        setData(response.data);
        setDataDisplay(response.data.splice(0, 10));
      }catch(err){
        console.error(err);
        alert("Error fetching data. Please check the console for details.");
      }
    })()
  }, []);

  return <div className="h-full flex flex-col">
          <div className="rounded-lg border border-gray-200 shadow-sm p-5 mb-4">
            {/* <h1 className="text-xl font-bold mb-2">Filtering</h1> */}
            <div className="gap-3">
              
              <div className="flex gap-3 w-full">
                <div className="w-1/2">
                  <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">
                    ID:
                  </label>
                  <input type="number"  placeholder="Filter by ID..."
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
                  <input type="number" placeholder="Filter by user ID..."
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
                  <input type="text"  placeholder="Filter by title..."
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
                  <input type="text" placeholder="Filter by body..."
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
              <button
                className=" cursor-pointer inspiratia-bg-color text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                onClick={onFilter}
              >
                Filter
              </button>
            </div>
          </div>
          <div className="overflow-auto rounded-lg border border-gray-200 shadow-sm flex-1">
            <table className="min-w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Id
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    User Id
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Body
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {dataDisplay.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {item.userId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      <div className="truncate max-w-[200px]" title={item.title}>{item.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      
                      <div className="truncate max-w-[400px]" title={item.body}>{item.body}</div>
                    </td>
                  </tr>
                ))}
  
              </tbody>
            </table>
          </div>
          <div className="w-full">
            <div className="ml-auto mt-4 w-1/2 flex justify-end pr-3">
            <ReactPaginate
              className="inspiratia-pagination"
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={"..."}
              forcePage={currentPageRef.current}
              pageCount={Math.ceil(data.length / 10)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={(selectedItem) => {
                const start = selectedItem.selected * 10;
                const end = start + 10;
                setDataDisplay(data.slice(start, end));
                currentPageRef.current = selectedItem.selected;
              }}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
  </div>
}
