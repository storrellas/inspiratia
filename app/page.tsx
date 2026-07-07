'use client';
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Item from "@/lib/models/Item";
import Filtering from "@/app/_components/Filtering";


type ModalProps = {
  show: boolean;
  onClose: () => void;
  item: Item;
};

const Modal = ({ item, show, onClose }: ModalProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">Detail</h2>
        <hr className="text-gray-300 mb-4"></hr>

        <p className="mb-6 text-gray-600 mt-3">
          <label htmlFor="title" className="block mb-2 font-medium text-gray-700 mt-3">
            Id:
          </label>
          <input type="text" value={item.id} readOnly
            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <label htmlFor="title" className="block mb-2 font-medium text-gray-700 mt-3">
            User Id:
          </label>
          <input type="text" value={item.userId} readOnly
            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"/>            
          <label htmlFor="title" className="block mb-2 font-medium text-gray-700 mt-3">
            Body:
          </label>
          <input type="text" value={item.body} readOnly
            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <label htmlFor="title" className="block mb-2 font-medium text-gray-700 mt-3">
            Title:
          </label>
          <input type="text" value={item.title}  readOnly
            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300 cursor-pointer">
            Cancel
          </button>

          <button onClick={onClose}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 cursor-pointer"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}


export default function Home() {
  const data = useRef<Item[]>([]);
  const dataFilteredRef = useRef<Item[]>([]);
  const [dataDisplay, setDataDisplay] = useState<{ data: Item[]; page: number, count: number }>({ data: [], page: 1, count: 0 });
  const [showFilter, setShowFilter] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [showModalDetails, setShowModalDetails] = useState(false);  
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

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
  };

  const onReset = () => {
    dataFilteredRef.current = data.current;
    setDataDisplay({ data: data.current.slice(0, pageSize), page: 1, count: data.current.length });
  }

  const onChangePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = Number(e.target.value);
    setPageSize(newSize);
    setDataDisplay({ ...dataDisplay, data: dataFilteredRef.current.slice(0, newSize), page: 1 });
  }

  const onShowModalDetails = (item: Item) => {
    setSelectedItem(item);
    setShowModalDetails(true);
  }

  // ------------------------------
  // Hooks
  // ------------------------------

  useEffect(() => {
    ( async () => {
      try{
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
        data.current = JSON.parse(JSON.stringify(response.data));
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
                <Filtering 
                  onFilter={onFilter} 
                  onReset={onReset} 
                  onHide={() => setShowFilter(false)} />
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
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => onShowModalDetails(item)}>
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
              <label htmlFor="pageSize">Page Size:</label>
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
              previousLabel={"<"}
              nextLabel={">"}
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
              }}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
        <Modal 
          show={showModalDetails} 
          onClose={() => setShowModalDetails(false)} 
          item={selectedItem} />
  </div>
}
