import React from "react";
import { Route, Routes } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import Home from "../pages/home/Home";
import CodeEditor from "../pages/Code Editor/CodeEditor";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/editor" element={<CodeEditor />} />
    </Routes>
  );
};

export default AppRoutes;
