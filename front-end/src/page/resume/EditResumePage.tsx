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
import {
  Fab,
  Fade,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Popover,
  Popper,
  Typography,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
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

// interface BasicInfoSection {
//   type: "basicInfo";
//   name: string;
//   email: string;
//   githubUrl: string;
//   phoneNumber: number;
// }

// interface SkillsSection {
//   type: "skills";
//   familiar: string[];
//   strengths: string[];
// }

// interface ProjectsSection {
//   type: "projects";
//   items: {
//     name: string;
//     role: string;
//     description: string;
//     outcomes: { task: string; result: string }[];
//   }[];
// }

// interface IntroductionSection {
//   type: "introduction";
//   headline: string;
//   description: string;
// }

// interface CustomSection {
//   type: "custom";
//   title: string;
//   content: string;
// }

// // 🔹 유니언 타입으로 묶기
// type SectionEntity =
//   | BasicInfoSection
//   | SkillsSection
//   | ProjectsSection
//   | IntroductionSection
//   | CustomSection;

// interface ResumeData {
//   order: string[];
//   entities: Record<string, SectionEntity>;
// }

export const EditResumePage = () => {
  const userData = useSelector((state: any) => state.login.loginInfo);
  const location = useLocation();
  const gitInfo = location.state;
  const printRef = useRef<HTMLDivElement>(null);
  console.log("-----userData", userData);
  console.log("-----gitInfo", gitInfo);

  const createSections: ResumeData = {
    order: [
      "basicInfo",
      "skills",
      "custom-1", // 첫 번째 커스텀
      "projects",
      "custom-2", // 두 번째 커스텀
      "introduction",
    ],
    entities: {
      basicInfo: {
        type: "basicInfo",
        name: userData.name || "",
        email: userData.email || "",
        githubUrl: userData.githubUrl || "",
        phoneNumber: userData.phoneNumber,
      },
      skills: {
        type: "skills",
        familiar: gitInfo.skills?.familiar || [],
        strengths: gitInfo.skills?.strengths || [],
      },
      projects: { type: "projects", items: gitInfo.projects },
      introduction: {
        type: "introduction",
        headline: gitInfo.introduction.headline || "",
        description: gitInfo.introduction.description || "",
      },
      "custom-1": {
        type: "custom",
        title: "수상 경력",
        content: "2024 교내 해커톤 우승",
      },
      "custom-2": {
        type: "custom",
        title: "봉사 활동",
        content: "코딩 멘토 100시간",
      },
    },
  } as const;
  console.log("createSEction----------", createSections);
  const [sections, setSections] = useState(createSections);

  // 섹션 데이터 업데이트 함수
  const updateSectionData = (type: string, newData: any) => {};

  // 섹션 순서 변경 함수 (위/아래 이동)
  const moveSection = (index, direction) => {};

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
          moveSection={moveSection}
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
          <FormatListNumberedIcon />
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
