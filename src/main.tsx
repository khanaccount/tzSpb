import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { store } from "store/store.ts";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import "styles/index.scss";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Toaster position="top-center" reverseOrder={false} />
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
