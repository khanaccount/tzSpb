import React from "react";
import { Routes, Route } from "react-router";

import { Layout } from "layout/index";
import { Home } from "pages/HomePage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
