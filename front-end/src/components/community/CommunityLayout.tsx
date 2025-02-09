/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { Outlet, useNavigate } from "react-router-dom";
import useFetchCategories from "../../hooks/useFetchCategories";
import { Children, useEffect, useState } from "react";
import { WritePost } from "./WritePost";

export const CommunityLayout = ({ children }: { children?: any }) => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("자유게시판");
  const { categories } = useFetchCategories();

  useEffect(() => {
    category === "자유게시판"
      ? navigate("/community/general")
      : category === "질문게시판"
      ? navigate("/community/question")
      : category === "공지사항"
      ? navigate("/community/notice")
      : category === "문의하기"
      ? navigate("/inquiry")
      : "/";
  }, [category]);

  return (
    <div
      css={css`
        display: flex;
        padding: 4rem 7rem;
      `}
    >
      <Drawer
        variant="permanent"
        css={css`
          position: absolute; /* 고정 위치 */
          & .MuiDrawer-paper {
            width: 11em;
            background: #f8f9fa;
            border-right: 1px solid #ddd;
            margin-top: 70px;
          }
        `}
      >
        <List>
          {categories.map((categories) => (
            <ListItem key={categories.category_id} disablePadding>
              <ListItemButton
                css={css`
                  color: ${category === categories.category
                    ? "#134498f5"
                    : "#888"};
                  background: ${category === categories.category
                    ? "rgba(102, 184, 250, 0.13)"
                    : "transparent"};
                  &:hover {
                    background: rgba(202, 201, 201, 0.252);
                  }
                `}
                onClick={() => setCategory(categories.category)}
              >
                <ListItemText primary={categories.category} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* 오른쪽 컨텐츠 영역 */}
      <div
        css={css`
          flex-grow: 1;
          margin-left: 180px; /* 사이드바 공간 확보 */
          padding: 1rem;
        `}
      >
        {/* 검색 바 */}
        <div
          css={css`
            display: flex;
            margin-bottom: 1rem;
          `}
        >
          <TextField
            size="small"
            variant="outlined"
            sx={{
              flex: 1,
              backgroundColor: "white",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" sx={{ marginLeft: "1rem" }}>
            검색
          </Button>
        </div>
        <div
          css={css`
            display: flex;
            justify-content: flex-end;
          `}
        >
          {(category === "자유게시판" || category === "질문게시판") && (
            <Button
              onClick={() =>
                navigate("/writepost", { state: { from: category } })
              }
              variant="contained"
            >
              글쓰기
            </Button>
          )}
        </div>
        {/* 게시물 영역 */}
        <div
          css={css`
            height: 1000px;
            background: white;
            margin-top: 1rem;
          `}
        >
          {/* <Outlet /> */}
          {children}
        </div>
      </div>
    </div>
  );
};
