/** @jsxImportSource @emotion/react */
import { Button, css, Divider, TextField, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DOMPurify from "dompurify";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import { useGetLikeCount } from "../../hooks/useGetLikeCount";
import { useToggleLike } from "../../hooks/useToggleLike";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { CommentPost } from "./CommentPost";
import { useEffect } from "react";

export const ReadPost = () => {
  const location = useLocation();
  const nagivate = useNavigate();
  const post = location.state; // `navigate`에서 전달된 데이터
  const [date, time] = post.createdAt.split("T");
  const formmatTime = time.substring(0, 5);
  //xss 방지를 위한 데이터 처리
  const sanitizedContent = DOMPurify.sanitize(post.content);

  const getLike = async () => {
    const data = await useToggleLike(post.post_id);
    console.log(data);
    like();
  };

  const handleButton = (i: number) => {
    if (i === 0) {
      nagivate(-1);
    } else if (i === 1) {
      getLike();
    }
  };

  // useEffect(() => {
  //   getLike();
  // }, []);

  const like = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/posts/${post.post_id}/likes/status`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("실패");
      }
      const value = await response.json();
      const like = value?.like_id ? true : false;
      console.log(like);
    } catch (error) {
      return null;
    }
  };

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
          width: 85px;
          position: fixed;
          top: 25%;
          right: max(6%, 20px);

          display: flex;
          flex-direction: column; /* 기본 세로 정렬 */
          gap: 0.4rem;
          @media (max-width: 768px) {
            width: 100%; /* 가로 길이 꽉 채우기 */
            position: static; /* 고정 해제 */
            justify-content: center; /* 중앙 배치 */
            flex-direction: row; /* 가로 정렬 */
            margin-top: 1.5rem; /* 콘텐츠랑 간격 띄우기 */
          }
        `}
      >
        {["KeyboardBackspaceIcon", "FavoriteBorderIcon"].map((Icon, index) => (
          <Button
            onClick={() => handleButton(index)}
            key={index}
            variant="outlined"
            sx={{
              width: "100%",
              borderColor: "#d3d3d3", // ✅ 아웃라인 컬러 변경
              margin: "2px",
              boxShadow: "0px 0px 5px rgba(230, 230, 230, 0.8)",
              padding: "5 0rem",
              color: "#588eda",
              "& svg": {
                fontSize: "20px",
              },
              ...(index === 1 && { gap: "0.3rem" }), // 좋아요 버튼만 간격 조정
              "@media (max-width: 768px)": {
                width: "60px", // 모바일에서 버튼 크기 축소
                height: "30px",
                margin: "0rem 1rem",
                "& svg": {
                  fontSize: "15px",
                },
                minWidth: "auto", // 버튼 기본 크기 무시
              },
            }}
          >
            {index === 0 ? <KeyboardBackspaceIcon /> : <FavoriteBorderIcon />}
            {index === 1 && <span>10</span>} {/* 숫자 표시 */}
          </Button>
        ))}
      </div>
      <CommentPost />
    </div>
  );
};
