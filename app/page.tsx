'use client';
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import ReactPaginate from 'react-paginate';
import "@fortawesome/fontawesome-free/css/all.min.css";
import AnimateHeight from "react-animate-height";


class Item {
  id: number | null;
  userId: number | null;
  title: string;
  body: string;

  constructor(id: number | null, userId: number | null, title: string, body: string) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.body = body;
  }
}



export default function Home() {
  const dataFull = useRef<Item[]>([]);
  const [data, setData]  = useState<Item[]>([]);  
  const [dataDisplay, setDataDisplay] = useState<Item[]>([]);
  const [filter, setFilter] = useState<Item>(new Item(null, null, "", ""));
  const currentPageRef = useRef(0);
  const [showFilter, setShowFilter] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  // ------------------------------
  // Handlers
  // ------------------------------
  const onFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let dataFullLocal = JSON.parse(JSON.stringify(dataFull.current));
    console.log("Filtering data with filter:", filter);
    if( filter.id !== null && filter.id != 0 ) {
      dataFullLocal = dataFullLocal.filter((item: Item) => item.id === filter.id);
    }
    if( filter.userId !== null && filter.userId != 0 )
      dataFullLocal = dataFullLocal.filter((item: Item) => item.userId === filter.userId);
    if( filter.title.length > 0)
      dataFullLocal = dataFullLocal.filter((item: Item) => item.title.toLowerCase().includes(filter.title.toLowerCase()));
    if( filter.body.length > 0)
      dataFullLocal = dataFullLocal.filter((item: Item) => item.body.toLowerCase().includes(filter.body.toLowerCase()));


    setData(dataFullLocal);
    setDataDisplay(dataFullLocal.slice(0, pageSize));
    currentPageRef.current = 0; // Reset to first page

    // setFilter(new Item(null, null, "", ""));
  };

  const onReset = () => {
    setFilter(new Item(null, null, "", ""));
    setData(dataFull.current);
    setDataDisplay(dataFull.current.slice(0, pageSize));
    currentPageRef.current = 0; // Reset to first page
  }

  const onChangePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = Number(e.target.value);
    setPageSize(newSize);
    setDataDisplay(data.slice(0, newSize));
    currentPageRef.current = 0; // Reset to first page
  }


  // ------------------------------
  // Hooks
  // ------------------------------

  useEffect(() => {
    ( async () => {
      try{
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
        dataFull.current = JSON.parse(JSON.stringify(response.data));
        setData(dataFull.current);
        setDataDisplay(dataFull.current.slice(0, 10));
      }catch(err){
        console.error(err);
        alert("Error fetching data. Please check the console for details.");
      }
    })()
  }, []);

  return <div className="h-full flex flex-col">
          {!showFilter &&  
          <div className="text-right">
            <div className="inline-block text-gray-600 text-lg font-semibold mb-2 cursor-pointer" onClick={() => setShowFilter(!showFilter)}>
              <i className="fa-solid fa-filter"></i>
            </div>            
          </div>
          }
          <AnimateHeight duration={300} height={showFilter ? 'auto' : 0}>
            <div className="rounded-lg border border-gray-200 shadow-sm p-5 mb-4">
              
              <form onSubmit={onFilter}>
              <div className="flex justify-between">   
              <h1 className="text-xl font-bold mb-2">Filtering</h1>
                <div className="text-right">
                  <div className="inline-block text-gray-600 text-lg font-semibold mb-2 cursor-pointer" onClick={() => setShowFilter(!showFilter)}>
                    <i className="fa-solid fa-times"></i>
                  </div>            
                </div>
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
                  className="cursor-pointer bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors mr-2" onClick={onReset}>
                  Reset
                </button>
                <button type="submit"
                  className=" cursor-pointer inspiratia-bg-color text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                  Filter
                </button>
              </div>
              </form> 
            </div>
          </AnimateHeight>
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
          <div className="w-full flex mt-4">
            <div className="flex w-1/2 items-center justify-start gap-3">
              <label className="w-1/3" htmlFor="pageSize">Page Size:</label>
              <select id="pageSize" className="w-1/3 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                value={pageSize} onChange={onChangePageSize}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            <div className="ml-auto w-1/2 flex justify-end pr-3 items-center">
            <ReactPaginate
              className="inspiratia-pagination"
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={"..."}
              forcePage={currentPageRef.current}
              pageCount={Math.ceil(data.length / pageSize)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={(selectedItem) => {
                const start = selectedItem.selected * pageSize;
                const end = start + pageSize;
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
