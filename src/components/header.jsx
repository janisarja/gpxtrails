'use client';

import Nav from './nav';

const Header = () => {
  return (
    <header className="border-b bg-white" style={{ height: 'var(--header-height)' }}>
      <div className="container h-full">
        <div className="flex items-center justify-between h-full">
<<<<<<< HEAD
<<<<<<< HEAD
          <h1 className="text-lg font-semibold text-slate-900 m-3">GPX Trails</h1>
=======
          <h1 className="text-lg font-semibold text-slate-900">GPX Trails</h1>
>>>>>>> 119d19f (Add a two column layout for pages with maps)
=======
          <h1 className="text-lg font-semibold text-slate-900 m-3">GPX Trails</h1>
>>>>>>> b460069 (Add styling and refactor buttons)
          <Nav />
        </div>
      </div>
    </header>
  );
}

export default Header;
