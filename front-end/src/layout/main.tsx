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
import { ResumeSetupLayout } from "./ResumeSetupLayout .tsx";
import { CommunityListPage } from "../page/community/CommunityListPage.tsx";
import { ResumeListPage } from "../page/resume/ResumeListPage.tsx";
import { GitConnectPage } from "../page/resume/GitConnectPage.tsx";
import { ResumeIntroPage } from "../page/resume/ResumeIntroPage.tsx";

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
      },
      {
        path: "inquiry/new",
        element: <InquiryFormPage />,
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
    element: <ResumeSetupLayout />,
    children: [
      {
        index: true,
        element: <ResumeIntroPage />,
      },
      {
        path: "list",
        element: <ResumeListPage />,
      },
      { path: "connect", element: <GitConnectPage /> },
    ],
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
