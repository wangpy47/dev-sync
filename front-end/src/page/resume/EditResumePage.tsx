import { css } from "@emotion/react";
import CloseIcon from "@mui/icons-material/Close";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { Fab, Popover } from "@mui/material";
import html2pdf from "html2pdf.js";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ResumeEditorPanel } from "../../components/resume/ResumeEditorPanel";
import { ResumeOptionBar } from "../../components/resume/ResumeOptionBar.tsx";
import { ResumePreviewPanel } from "../../components/resume/ResumePreviewPanel.tsx";
import { SectionOrderManager } from "../../components/resume/SectionOrderManager.tsx";
import { blueGrayStyle } from "../../styles/blueGrayTheme.ts";
import { modernStyle } from "../../styles/modernTheme.ts";
import type { ResumeData } from "../../types/resume.type.ts";

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
  // const gitInfo = location.state;
  const sections = useSelector((state: any) => state.resumeInfo);
  console.log(sections);

  const printRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<"modern" | "blueGray">("modern");

  const selectedStyle = theme === "modern" ? modernStyle : blueGrayStyle;

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

  return (
    <div css={containerStyle}>
      <div css={leftPanelStyle}>
        <ResumeOptionBar
          onDownloadPdf={handleDownloadPdf}
          setTheme={setTheme}
        />
        <ResumeEditorPanel
          sections={sections}
          // setSections={sections}
          // updateSectionData={updateSectionData}
          // removeSection={removeSection}
          // addSection={addSection}
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
              // onReorder={(newOrder: string[]) =>
              //   setSections((prev) => ({ ...prev, order: newOrder }))
              // }
              // onClose={() => setOpen(false)}
            />
          )}
        </Popover>
      </div>
      <div css={rightPanelStyle}>
        {sections && (
          <ResumePreviewPanel
            sections={sections}
            ref={printRef}
            styleTheme={selectedStyle}
          />
        )}
      </div>
    </div>
  );
};
