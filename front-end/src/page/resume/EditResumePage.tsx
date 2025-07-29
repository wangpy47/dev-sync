/** @jsxImportSource @emotion/react */
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { ResumePreviewPanel } from "../../components/resume/ResumePreviewPanel.tsx";
import { ResumeEditorPanel } from "../../components/resume/ResumeEditorPanel";
import { useLocation } from "react-router-dom";
import { css } from "@emotion/react";
import { ResumeOptionBar } from "../../components/resume/ResumeOptionBar.tsx";
import { nanoid } from "@reduxjs/toolkit";
import html2pdf from "html2pdf.js";
import { Fab, Popover } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { SectionOrderManager } from "../../components/resume/SectionOrderManager.tsx";
import type { ResumeData } from "../../types/resume.type.ts";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
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
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  border: 2px solid #e8e7e7;
  box-shadow: 2px 2px 2px #e9e9e9a5;
  border-radius: 4px;
  margin: 9px;

  @media (max-width: 768px) {
    &:first-of-type {
      margin-right: 0;
      margin-bottom: 5px;
    }
  }

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background: #dedddd;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a0a0a0;
  }
`;

const rightPanelStyle = css`
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

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background: #dedddd;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a0a0a0;
  }
`;

export const EditResumePage = () => {
  const userData = useSelector((state: any) => state.login.loginInfo);
  const location = useLocation();
  const gitInfo = location.state;
  const printRef = useRef<HTMLDivElement>(null);
  console.log("-----userData", userData);
  console.log("-----gitInfo", gitInfo);

  const createSections: ResumeData = {
    id: "123123455",
    title: "자소서1",

    order: ["123", "1234", "12345", "123456", "1234567", "12345678"],
    entities: [
      {
        id: "123",
        type: "profile",
        name: userData.name || "",
        email: userData.email || "",
        github_url: userData.githubUrl || "",
        blog_url: userData.blogUrl || "",
        phone_number: userData.phoneNumber,
        address: "경기도 화성시",
        education: "한신대학교",
      },
      {
        id: "1234",
        type: "skills",
        familiar: gitInfo.skills?.familiar || [],
        strengths: gitInfo.skills?.strengths || [],
      },
      {
        id: "12345",
        type: "career",
        company: "OpenAI Korea",
        position: "Frontend Developer",
        start_date: "2022-07-01",
        end_date: "2024-12-31",
        description:
          "React, TypeScript, Electron 기반 편집기 개발 및 유지보수. 협업툴, 에디터, Three.js 등 다양한 기능 구현.",
        is_current: false,
        technologies: ["React", "TypeScript", "Electron", "Three.js", "NestJS"],
      },
      {
        id: "123456",
        type: "achievement",
        title: "정보처리기사",
        organization: "한국산업인력공단",
        date: "2023-06-15",
        description: "필기 및 실기 시험 모두 합격",
      },
      {
        id: "1234567",
        type: "project",
        description: gitInfo.description || "",
        start_date: "2022-07-01",
        end_date: "2024-12-31",
        technologies: ["React", "TypeScript", "Electron", "Three.js", "NestJS"],
      },
      {
        id: "1234512345678",
        type: "outcomes",
        task: "한 일1",
        result: "성과1",
        project: "1234567",
      },
      {
        id: "12345123456789",
        type: "outcomes",
        task: "한 일2",
        result: "성과2",
        project: "1234567",
      },

      {
        id: "1234567890",
        type: "introduction",
        headline: gitInfo.introduction?.headline || "",
        description: gitInfo.introduction?.description || "",
      },
      {
        id: "12345678901",
        type: "custom",
        title: "수상 경력",
        content: "2024 교내 해커톤 우승",
      },
      {
        id: "12345678912",
        type: "custom",
        title: "봉사 활동",
        content: "코딩 멘토 100시간",
      },
    ],
  } as const;
  console.log("createSEction----------", createSections);
  const [sections, setSections] = useState(createSections);

  // 섹션 데이터 업데이트 함수
  const updateSectionData = (type: string, newData: any) => {};

  // 섹션 삭제 함수 (위/아래 이동)
  const removeSection = (index, direction) => {};

  // 섹션 추가 함수 예시 (custom 타입)
  const addSection = () => {
    setSections((prev) => {
      const id = nanoid(10); // 예: "f13da"
      return {
        order: [...prev.order, id],
        entities: {
          ...prev.entities,
          [id]: {
            type: "custom",
            title: "새 섹션",
            content: "내용을 입력하세요.",
          },
        },
      };
    });
  };

  const handleDownloadPdf = () => {
    if (!printRef.current) return;

    const element = printRef.current;

    const opt = {
      margin: 10, // mm
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        logging: true,
        dpi: 192,
        letterRendering: true,
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .catch((err: any) => console.error(err));
  };

  // console.log(gitInfo);

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  console.log(anchorRef.current);
  // console.log(createSections.order);

  return (
    <div css={containerStyle}>
      <div css={leftPanelStyle}>
        <ResumeOptionBar onDownloadPdf={handleDownloadPdf} />
        <ResumeEditorPanel
          sections={sections}
          updateSectionData={updateSectionData}
          removeSection={removeSection}
          addSection={addSection}
        />
        <Fab
          ref={anchorRef}
          size="small"
          color="info"
          aria-label="add"
          css={css`
            position: fixed;
            left: 15px;
            bottom: 20px;
            z-index: 100;
          `}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <CloseIcon /> : <FormatListNumberedIcon />}
        </Fab>

        <Popover
          open={open}
          anchorEl={anchorRef.current}
          onClose={() => setOpen(false)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          sx={{
            mt: -2,
          }}
        >
          {open && (
            <SectionOrderManager
              sections={sections}
              onReorder={(newOrder: string[]) =>
                setSections((prev) => ({ ...prev, order: newOrder }))
              }
              onClose={() => setOpen(false)}
            />
          )}
        </Popover>
      </div>
      <div css={rightPanelStyle}>
        {gitInfo && <ResumePreviewPanel sections={sections} ref={printRef} />}
      </div>
    </div>
  );
};
