'use client';

import NavButton from './nav-button';

const Nav = () => {
  return (
    <nav aria-label="Main navigation">
      <ul className="flex items-center gap-3">
        <li><NavButton href="/">Home</NavButton></li>
        <li><NavButton href="/trails">Trails</NavButton></li>
        <li><NavButton href="/trails/new">New Trail</NavButton></li>
      </ul>
    </nav>
  );
}

export default Nav;
