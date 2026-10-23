import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white px-6 py-4">
      <p className="text-center text-sm text-slate-500">
        © {new Date().getFullYear()} DS Practical Solutions SE. All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;
