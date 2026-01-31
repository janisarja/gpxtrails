'use client';

import Nav from './nav';

const Header = () => {
  return (
    <header className="border-b bg-white">
      <div className="container">
        <div className="flex items-center justify-between py-3">
          <h1 className="text-lg font-semibold text-slate-900">GPX Trails</h1>
          <Nav />
        </div>
      </div>
    </header>
  );
}

export default Header;
