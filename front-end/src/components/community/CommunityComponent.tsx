import { useEffect, useState } from "react";
import { CommunityLayout } from "./CommunityLayout";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";

export const CommunityComponent = () => {
  const navigate = useNavigate();
  const [postList, setPostList] = useState<
    { post_id: number; title: string; content: string; viewCount: number }[]
  >([]);
  const location = useLocation();
  let category = "";

  if (location.pathname.startsWith("/community/")) {
    const path = location.pathname.replace("/community/", "");
    console.log(path);
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
          console.log(data);
          const cleanedData = data.map((post: any) => ({
            ...post,
            content: post.content.replace(/<[^>]*>/g, ""),
          }));
          console.log(cleanedData);
          setPostList(cleanedData);
        })
        .catch((error) => console.error("Error fetching posts:", error));
    }
  }, [category]);

  console.log(postList);

  return (
    <>
      <List
        sx={{
          bgcolor: "background.paper",
        }}
      >
        {postList.map((post) => (
          <>
            <ListItem
              key={post.post_id}
              onClick={() => navigate(`/community/post/${post.post_id}`)}
            >
              <ListItemText
                primary={post.title}
                secondary={post.content || ""}
                primaryTypographyProps={{
                  sx: {
                    fontSize: "1rem", // 제목 글씨 크기 조정
                    fontWeight: "bold",
                    whiteSpace: "nowrap", // 한 줄로 유지
                    overflow: "hidden", // 넘치는 내용 숨김
                    textOverflow: "ellipsis", // "..." 처리
                  },
                }}
                secondaryTypographyProps={{
                  sx: {
                    fontSize: "0.8rem", // 내용 글씨 크기 조정
                    fontColor: "#454545",
                    whiteSpace: "nowrap", // 한 줄로 유지
                    overflow: "hidden", // 넘치는 내용 숨김
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
                  fontSize: "0.75rem", // 작은 글씨
                  color: "gray",
                }}
              >
                <VisibilityOutlinedIcon sx={{ fontSize: "13px" }} />
                <Typography sx={{ fontSize: "13px" }}>
                  {post.viewCount ?? 0}
                </Typography>
                <ChatBubbleOutlineOutlinedIcon sx={{ fontSize: "13px" }} />
                <Typography sx={{ fontSize: "13px" }}>{50}</Typography>
                <ThumbUpAltOutlinedIcon sx={{ fontSize: "13px" }} />
                <Typography sx={{ fontSize: "13px" }}>{10}</Typography>
              </Box>
            </ListItem>
            <Divider component="li" sx={{ padding: "3px 0px" }} />
          </>
        ))}
      </List>
    </>
  );
};
