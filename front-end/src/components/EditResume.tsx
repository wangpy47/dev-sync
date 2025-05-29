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
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { GitResume } from "./GitResume";
import GitRepoList from "./gitRepoList/GitRepoList";
import { ThreeCanvas } from "./ThreeCanvas";
import { MainCanvas } from "./MainCanvas";

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

interface Project {
  name: string;
  description: string;
  outcomes: string[];
  role: string;
}

interface GitInfo {
  introduction: {
    description: string;
  };
  projects: Project[];
  skills: {
    knowledgeable: string[];
    strengths: string[];
  };
}

export const EditResume = () => {
  const location = useLocation();
  const gitData = location.state;

  console.log(gitData);
  // const [gitInfo, setGitInfo] = useState<GitInfo | undefined>();

  return (
    <div css={containerStyle}>
      <div css={leftPanelStyle}>
        <GitResume />
      </div>
      <div css={rightPanelStyle}>
        {gitData && <MainCanvas gitInfo={gitData} />}
      </div>
    </div>
  );
};
