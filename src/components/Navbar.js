import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 text-white shadow-md h-16 flex items-center justify-center px-8">
      <div className="flex space-x-16 text-lg font-bold">
        <h1>New Project</h1>
        <h1>In-Progress</h1>
        <h1>Completed</h1>
      </div>
    </nav>
  );
};

export default Navbar;
