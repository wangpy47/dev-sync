import { useLocation, useNavigate } from "react-router-dom";
import { TextField, InputAdornment, Button, Divider } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { MenuItem, Select } from "@mui/material";

interface CommunityActionsProps {
  category: string;
}

const CommunityAction = ({ category }: CommunityActionsProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [searchType, setSearchType] = useState<"title" | "content" | "all">(
    "all"
  );
  // 게시물 페이지에서는 안 보이게 설정
  const isPostPage = location.pathname.startsWith("/community/post/");

  if (isPostPage) return null;

  const handleSearch = async () => {
    if (!keyword.trim()) return;

    const response = await fetch(
      `http://localhost:3000/posts/search?keyword=${encodeURIComponent(keyword)}&category=${encodeURIComponent(category)}&type=${searchType}`
    );
    

    if (!response.ok) {
      console.error("검색 실패");
      return;
    }

    const result = await response.json();
    console.log(result);
  };

  return (
    <>
      {/* 검색 바 */}
      <div style={{ display: "flex", marginBottom: "1rem" }}>
        <Select
          value={searchType}
          size="small"
          onChange={(e) => setSearchType(e.target.value as any)}
          sx={{ marginRight: "1rem", width: "140px", backgroundColor: "white" }}
        >
          <MenuItem value="title">제목</MenuItem>
          <MenuItem value="content">내용</MenuItem>
          <MenuItem value="all">제목+내용</MenuItem>
        </Select>

        <TextField
          size="small"
          variant="outlined"
          sx={{ flex: 1, backgroundColor: "white" }}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          sx={{ marginLeft: "1rem" }}
          onClick={handleSearch}
        >
          검색
        </Button>
      </div>

      {/* 글쓰기 버튼 */}
      {(category === "자유게시판" || category === "질문게시판") && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "1rem",
          }}
        >
          <Button
            onClick={() =>
              navigate("/writepost", { state: { from: category } })
            }
            variant="contained"
          >
            글쓰기
          </Button>
        </div>
      )}

      <Divider />
    </>
  );
};

export default CommunityAction;
