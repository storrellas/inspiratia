'use client';
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import ReactPaginate from 'react-paginate';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Item from "@/app/_components/models/Item";



export default function Home() {
  const data = useRef<Item[]>([]);
  const dataFilteredRef = useRef<Item[]>([]);
  const [dataDisplay, setDataDisplay] = useState<{ data: Item[]; page: number, count: number }>({ data: [], page: 1, count: 0 });
  // const [filter, setFilter] = useState<Item>(new Item(null, null, "", ""));
  const currentPageRef = useRef(0);
  const [showFilter, setShowFilter] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  // ------------------------------
  // Handlers
  // ------------------------------
  const onFilter = (filter: Item) => {
    let dataFullLocal = JSON.parse(JSON.stringify(data.current));
    // console.log("Filtering data with filter:", filter);
    if( filter.id !== null && filter.id != 0 )
      dataFullLocal = dataFullLocal.filter((item: Item) => item.id === filter.id);    
    if( filter.userId !== null && filter.userId != 0 )
      dataFullLocal = dataFullLocal.filter((item: Item) => item.userId === filter.userId);
    if( filter.title.length > 0)
      dataFullLocal = dataFullLocal.filter((item: Item) => item.title.toLowerCase().includes(filter.title.toLowerCase()));
    if( filter.body.length > 0)
      dataFullLocal = dataFullLocal.filter((item: Item) => item.body.toLowerCase().includes(filter.body.toLowerCase()));


    // setDataFiltered(dataFullLocal);
    dataFilteredRef.current = dataFullLocal;
    setDataDisplay({ data: dataFullLocal.slice(0, pageSize), page: 1, count: dataFullLocal.length });
    currentPageRef.current = 0; // Reset to first page
  };

  const onReset = () => {
    dataFilteredRef.current = data.current;
    setDataDisplay({ data: data.current.slice(0, pageSize), page: 1, count: data.current.length });
    currentPageRef.current = 0; // Reset to first page
  }

  const onChangePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = Number(e.target.value);
    setPageSize(newSize);
    setDataDisplay({ ...dataDisplay, data: dataFilteredRef.current.slice(0, newSize), page: 1 });
    currentPageRef.current = 0; // Reset to first page
  }


  // ------------------------------
  // Hooks
  // ------------------------------

  useEffect(() => {
    ( async () => {
      try{
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
        data.current = JSON.parse(JSON.stringify(response.data));
        // setDataFiltered(data.current);
        dataFilteredRef.current = data.current;
        setDataDisplay({ data: data.current.slice(0, 10), page: 1, count: data.current.length });
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
          <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${showFilter ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
            <div className="overflow-hidden">
              <div className="rounded-lg border border-gray-200 shadow-sm p-5 mb-4 overflow-hidden">              
                <Filtering onFilter={onFilter} onReset={onReset} />
              </div>
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
                {dataDisplay.data.map((item) => (
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
              forcePage={dataDisplay.page - 1}
              pageCount={Math.ceil(dataDisplay.count / pageSize)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={(selectedItem) => {
                const start = selectedItem.selected * pageSize;
                const end = start + pageSize;
                setDataDisplay({ 
                  data: dataFilteredRef.current.slice(start, end), 
                  page: selectedItem.selected + 1, 
                  count: dataFilteredRef.current.length });
                currentPageRef.current = selectedItem.selected;
              }}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
  </div>
}
