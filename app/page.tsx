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
  const currentPageRef = useRef(0);
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
