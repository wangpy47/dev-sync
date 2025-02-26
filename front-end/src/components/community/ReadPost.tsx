/** @jsxImportSource @emotion/react */
import { Button, css, Divider, TextField, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DOMPurify from "dompurify";

export const ReadPost = () => {
  const location = useLocation();
  const post = location.state; // `navigate`에서 전달된 데이터
  const [date, time] = post.createdAt.split("T");
  const formmatTime = time.substring(0, 5);
  //xss 방지를 위한 데이터 처리
  const sanitizedContent = DOMPurify.sanitize(post.content);

  return (
    <div
      css={css`
        width: 100%;
      `}
    >
      <div
        css={css`
          background-color: #fdfdfd;
          padding: 1.7rem 1.5rem;
          border-radius: 10px;
        `}
      >
        <div
          css={css`
            margin-bottom: 2rem;
          `}
        >
          <div
            css={css`
              height: 10%;
              font-size: 1.7rem;
              font-weight: bold;
            `}
          >
            {post.title}
          </div>
          <div
            css={css`
              display: flex;
              color: #898989;
              font-size: 14px;
            `}
          >
            <div>
              {date} {formmatTime}
            </div>
            <div
              css={css`
                margin: 0px 8px;
              `}
            >
              작성자
            </div>
            <div
              css={css`
                display: flex;
                align-items: center;
                justify-content: center;
              `}
            >
              <VisibilityOutlinedIcon
                sx={{ fontSize: "13px", marginRight: "3px" }}
              />
              <Typography sx={{ fontSize: "13px" }}>
                {post.viewCount ?? 0}
              </Typography>
            </div>
          </div>
        </div>
        <div
          css={css`
            padding-bottom: 60px;
            min-height: fit-content;
            img {
              max-width: 30%; // 부모 요소 너비에 맞게 조정
              height: auto; // 비율 유지하며 크기 조정
              display: block; // 레이아웃 깨짐 방지
              margin: 0 auto; // 중앙 정렬
            }
          `}
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </div>
      <div>
        <Divider />
      </div>
      <div
        css={css`
          min-height: fit-content;
          padding: 2rem 0rem;
          display: flex;
          gap: 5px;
        `}
      >
        <TextField
          hiddenLabel
          variant="outlined"
          css={css`
            width: 80%;
            background-color: #ffffff;
            font-size: 12px;
          `}
          multiline
          maxRows={10}
        />
        <Button
          variant="contained"
          css={css`
            margin: 7px;
          `}
        >
          등록
        </Button>
        <Button
          css={css`
            margin: 7px 0px;
          `}
          variant="outlined"
        >
          취소
        </Button>
      </div>
    </div>
  );
};
