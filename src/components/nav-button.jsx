'use client';

import Link from 'next/link';

const NavButton = ({ href, children }) => {
  return (
    <Link href={href} className="px-3 py-1 rounded-md text-sm text-slate-700 hover:bg-slate-100">
      {children}
    </Link>
  );
}

export default NavButton;
