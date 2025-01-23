import React from "react";
import { Outlet } from "react-router-dom";

const GeneralLayout: React.FC = () => {
  return (
    <div>
      <header>
        <h1>General Layout</h1>
        <nav>
          <a href="/">&#8592;Back</a>
        </nav>
        <nav>
          <a href="/login">Login</a> | <a href="/register">Register</a>
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

export default GeneralLayout;
