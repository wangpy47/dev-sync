/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { StrictMode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./redux/redux";
import { Outlet } from "react-router-dom";

const layoutStyle = css`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  box-sizing: border-box;
`;

const contentWrapperStyle = css`
  flex-grow: 1;
  margin: 0;
  box-sizing: border-box; /* 패딩 포함 */
  overflow-x: hidden; /* 가로 스크롤 숨기기 */
  margin-top: 70px;
  width: 100vw;
`;

const innerContentStyle = css`
  min-height: 800px;
  background-color: #f7f7f8;
  box-sizing: border-box; /* 패딩 포함 */
  @media (max-width: 768px) {
    padding: 1rem; /* 모바일 화면에서 padding 조정 */
  }
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
          // 유저가 여전히 로그인된 상태
          fetch(`http://localhost:3000/user/getUser`, {
            credentials: "include", // 세션 쿠키를 포함
          })
            .then((response) => response.json())
            .then((userInfo) => {
              console.log(userInfo, "app 초기"); // 유저 정보 출력
              dispatch(login(userInfo));
            })
            .catch((error) => console.error("Error:", error));
        }
      });
  }, []);

  return (
    <StrictMode>
      <div css={layoutStyle}>
        <Header />
        <main css={contentWrapperStyle}>
          <div css={innerContentStyle}>
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </StrictMode>
  );
}

export default App;
