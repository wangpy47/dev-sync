import { useState, type Dispatch, type SetStateAction } from "react";
import type { ResumeData, SkillsTypeSection } from "../../../types/resume.type";
import { SectionWrapper } from "./SectionWrapper";
import { css } from "@emotion/react";
import { Select, MenuItem, TextField, Button, Chip } from "@mui/material";
import { rowStyle, skillListStyle } from "../../../styles/resumeLayerStyle";
interface Props {
  section: SkillsTypeSection;
  setSections: Dispatch<SetStateAction<ResumeData>>;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
}

export const SkillsSection = ({
  section,
  isEditing,
  setSections,
  onEdit,
  onSave,
}: Props) => {
  const [selectSkill, setSelectSkill] = useState<string>("knowledgeable");

  const familiar = section;
  console.log(familiar);
  // const strength =
  return (
    <SectionWrapper
      title="스킬"
      isEditing={isEditing}
      onEdit={onEdit}
      onSave={onSave}
    >
      {isEditing ? (
        <div css={rowStyle}>
          <Select
            size="small"
            value={selectSkill}
            onChange={(e) => setSelectSkill(e.target.value)}
          >
            <MenuItem value="familiar">기초</MenuItem>
            <MenuItem value="strengths">강점</MenuItem>
          </Select>
          <TextField
            label="스킬 입력"
            size="small"
            css={css`
              flex: 1;
            `}
          />
          <Button
            variant="outlined"
            size="large"
            css={css`
              white-space: nowrap;
            `}
          >
            추가
          </Button>
        </div>
      ) : null}
      {/* 스킬 리스트 (원형 UI) */}
      <div css={skillListStyle}>
        {(section.familiar || []).map((skill, id) => (
          <Chip key={`k-${id}`} label={`(기초) ${skill}`} variant="outlined" />
        ))}
        {(section.strengths || []).map((skill, id) => (
          <Chip
            key={`s-${id}`}
            label={`(강점) ${skill}`}
            color="primary"
            variant="outlined"
          />
        ))}
      </div>
    </SectionWrapper>
  );
};
