import { type Dispatch, type SetStateAction } from "react";
import type { ResumeData, CareerTypeSection } from "../../../types/resume.type";
import { SectionWrapper } from "./SectionWrapper";
import { css } from "@emotion/react";
import { TextField, Button, Chip, Typography, Switch } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import {
  gridStyle,
  textFieldStyle,
  skillListStyle,
  dateStyle,
} from "../../../styles/resumeLayerStyle";
import { useLocalSection } from "../../../hooks/useLocalSection";
interface Props {
  section: CareerTypeSection;
  setSections?: Dispatch<SetStateAction<ResumeData>>;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
}

export const CareerSection = ({
  section,
  isEditing,
  setSections,
  onEdit,
  onSave,
}: Props) => {
  const { handleChange, SaveSection, localSection } = useLocalSection(
    section,
    onSave
  );

  return (
    <SectionWrapper
      title="경력"
      isEditing={isEditing}
      onEdit={onEdit}
      onSave={SaveSection}
    >
      {isEditing ? (
        <div
          css={css`
            align-items: center;
            display: flex;
          `}
        >
          <Switch checked={localSection.isCurrent} />
          <Typography>재직중</Typography>
        </div>
      ) : null}

      {/* <div css={sectionBar} /> */}
      {isEditing ? (
        <>
          <div css={gridStyle}>
            <TextField
              multiline
              css={textFieldStyle}
              value={localSection.company || ""}
              onChange={(e) => handleChange("company", e.target.value)}
              placeholder="회사명을 입력하세요"
              label="회사 명"
            />
            <TextField
              multiline
              css={textFieldStyle}
              value={localSection.position || ""}
              onChange={(e) => handleChange("position", e.target.value)}
              label="직무"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="입사년월"
                css={textFieldStyle}
                value={
                  localSection.startDate ? dayjs(localSection.startDate) : null
                }
                onChange={(newValue) => {
                  if (newValue) {
                    const formattedDate = newValue.format("YYYY-MM-DD");
                    handleChange("startDate", formattedDate);
                  }
                }}
              />
              <DatePicker
                label="퇴사년월"
                css={textFieldStyle}
                value={
                  localSection.endDate ? dayjs(localSection.endDate) : null
                }
                onChange={(newValue) => {
                  if (newValue) {
                    const formattedDate = newValue.format("YYYY-MM-DD");
                    handleChange("endDate", formattedDate);
                  }
                }}
              />
            </LocalizationProvider>
          </div>
          <div
            css={css`
              margin: 1.5rem 0;
            `}
          >
            <TextField
              multiline
              label="담당업무"
              css={css`
                width: 100%;
                box-sizing: border-box;
              `}
              value={localSection.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
          <div
            css={css`
              display: flex;
              gap: 1rem;
              width: 100%;
              margin-bottom: 1.5rem;
            `}
          >
            <TextField
              label="스킬"
              // size="small"
              variant="outlined"
              css={css`
                flex: 1;
              `}
            />
            <Button
              variant="outlined"
              size="medium"
              css={css`
                white-space: nowrap;
              `}
            >
              추가
            </Button>
          </div>

          <div css={skillListStyle}>
            {(localSection.technologies || []).map((skill, id) => (
              <Chip
                key={`k-${id}`}
                label={`${skill}`}
                variant="outlined"
                color="primary"
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div
            css={css`
              display: flex;
            `}
          >
            <Typography
              css={css`
                font-weight: bold;
                margin: 0;
                font-size: 1.1rem;
              `}
            >
              {section.company || ""}
            </Typography>
            <Typography css={dateStyle}>{section.startDate}</Typography>
          </div>
          <Typography
            css={css`
              margin-bottom: 1rem;
              font-size: 0.9rem;
              color: #464646;
            `}
          >
            {section.position}
          </Typography>
          <Typography>{section.description || ""}</Typography>
          <div css={skillListStyle}>
            {(section.technologies || []).map((skill, id) => (
              <Chip key={`k-${id}`} label={`${skill}`} variant="outlined" />
            ))}
          </div>
        </>
      )}
    </SectionWrapper>
  );
};
