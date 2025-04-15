/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { CommunityLayout } from "./CommunityLayout";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { css } from "@emotion/react";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

type PostType = {
  post_id: number;
  title: string;
  content: string;
  viewCount: number;
  commentcount: number;
  likecount: number;
};

type CommunityContextType = {
  postList: PostType[];
  setPostList: React.Dispatch<React.SetStateAction<PostType[]>>;
};

export const CommunityComponent = () => {
  const { postList, setPostList } = useOutletContext<CommunityContextType>();
  const navigate = useNavigate();
  const [postData, setPostData] = useState<
    {
      post_id: number;
      title: string;
      content: string;
      viewCount: number;
      commentcount: number;
      likecount: number;
    }[]
  >([]);
  const location = useLocation();
  let category = "";
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20;
  const totalPages = Math.ceil(postList.length / postsPerPage);

  if (location.pathname.startsWith("/community/")) {
    const path = location.pathname.replace("/community/", "");
    category =
      path === "general"
        ? "자유게시판"
        : path === "question"
        ? "질문게시판"
        : path === "notice"
        ? "공지사항"
        : "";
  }

  useEffect(() => {
    if (category !== "") {
      fetch(`http://localhost:3000/posts/categories/${category}`)
        .then((res) => res.json())
        .then((data) => {
          // HTML 태그 제거 후 상태 저장
          const cleanedData = data
            .map((post: any) => ({
              ...post,
              content: post.content,
            }))
            .sort(
              (a: { post_id: number }, b: { post_id: number }) =>
                b.post_id - a.post_id
            );
          setPostList(cleanedData);
        })
        .catch((error) => console.error("Error fetching posts:", error));
    }
  }, [category]);

  const removeTag = (html: string) => {
    // <img> 태그를 (이미지)로 대체
    let text = html.replace(/<img[^>]*>/g, "(이미지)");
    // 나머지 HTML 태그 제거
    text = text.replace(/<[^>]+>/g, "");

    return text;
  };
  const increaseViewCount = async (postId: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/posts/${postId}/view`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("조회수 증가 실패");
      }
    } catch (error) {
      console.error("API 호출 에러:", error);
    }
  };

  const handleListClick = async (post: {
    post_id: number;
    title: string;
    content: string;
    viewCount: number;
  }) => {
    // console.log(post);
    await increaseViewCount(post.post_id);

    const updatedPost = {
      ...post,
      viewCount: post.viewCount + 1,
    };
    navigate(`/community/post/${post.post_id}`, { state: updatedPost });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // 현재 페이지에 맞는 게시물만 가져오기
  const paginatedPosts = postList.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <>
      <List
        sx={{
          bgcolor: "background.paper",
        }}
      >
        {paginatedPosts.map((post) => (
          <div key={post.post_id}>
            <ListItem onClick={() => handleListClick(post)}>
              <ListItemText
                primary={post.title}
                secondary={removeTag(post.content) || ""}
                primaryTypographyProps={{
                  sx: {
                    fontSize: "1rem",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  },
                }}
                secondaryTypographyProps={{
                  sx: {
                    fontSize: "0.8rem",
                    fontColor: "#454545",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    padding: "5px 0px 15px 0px",
                  },
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: "4px",
                  right: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "0.75rem",
                  color: "gray",
                }}
              >
                <VisibilityOutlinedIcon sx={{ fontSize: "13px" }} />
                <Typography sx={{ fontSize: "13px" }}>
                  {post.viewCount ?? 0}
                </Typography>
                <ChatBubbleOutlineOutlinedIcon sx={{ fontSize: "13px" }} />
                <Typography sx={{ fontSize: "13px" }}>
                  {post.commentcount}
                </Typography>
                <FavoriteBorderIcon sx={{ fontSize: "13px" }} />
                <Typography sx={{ fontSize: "13px" }}>
                  {post.likecount}
                </Typography>
              </Box>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
      <div
        css={css`
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 2;
        `}
      >
        {currentPage > 5 && (
          <Button
            size="small"
            onClick={() => handlePageChange(currentPage - 5)}
          >
            이전
          </Button>
        )}

        {Array.from(
          {
            length: Math.min(
              5,
              totalPages - Math.floor((currentPage - 1) / 5) * 5
            ),
          },
          (_, i) => {
            const pageNumber = Math.floor((currentPage - 1) / 5) * 5 + i + 1;
            return (
              <button
                css={css`
                  padding: 0;
                  font-size: 14px;
                  background-color: #f7f7f8;
                  color: ${pageNumber === currentPage
                    ? "hsl(216, 55%, 39%)"
                    : "black"};
                `}
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          }
        )}

        {currentPage + 5 <= totalPages && (
          <Button
            size="small"
            onClick={() => handlePageChange(currentPage + 5)}
          >
            다음
          </Button>
        )}
      </div>
    </>
  );
};
