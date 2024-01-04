import React from "react";
import ThemeSwitcher from "../ThemeSwitcher";

const Header = () => {
  return (
    <header className='fixed top-0 left-0 right-0 flex items-center justify-center bg-white dark:bg-shark-900 h-10 '>
      <div className='flex justify-between w-full px-4'>
        <h1 className='text-xl font-bold text-shark-700 dark:text-shark-300'>
          TP Toolkit
        </h1>
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;
