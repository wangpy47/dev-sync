import { css } from "@emotion/react";
import Header from "./Header";
import Footer from "./Footer";
import { StrictMode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../redux/redux";
import { Outlet } from "react-router-dom";
import "devicon/devicon.min.css";
const layoutStyle = css`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
`;

const contentWrapperStyle = css`
  flex-grow: 1;
  margin-top: 70px;
  width: 100%;
  overflow-x: hidden;
`;

const containerStyle = css`
  max-width: 1800px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  padding: 0 1rem;
`;

const innerContentStyle = css`
  min-height: 800px;
  background-color: #f7f7f8;
  box-sizing: border-box;
  width: 100%;
  max-width: 2000px;
  margin: 0 auto;
`;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("http://localhost:3000/auth/status", {
      credentials: "include",
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === "Not authenticated") {
          dispatch(logout());
        } else {
          fetch(`http://localhost:3000/user/getUser`, {
            credentials: "include",
          })
            .then((response) => response.json())
            .then((userInfo) => {
              console.log(userInfo, "app 초기");
              dispatch(login(userInfo));
            })
            .catch((error) => console.error("Error:", error));
        }
      });
  }, []);

  return (
    <StrictMode>
      <div css={layoutStyle}>
        <div css={containerStyle}>
          <Header />
        </div>

        <main css={contentWrapperStyle}>
          <div css={innerContentStyle}>
            <Outlet />
          </div>
        </main>

        <div css={containerStyle}>
          <Footer />
        </div>
      </div>
    </StrictMode>
  );
}

export default App;
