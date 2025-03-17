/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useFetchCategories from "../../hooks/useFetchCategories";
import { useState } from "react";
import CommunityAction from "./CommunityAction";

export const CommunityLayout = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("자유게시판");
  const { categories } = useFetchCategories();

  const handleCategory = (category: string) => {
    setCategory(category);
    navigate(
      category === "자유게시판"
        ? "/community/general"
        : category === "질문게시판"
        ? "/community/question"
        : category === "공지사항"
        ? "/community/notice"
        : "/inquiry"
    );
  };

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
            background: #f0f3f6;
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
                onClick={() => handleCategory(categories.category)}
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
          margin-left: 180px; /*·사이드바 공간 확보 */
          padding: 2rem;
          width: 65%;
        `}
      >
        <CommunityAction category={category} />
        {/* 게시물 영역 */}
        <div
          css={css`
            margin-top: 1rem;
          `}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};
