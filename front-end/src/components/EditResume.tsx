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
import { useEffect, useState } from "react";
import { GitResume } from "./GitResume";

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

const panelStyle = css`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  border: 2px solid #ddd;
  border-radius: 8px;
  margin: 10px;

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
  height: calc(100% - 20px);
  border: none;
  color: #853434;
  border-radius: 10px;
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

  const updateUserData = async () => {
    setIsLoading(true);
    const response = await fetch("http://localhost:3000/resume/get-user-repo", {
      method: "GET",
      credentials: "include", // 세션 쿠키 포함
    });

    if (response.ok) {
      const result = await response.json();

      // result 객체 배열을 텍스트로 변환하여 자소서 생성을 위한 요약 데이터로 사용
      const profileData = result
        .map(
          (repo) =>
            `Repository: ${repo.name}\nDescription: ${
              repo.description || "N/A"
            }\nLanguage: ${repo.language || "N/A"}\nSize: ${
              repo.size
            } KB\nStars: ${repo.stargazers_count}\nForks: ${
              repo.forks_count
            }\nRecent Commit Messages: ${repo.recent_commit_messages.join(
              ", "
            )}\n`
        )
        .join("\n");

      // console.log(profileData)
      await generateResume(profileData);
    } else {
      const error = await response.json();
      console.error("Update failed:", error);
    }
  };

  const generateResume = async (profileData: object[]) => {
    try {
      const response = await fetch("http://localhost:3000/resume/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ profileData }),
      });

      const result = await response.json();
      console.log(result.resume);
      setGitBtnClick(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error generating resume:", error);
    }
  };

  const changeNavigate = () => {
    navigate("/");
  };

  return (
    <div css={containerStyle}>
      {/* 왼쪽 입력 영역 */}
      <div css={panelStyle}>
        {!gitBtnClick ? (
          <>
            <div>
              <div css={titleStyle}>
                🚀 Git과 연동하여 이력서를 작성해보세요
              </div>
              <p css={subtitleStyle}>
                Git 정보를 가져와 자동으로 이력서를 작성하고 PDF로 저장할 수
                있어요.
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
          </>
        ) : (
          <GitResume />
        )}
      </div>
      {/* <div css={panelStyle}>
        <h2>git과 연동하여 이력서를 작성 해보세요.</h2>
        <Button variant="contained" onClick={updateUserData}>
          git 정보 가져오기
        </Button>
        <Button variant="outlined" onClick={changeNavigate}>
          {" "}
          돌아가기{" "}
        </Button>

        <Outlet />
      </div> */}

      {/* 오른쪽 PDF 미리보기 영역 */}
      <div css={panelStyle}>
        <PDFViewer css={pdfViewerStyle}>
          <PdfDocument />
        </PDFViewer>
        <div
          css={css`
            margin-top: 10px;
            text-align: center;
          `}
        >
          {/* <PDFDownloadLink document={<PdfDocument />} fileName="resume.pdf">
            {({ loading}) => {
              if (loading) {
                return (
                  <Button variant="contained" color="primary">
                    Preparing...
                  </Button>
                );
              }
              return (
                <Button variant="contained" color="secondary">
                  Download Resume
                </Button>
              );
            }}
          </PDFDownloadLink> */}
        </div>
      </div>
    </div>
  );
};
