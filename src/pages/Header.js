import { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { BiSearchAlt } from "react-icons/bi";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-stone-900 border-b border-stone-800 z-10">
      <div className="max-w-screen-2xl mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-6">
          <img src="./assets/logo-white.svg" alt="Logo Dasky" className="w-28" href="./localhost:3000/" />
          
        
        </div>
        
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-stone-800 text-white hover:bg-stone-700">
            <IoMdNotificationsOutline className="text-xl" />
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-white font-medium hidden md:block">Victor Linhares</span>
            <div className="w-10 h-10 rounded-full bg-[#D6F2B3] flex items-center justify-center">
              <CgProfile className="text-xl text-[#5B8C00]" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}