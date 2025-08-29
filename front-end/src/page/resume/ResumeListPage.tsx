import { css } from "@emotion/react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { useDispatch } from "react-redux";
import { setResume } from "../../redux/resumeSlice";

type ResumeSummary = {
  id: string;
  fam_skills: [];
  str_skills: [];
  title: string;
  createAt: string;
  updateAt: string;
  order: any[];
  entities: any[];
  profile: ProfileType;
};

type ProfileType = {
  id: number;
  email: string;
  name: string;
  phoneNumber: number;
  githubUrl: string;
  blogUrl: string;
  birthDate: string;
};

export const ResumeListPage = () => {
  const [resumes, setResumes] = useState<ResumeSummary[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const fetchResumes = async (id : string) => {
      try {
        const response = await fetch(`http://localhost:3000/resumes/${id}`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data)
              dispatch(setResume(data));
      } catch (error) {
        console.error("이력서 가져오기 실패:", error);
      }
    };

  const handleClick = (id : string) => {
    // navigate("/Users"); // 새로운 경로로 이동
    fetchResumes(id);
  };

  const handleOption = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {

  }

  useEffect(() => {
    console.log("aaaa");
    const fetchResumes = async () => {
      try {
        const response = await fetch("http://localhost:3000/resumes", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setResumes(data);
      } catch (error) {
        console.error("이력서 리스트 가져오기 실패:", error);
      }
    };

    fetchResumes();
  }, []);




  return (
    <Box
      css={css`
        max-width: 900px;
        margin: auto;
        padding: 0 1rem;
      `}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom color="#ffffff">
        기존 이력서 목록
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Grid container spacing={4}>
        {resumes.map((resume) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={resume.id}>
            <Card
              variant="outlined"
              css={css`
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                transition: box-shadow 0.3s ease;
                color: #333333;
                background-color: #ffffffdf;
                &:hover {
                  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                }
              `}
            >
        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            // 그림자 0
            elevation: 0,
            sx: {
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1,
            },
          },
        }}
      >
        <MenuItem onClick={() => handleClick(resume.id)}>수정하기</MenuItem>
        <MenuItem onClick={handleDelete} >삭제하기 </MenuItem>
      </Menu>

              <CardContent>
                <div
                  css={css`
                    display: flex;
                    justify-content: space-between;
                  `}
                >
                  <Typography variant="h6" fontWeight={600}>
                    {resume.title}
                  </Typography>
                  <IconButton  onClick={handleOption}>
                   <MoreVertIcon/>
                  </IconButton>
  
                </div>

                <Typography
                  variant="body2"
                  css={css`
                    margin-bottom: 1rem;
                    color: #767676;
                  `}
                >
                  {resume.updateAt.split("T")[0]} 수정
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  css={css`
                    margin-bottom: 0.3rem;
                  `}
                >
                  {resume.profile.email}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  css={css`
                    margin-bottom: 0.5rem;
                  `}
                >
                  {resume.profile.phoneNumber}
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ gap: 1 }}
                  flexWrap="wrap"
                >
                  {[...resume.fam_skills, ...resume.str_skills].map(
                    (
                      skill: { id: string; icon: string; name: string },
                      idx
                    ) => (
                      <Chip
                        key={idx}
                        label={skill.name}
                        size="small"
                        variant="outlined"
                      />
                    )
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
