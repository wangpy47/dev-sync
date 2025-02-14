import { useLocation, useNavigate } from "react-router-dom";
import { TextField, InputAdornment, Button, Divider } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface CommunityActionsProps {
  category: string;
}

const CommunityAction = ({ category }: CommunityActionsProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  // 게시물 페이지에서는 안 보이게 설정
  const isPostPage = location.pathname.startsWith("/community/post/");

  if (isPostPage) return null;

  return (
    <>
      {/* 검색 바 */}
      <div style={{ display: "flex", marginBottom: "1rem" }}>
        <TextField
          size="small"
          variant="outlined"
          sx={{ flex: 1, backgroundColor: "white" }}
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
