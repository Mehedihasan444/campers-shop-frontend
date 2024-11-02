import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "./redux/store";
// import { AuthProvider } from "./AuthProvider/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <AuthProvider> */}
      <Provider store={store}>
        <Toaster />
        <RouterProvider router={routes} />
      </Provider>
    {/* </AuthProvider> */}
  </React.StrictMode>
);
