
'use client';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTitle } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const MENU_ITEMS = [
  { title: 'Posts', href: '#', icon: 'fa-solid fa-file' },
  { title: 'Articles', href: '#', icon: 'fa-solid fa-newspaper' },
  { title: 'Users', href: '#', icon: 'fa-solid fa-users' },
  { title: 'Settings', href: '#', icon: 'fa-solid fa-cog' },
]
const Sidebar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const onClick = (e) => {
    e.preventDefault();
    dispatch(setTitle(e.currentTarget.textContent));
    const href = e.currentTarget.getAttribute('href');
    router.push(href);

  }

  useEffect(() => {
    // Set the title in the Redux store when the component mounts
    dispatch(setTitle("Posts"));
  }, [dispatch]);

  return  <section className="w-1/8 text-white font-bold min-w-48 inspiratia-bg-color flex flex-col justify-between">          
            <div>
              <div className="p-3 pt-6">
                <Image src="/inspiratia_logo.svg" alt="Description" width={200} height={100} loading="eager" />
              </div>
              <div className="font-bold p-3 text-center flex flex-col p-8">
                {MENU_ITEMS.map((item, index) => (
                  <div key={index} className="mb-3 ">
                    <Link href={item.href} className="flex items-center gap-2 transition-colors text-lightgray hover:text-gray-400 " 
                      onClick={onClick}>
                      <i className={`${item.icon} w-4`}></i>
                      <span>{item.title}</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>            
            <div>
              <div className="p-3 text-center flex flex-col p-8">
                <div className="text-lightgray text-sm cursor-pointer text-lightgray hover:text-gray-400 ">
                  <i className="fa-solid fa-right-from-bracket"></i> Logout 
                </div>
              </div>
            </div>
          </section>
}

export default Sidebar;