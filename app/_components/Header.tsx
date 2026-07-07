'use client';
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";

const Header = () => {
  const title = useSelector((state: any) => state.menu.title);
  return  <nav className="w-full bg-gray-300 p-3 text-gray-800 flex justify-between cursor-pointer">
                <div className="flex items-center gap-2 font-bold ml-4">
                  {title.toUpperCase()}
                </div>
                <div>
                  Hello, <span className="font-bold">User</span>
                  <Image src="/user.svg" alt="Description" width={30} height={30} className="inline-block ml-2" />
                </div>
              </nav>
}

export default Header;