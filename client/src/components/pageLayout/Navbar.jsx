import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const handleScrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: false });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white px-4 py-4 sm:px-6">
      <div className="mx-auto grid max-w-6xl grid-cols-3 items-center">
        <div />

        <Link
          to="/"
          onClick={handleScrollToTop}
          className="w-fit justify-self-center text-center text-lg font-bold tracking-tight text-slate-900 transition-colors hover:text-slate-600 focus:outline-none"
          aria-label="DSA Solutions SE - Go to home and scroll to top"
        >
          DSA Solutions SE
        </Link>

        <Link
          to="/editor"
          className="justify-self-end rounded-md px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none"
          aria-label="Open code editor"
        >
          Editor
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
