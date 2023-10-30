import React from "react";
import ThemeSwitcher from "../ThemeSwitcher";

const Header = () => {
  return (
    <header className='flex items-center justify-center bg-white dark:bg-gray-900 h-12 mb-12'>
      <ThemeSwitcher />
    </header>
  );
};

export default Header;
