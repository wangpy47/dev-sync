/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button } from "@mui/material";
import logo from "../../assets/logo2.png";

export const ResumeOptionBar = ({
  onDownloadPdf,
}: {
  onDownloadPdf: () => void;
}) => {
  return (
    <div
      css={css`
        width: 100%;
        max-width: 100%;
        height: 4.9em;
        background-color: #ffffff;
        border-bottom: 1px solid #e0e0e0;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 1.5rem 0 1rem;
        position: sticky;
        top: 0;
        z-index: 10;
        box-sizing: border-box;
        overflow-x: hidden;
      `}
    >
      <div
        css={css`
          padding-top: 0.3rem;
          // border: 1px solid red;
          font-size: 1.6rem;
          font-weight: 600;
        `}
      >
        <img
          src={logo}
          alt="로고"
          css={css`
            height: 65px;
            cursor: pointer;
          `}
        />
      </div>

      <div
        css={css`
          display: flex;
          gap: 1rem;
        `}
      >
        <Button>저장하기</Button>
        <Button onClick={onDownloadPdf}>PDF 출력</Button>
      </div>
    </div>
  );
};
