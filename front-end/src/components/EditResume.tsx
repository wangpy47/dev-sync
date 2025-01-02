/** @jsxImportSource @emotion/react */
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { css } from "@emotion/react";
import { PdfDocument } from "./PdfDocument";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  LinearProgress,
  Typography,
} from "@mui/material";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { GitResume } from "./GitResume";
import GitRepoList from "./gitRepoList/GitRepoList";

const containerStyle = css`
  display: flex;
  flex-direction: row;
  height: 100vh;
  overflow: hidden;
  width: 100vw;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const leftPanelStyle = css`
  flex: 1;
  overflow-y: auto;
  border: 2px solid #e8e7e7;
  box-shadow: 2px 2px 2px #e9e9e9a5;
  border-radius: 4px;
  margin: 9px;
  &:first-of-type {
    margin-right: 5px;
  }

  @media (max-width: 768px) {
    &:first-of-type {
      margin-right: 0;
      margin-bottom: 5px;
    }
  }
`;

const rightPanelStyle = css`
  flex: 1;
  overflow-y: hidden;
  border: 2px solid #e8e7e7;
  box-shadow: 2px 2px 2px #e9e9e9a5;
  border-radius: 4px;
  margin: 9px;
  &:first-of-type {
    margin-right: 5px;
  }

  @media (max-width: 768px) {
    &:first-of-type {
      margin-right: 0;
      margin-bottom: 5px;
    }
  }
`;

const pdfViewerStyle = css`
  width: 100%;
  height: 100%;
  border: none;
  color: #853434;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const btnStyle = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 35%;
  margin: 3rem auto;
`;

const titleStyle = css`
  font-size: 2.7rem;
  font-weight: bold;
  color: #5a5a5a;
  margin: 7rem 1.5rem 1.4rem 0rem;
  text-align: center;
`;

const subtitleStyle = css`
  font-size: 0.9rem;
  color: #636363; /* text.secondary 색상 */
  font-weight: 600;
  margin-bottom: 10px;
  text-align: center;
`;

export const EditResume = () => {
  const navigate = useNavigate();
  const [gitBtnClick, setGitBtnClick] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [repoData, setRepoData] = useState<{ name: string }[]>([]);
  const [selectedRepos, setSelectedRepos] = useState<
    { name: string; selected: boolean }[]
  >([]);
  const [gitInfo, setGitInfo] = useState("");

  const handleSelectionChange = useCallback(
    (updatedSelection: { name: string; selected: boolean; commits: { message: string; description: string} }[]) => {
      setSelectedRepos(updatedSelection);
    },
    []
  );

  const updateUserData = async () => {
    setRepoData([]); // 레포지토리 배열 초기화
    setIsLoading(true);
    const response = await fetch("http://localhost:3000/resume/get-user-repo", {
      method: "GET",
      credentials: "include", // 세션 쿠키 포함
    });

    if (response.ok) {
      const data = await response.json();
      setRepoData(data); // 받아온 배열 저
      setIsLoading(false);
      // await generateResume(profileData);
    } else {
      const error = await response.json();
      console.error("Update failed:", error);
    }
  };

  const generateResume = async (repoData: any[]) => {
    const filteredRepos = repoData.filter((repo) => repo.selected);

  setIsLoading(true);
  const profileData = filteredRepos
    .map((repo) => {
      const commitDetails = repo.commits
        .map(
          (commit, index) =>
            `- ${commit.message}\n  Description: ${
              commit.description || "No additional details provided"
            }`
        )
        .join("\n");

      return `Repository: ${repo.name}\nDescription: ${
        repo.description || "N/A"
      }\nLanguage: ${repo.language || "N/A"}\nSize: ${
        repo.size
      } KB\nStars: ${repo.stargazers_count}\nForks: ${
        repo.forks_count
      }\nRecent Commit Details:\n${commitDetails}\n`;
    })
    .join("\n");

    try {
      const response = await fetch("http://localhost:3000/resume/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ profileData }),
      });
  
      const result = await response.json();
      console.log(result);
      setGitBtnClick(true);
    } catch (error) {
      console.error("Error generating resume:", error);
    }
    setIsLoading(false);
  };
  

  const changeNavigate = () => {
    navigate("/");
  };

  return (
    <div css={containerStyle}>
      <div css={leftPanelStyle}>
        {!gitBtnClick ? (
          <>
            {/* 버튼 및 상태 표시 */}
            <div>
              <div css={titleStyle}>🚀 Git과 연동하여 포트폴리오를 작성해보세요.</div>
              <p css={subtitleStyle}>
                Git 정보를 가져와 자동으로 포트폴리오를 작성하고 PDF로 저장할 수 있어요.
              </p>
            </div>
            {!isLoading ? (
              <div css={btnStyle}>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  onClick={updateUserData}
                >
                  Git 정보 가져오기
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  color="primary"
                  onClick={changeNavigate}
                >
                  돌아가기
                </Button>
              </div>
            ) : (
              <div
                css={css`
                  display: flex;
                  justify-content: center;
                  margin-top: 15%;
                `}
              >
                <CircularProgress size={60} />
              </div>
            )}
  
            {/* GitRepoList 컴포넌트 */}
            {repoData.length > 0 && (
              <div
                css={css`
                  padding: 0px 10px;
                `}
              >
                <GitRepoList
                  result={repoData}
                  onSelectionChange={handleSelectionChange}
                />
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  onClick={() => {
                    generateResume(selectedRepos);
                  }}
                >
                  이력서 만들기
                </Button>
              </div>
            )}
          </>
        ) : (
          <GitResume />
        )}
      </div>
      <div css={rightPanelStyle}>
        <PDFViewer css={pdfViewerStyle}>
          <PdfDocument />
        </PDFViewer>
      </div>
    </div>
  );
};
