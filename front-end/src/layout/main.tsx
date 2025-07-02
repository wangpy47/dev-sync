import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "../redux/store.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserPage } from "../page/UserPage.tsx";
import { EditResumePage } from "../page/resume/EditResumePage.tsx";
import { MainBodyPage } from "../page/MainBodyPage.tsx";
import { InquiryFormPage } from "../page/inquiry/InquiryFormPage.tsx";
import { InquiryPage } from "../page/inquiry/InquiryPage.tsx";
import { WritePostPage } from "../page/community/WritePostPage.tsx";
import { ReadPostPage } from "../page/community/ReadPostPage.tsx";
import { CommunityLayout } from "../components/community/CommunityLayout.tsx";
import { GitPatchPage } from "../page/resume/GitPatchPage";
import { CommunityListPage } from "../page/community/CommunityListPage.tsx";

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
        element: <MainBodyPage />,
      },
      {
        path: "inquiry",
        element: <InquiryPage />,
        children: [
          {
            path: "write",
            element: <InquiryFormPage />,
          },
        ],
      },
      {
        path: "community",
        element: <CommunityLayout />,
        children: [
          {
            path: ":categoryKey",
            element: <CommunityListPage />,
          },
          {
            path: "post/:postId",
            element: <ReadPostPage />,
          },
        ],
      },
      {
        path: "post/new",
        element: <WritePostPage />, // 글 작성
      },
      {
        path: "post/:postId/edit",
        element: <WritePostPage />, // 글 수정
      },
    ],
  },
  {
    path: "/resume",
    element: <GitPatchPage />,
  },
  {
    path: "/resume/editor",
    element: <EditResumePage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
