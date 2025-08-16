import type { Dispatch, SetStateAction } from "react";
import type {
  ResumeData,
  IntroductionTypeSection,
} from "../../../types/resume.type";
import { SectionWrapper } from "./SectionWrapper";
import {
  textareaStyle,
  titleTextFieldStyle,
} from "../../../styles/resumeLayerStyle";
import { TextField, Typography, css } from "@mui/material";

interface Props {
  section: IntroductionTypeSection;
  setSections?: Dispatch<SetStateAction<ResumeData>>;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
}

interface Props {
  label?: string;
  value?: string;
  type?: string;
  placeholder?: string;
  startAdornmentText?: string;
}

export const IntroductionSection = ({
  section,
  isEditing,
  setSections,
  onEdit,
  onSave,
}: Props) => {
  return (
    <SectionWrapper
      title="자기소개"
      isEditing={isEditing}
      onEdit={onEdit}
      onSave={onSave}
    >
      {isEditing ? (
        <>
          <TextField
            multiline
            css={titleTextFieldStyle}
            value={section.headline || ""}
            placeholder="제목을 입력하세요"
          />
          <TextField
            multiline
            css={textareaStyle}
            value={section.description || ""}
            placeholder="자기소개를 입력하세요"
          />
        </>
      ) : (
        <>
          <Typography
            css={css`
              margin-bottom: 1rem;
            `}
          >
            {section.headline || ""}
          </Typography>
          <Typography>{section.description || ""}</Typography>
        </>
      )}
    </SectionWrapper>
  );
};
