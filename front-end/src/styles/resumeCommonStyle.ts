/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";


const containerStyle = css`
  display: flex;
  position: relative;
  flex-direction: column;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  min-height: 100vh;
  background-color: #ededed;
`;


const titleStyle = css`
  font-size: 3rem;
  margin-top: 6rem;
  span {
    display: block; /* 기본은 inline */
  }
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
  font-weight: bold;
  text-align: center;
  z-index: 1;
`;


const contentWrapperStyle = css`
  position: relative;
  z-index: 1; // 파란 배경보다 위
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const blueBackgroundStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh; // 전체 높이
  background: #3599fd;
  transform: skewY(-5deg);
  transform-origin: top left;
  z-index: 0;
`;

const headerStyle = css`
  position: relative;
  display: flex;
  z-index: 0;
  padding-left: 1rem;
  width: 100%;
  justify-content: space-between;
  color: #ffffff;
`;

export {containerStyle , headerStyle , titleStyle , blueBackgroundStyle ,contentWrapperStyle}