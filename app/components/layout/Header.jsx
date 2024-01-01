import React from "react";
import ThemeSwitcher from "../ThemeSwitcher";

const Header = () => {
  return (
    <header className='fixed top-0 left-0 right-0 flex items-center justify-center bg-white dark:bg-shark-800 h-12 mb-12'>
      <div className='flex justify-between w-full max-w-7xl py-4 px-8'>
        <h1 className='text-xl font-bold text-shark-700 dark:text-shark-300'>
          TP Toolkit
        </h1>
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;
