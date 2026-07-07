'use client';

import { useState, useEffect } from "react";

type User = {
  name: string;
  email: string;
};

type UserForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string ;
};

type ModalUserProps = {
  show: boolean;
  onClose: () => void;
  user: User | null;
};

const ModalUser = ({ user, show, onClose }: ModalUserProps) => {
  
  const [userData, setUserData] = useState<UserForm>({
    name: user ? user.name : "",
    email: user ? user.email : "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {

    if ( user == null ) return
    ( () => {
      setUserData({
        name: user.name,
        email: user.email,
        password: "",
        confirmPassword: "",
      });
    })()    
  }, [user]);

  if (!show || !user) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">User</h2>
        <hr className="text-gray-300 mb-4"></hr>

        <p className="mb-6 text-gray-600 mt-3">
          <label htmlFor="title" className="block mb-2 font-medium text-gray-700 mt-3">
            Name:
          </label>
          <input type="text" value={userData.name} 
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <label htmlFor="title" className="block mb-2 font-medium text-gray-700 mt-3">
            Email:
          </label>
          <input type="email" value={userData.email} 
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"/>            
          <label htmlFor="title" className="block mb-2 font-medium text-gray-700 mt-3">
            Password:
          </label>
          <input type="password" value={userData.password} 
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <label htmlFor="title" className="block mb-2 font-medium text-gray-700 mt-3">
            Confirm Password:
          </label>
          <input type="password" value={userData.confirmPassword} 
            onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
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

export default ModalUser;