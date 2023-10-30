import React from "react";
import ThemeSwitcher from "../ThemeSwitcher";

const Header = () => {
  return (
    <header className='flex items-center justify-center bg-white dark:bg-gray-900 h-12 mb-12'>
      <div className='flex  justify-between w-full max-w-7xl py-4 px-8'>
        <h1 className='text-xl font-bold text-gray-700 dark:text-gray-300'>
          TP Tools
        </h1>
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;
