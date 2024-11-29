import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/app.tsx";
import ChatDetail from "./pages/ChatDetail.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/chat/info" /> },
      { path: "/chat/info", element: <ChatDetail /> },
      { path: "chat/:id", element: <ChatDetail /> },
    ],
  },
  {
    path: "/chat",
    element: <p>Chat detail</p>,
  },
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
