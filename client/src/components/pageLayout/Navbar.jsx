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
      <div className="mx-auto flex max-w-6xl flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/"
          onClick={handleScrollToTop}
          className="w-fit text-lg font-bold tracking-tight text-slate-900 transition-colors hover:text-slate-600 focus:outline-none"
          aria-label="DS Practical Solutions SE - Go to home and scroll to top"
        >
          DS Practical Solutions SE
        </Link>

        <p className="text-xs font-medium text-slate-500 sm:text-sm">
          Code toh copy ho gaya, ab viva ka dekh lo! 💀
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
