/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  Button,
  Chip,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import CustomSection from "./CustomSection";
import { useSelector } from "react-redux";

const contentStyle = css`
  border: 2px solid #c7c7c7;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const textFieldStyle = css`
  width: 100%;
`;

const titleStyle = css`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const sectionStyle = css``;

export const GitResume = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [sections, setSections] = useState<number[]>([]);
  const userData = useSelector((state: any) => state.login.loginInfo);
  const [username, setUsername] = useState(userData.username || "");
  const [email, setEmail] = useState(userData.email || "");
  const [githubUrl, setGithubUrl] = useState(userData.githubUrl || "");

  useEffect(() => {
    if (userData) {
      setUsername(userData.name || "");
      setEmail(userData.email || "");
      setGithubUrl(userData.githubUrl || "");
    }
    console.log(userData);
  }, [userData]);

  const handleAddSkill = () => {
    if (inputValue.trim()) {
      setSkills([...skills, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleDeleteSkill = (skillToDelete: string) => {
    setSkills(skills.filter((skill) => skill !== skillToDelete));
  };

  const handleAddSection = () => {
    setSections([...sections, sections.length + 1]);
  };

  return (
    <>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 3.7rem;
          background-color: #f5f5f5;
          padding: 0 1rem;
          box-shadow: 2px 2px 2px #e3e3e3;
        `}
      >
        <div
          css={css`
            font-size: 1.5rem;
            font-weight: bold;
            color: #3b3b3b;
          `}
        >
          이력서 작성하기
        </div>
        <Button variant="contained">기존 이력서 불러오기</Button>
      </div>
      <div
        css={css`
          height: 100vh;
          margin: 2rem;
        `}
      >
        <div css={contentStyle}>
          <div css={titleStyle}>
            <Typography variant="h5">기본 정보</Typography>
          </div>

          <div
            css={css`
              display: grid;
              grid-template-columns: repeat(2, 1fr); /* 두 개씩 가로로 배치 */
              gap: 1.5rem; /* 필드 사이의 여백 */
              max-width: 800px;
              margin: 2rem auto;
            `}
          >
            <TextField
              css={textFieldStyle}
              label="이름"
              variant="outlined"
              placeholder="이름을 입력하세요"
              required
              value={username}
            />

            <TextField
              css={textFieldStyle}
              label="이메일"
              variant="outlined"
              placeholder="이메일을 입력하세요"
              required
              type="email"
              value={email}
            />

            <TextField
              css={textFieldStyle}
              label="전화 번호"
              variant="outlined"
              placeholder="전화번호를 입력하세요"
              required
              type="tel"
            />

            <TextField
              css={textFieldStyle}
              label="깃허브"
              variant="outlined"
              placeholder="GitHub 링크를 입력하세요"
              required
              value={githubUrl}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      github.com/
                    </InputAdornment>
                  ),
                },
              }}
            />
          </div>
        </div>

        <div css={contentStyle}>
          <div css={titleStyle}>
            <Typography variant="h5">기술 스택</Typography>
          </div>
          <div css={sectionStyle}>
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "1.5rem",
                width: "100%",
              }}
            >
              <TextField
                label="스킬 입력"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                fullWidth
              />
              <Button variant="contained" onClick={handleAddSkill}>
                추가
              </Button>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                width: "100%",
              }}
            >
              {skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  onDelete={() => handleDeleteSkill(skill)}
                  color="primary"
                  style={{ fontSize: "16px" }}
                />
              ))}
            </div>
          </div>
        </div>

        <>
          {sections.map((id) => (
            <CustomSection key={id} />
          ))}
        </>

        <div
          css={css`
            text-align: center;
          `}
        >
          <Button variant="outlined" size="large" onClick={handleAddSection}>
            섹션 추가하기
          </Button>
        </div>
      </div>
    </>
  );
};
