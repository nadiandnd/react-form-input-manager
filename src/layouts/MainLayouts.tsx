import React from "react";
import { Outlet } from "react-router-dom";

const MainLayouts: React.FC = () => {
  return (
    <div>
      <header>
        <h1>MainLayouts</h1>
        <nav>
          <a href="/">Home</a> | <a href="/about">About</a>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>© 2025 React Form Input Manager. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default MainLayouts;
