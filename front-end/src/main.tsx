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
import Contact from "./components/contact/Contact.tsx";
import InquiryList from "./components/contact/InquiryList.tsx";
import { WritePost } from "./components/community/WritePost.tsx";
import { CommunityComponent } from "./components/community/CommunityComponent.tsx";
import { ReadPost } from "./components/community/ReadPost.tsx";
import { CommunityLayout } from "./components/community/CommunityLayout.tsx";
import { GitPatchPage } from "./components/GitPatchPage.tsx";

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
        path: "inquiry",
        element: <InquiryList />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "community",
        element: <CommunityLayout />,
        children: [
          {
            path: "question",
            element: <CommunityComponent />,
          },
          {
            path: "notice",
            element: <CommunityComponent />,
          },
          {
            path: "general",
            element: <CommunityComponent />,
          },
          {
            path: "post/:postId",
            element: <ReadPost />,
          },
        ],
      },
      {
        path: "writepost",
        element: <WritePost />,
      },
    ],
  },
  {
    path: "/resume",
    element: <GitPatchPage />,
  },
  {
    path: "/resume/edit",
    element: <EditResume />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
