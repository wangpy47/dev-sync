/** @jsxImportSource @emotion/react */
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Button, css, Divider, Typography } from "@mui/material";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { GetLikeCount } from "../../api/GetLikeCount";
import { ToggleLike } from "../../api/ToggleLike";
import { CommentPost } from "../../components/community/CommentPost";
import { DeletePostDlalog } from "../../components/community/DeletePostDialog";
import { OptionBar } from "../../components/community/OptionBar";

export const ReadPostPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const post = location.state; // `navigate`에서 전달된 데이터
  console.log(post);
  if (!post) return null; // post가 없으면 렌더링 막기
  const [date, time] = post.createdAt.split("T");
  const formmatTime = time.substring(0, 5);
  //xss 방지를 위한 데이터 처리
  const sanitizedContent = DOMPurify.sanitize(post.content);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [liked, setLiked] = useState(false);
  const userId = useSelector((state: any) => state.login.loginInfo.user_id);
  const [open, setOpen] = useState(false);

  const checkLikeStatus = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/posts/${post.post_id}/likes/status`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("Failed to check like status");

      const value = await response.text();
      const like = value === "" ? false : true;
      return like;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  useEffect(() => {
    const checkLike = async () => {
      const status = await checkLikeStatus();
      status === true ? setLiked(true) : setLiked(false);
    };
    checkLike();
  }, []);

  const count = async () => {
    const data = await GetLikeCount(post.post_id);
    setLikeCount(data);
  };

  //렌더링시 라이크 갯수
  useEffect(() => {
    count();
  }, []);

  const handleButton = async () => {
    setLiked(!liked);
    await ToggleLike(post.post_id);
    count();
  };

  const handleDelete = () => {
    setOpen(true);
  };

  const handleEditPost = () => {
    const updatedPost = {
      ...post,
      edit: true,
      from: post.category.category,
    };
    navigate(`/post/${post.post_id}/edit`, { state: updatedPost });
  };

  console.log("리드 포스트", post.content);

  return (
    <>
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
                display: flex;
                justify-content: space-between;
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
              <div>
                {post?.user?.user_id === userId && (
                  <OptionBar
                    deleteClick={handleDelete}
                    editClick={handleEditPost}
                  />
                )}
              </div>
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
                {post.user.name}
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
            flex-direction: column;
            gap: 0.4rem;
          `}
        >
          <Button
            onClick={() => navigate(-1)}
            variant="outlined"
            sx={{
              width: "100%",
              margin: "2px",
              padding: "5 0rem",
              color: "#588eda",
              boxShadow: "0px 0px 5px rgba(230, 230, 230, 0.8)",
            }}
          >
            <KeyboardBackspaceIcon />
          </Button>
          <Button
            onClick={handleButton}
            variant="outlined"
            sx={{
              width: "100%",
              margin: "2px",
              padding: "5 0rem",
              color: "#588eda",
              gap: "5px",
              boxShadow: "0px 0px 5px rgba(230, 230, 230, 0.8)",
            }}
          >
            {liked === true ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            <span>{likeCount}</span>
          </Button>
        </div>
        <CommentPost />
        {/* </div> */}
      </div>
      <DeletePostDlalog open={open} setOpen={setOpen} postId={post.post_id} />
    </>
  );
};
