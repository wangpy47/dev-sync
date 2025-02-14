/** @jsxImportSource @emotion/react */
import { Button, css } from "@mui/material";

export const ReadPost = () => {
  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
      `}
    >
      <div
        css={css`
          // background-color: #f7f7f8;
          padding: 0.5rem 0.5rem;
        `}
      >
        <Button variant="outlined" sx={{ fontWeight: "bold" }}>
          뒤로가기
        </Button>
      </div>
      <div
        css={css`
          height: 10%;
          // border: 2px solid blue;
        `}
      >
        헤더
      </div>
      <div>내용</div>
    </div>
  );
};
