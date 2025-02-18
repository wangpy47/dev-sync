/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Divider,
  Box,
} from "@mui/material";
import useFetchCategories from "../../hooks/useFetchCategories";
import { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";

const titleStyle = css`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const selectStyle = css`
  margin-bottom: 15px;
`;

const inputStyle = css`
  margin-bottom: 15px;
`;

const modules = {
  toolbar: [
    [{ size: ["small", false, "large", "huge"] }], // 폰트 크기
    [{ align: [] }], // 정렬 (왼쪽, 가운데, 오른쪽, 양쪽 정렬)
    ["bold", "italic", "underline", "strike"], // 기본 스타일
    [{ color: [] }, { background: [] }], // 글자 색상, 배경 색상
    [{ list: "ordered" }, { list: "bullet" }], // 리스트
    ["image"], // 이미지, 링크 추가
  ],
};

export const WritePost = () => {
  const { quill, quillRef } = useQuill({ modules });
  const { categories } = useFetchCategories();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(location.state.from);
  const [title, setTitle] = useState("");

  const handleContentSave = async () => {
    if (quill) {
      const editorContent = quill.root.innerHTML;
      console.log("저장된 내용:", editorContent);
      await handleSave(editorContent); // content를 바로 넘김
    }
  };

  const handleSave = async (contentData: string) => {
    console.log(typeof contentData);
    const response = await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",

      body: JSON.stringify({
        title: title,
        content: contentData, // 여기서 바로 받은 데이터 사용
        category: selectedCategory,
      }),
    });

    console.log(title, contentData, selectedCategory, response);
    if (response.ok) {
      const result = await response.json();
      console.log(result);
    } else {
      const error = await response.json();
      console.error("Update failed:", error, response);
    }
  };

  return (
    <div
      css={css`
        margin: 5% 25%;
      `}
    >
      <h2 css={titleStyle}>✏️ 글쓰기</h2>
      <Select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        css={selectStyle}
        fullWidth
      >
        {categories
          .filter((i) => i.category !== "문의하기" && i.category !== "공지사항")
          .map((i) => (
            <MenuItem key={i.category_id} value={i.category}>
              {i.category}
            </MenuItem>
          ))}
      </Select>

      {/* 제목 입력 */}
      <TextField
        label="제목"
        variant="outlined"
        fullWidth
        css={inputStyle}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* 본문 입력 */}
      <div style={{ height: "20rem" }}>
        <div ref={quillRef} />
      </div>
      {/* 버튼 */}
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", marginTop: "5rem" }}
      >
        <Button
          variant="outlined"
          color="primary"
          sx={{ marginRight: "0.5rem" }}
          onClick={() => {
            navigate("/community");
            //이동시 스크롤 맨위
            window.scrollTo(0, 0);
          }}
        >
          취소
        </Button>
        <Button variant="contained" color="primary" onClick={handleContentSave}>
          등록
        </Button>
      </Box>
    </div>
  );
};
