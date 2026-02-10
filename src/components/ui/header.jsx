'use client';

import Nav from '@/src/components/ui/nav';

const Header = () => {
  return (
    <header className="border-b bg-white" style={{ height: 'var(--header-height)' }}>
      <div className="container h-full">
        <div className="flex items-center justify-between h-full">
          <h1 className="text-lg font-semibold text-slate-900 m-3">GPX Trails</h1>
          <Nav />
        </div>
      </div>
    </header>
  );
}

export default Header;
