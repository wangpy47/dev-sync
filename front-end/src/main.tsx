import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserPage } from "./components/UserPage.tsx";
import { EditResume } from "./components/EditResume.tsx";
import { GitResume } from "./components/GitResume.tsx";
import MainBody from "./components/body/Main.body.tsx";
import ContactForm from "./components/contact/ContactForm.tsx";
import Contact from "./components/contact/Contact.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "users",
        element: <UserPage />,
      },
      {
        index: true,
        element: <MainBody />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "contact_form",
        element: <ContactForm />,
      },

    ],
  },
  {
    path: "/resume",
    element: <EditResume />,
    children: [
      {
        path: "edit",
        element: <GitResume />,
      },
    ],
  },
  
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
