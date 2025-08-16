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
  sectionBar,
} from "../../../styles/resumeLayerStyle";
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
  return (
    <SectionWrapper
      title="경력"
      isEditing={isEditing}
      onEdit={onEdit}
      onSave={onSave}
    >
      {isEditing ? (
        <div
          css={css`
            align-items: center;
            display: flex;
          `}
        >
          <Switch checked={section.is_current} />
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
              value={section.company || ""}
              placeholder="회사명을 입력하세요"
              label="회사 명"
            />
            <TextField
              multiline
              css={textFieldStyle}
              value={section.position || ""}
              label="직무"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="입사년월"
                css={textFieldStyle}
                value={dayjs(section.start_date) || ""}
              />
              <DatePicker
                label="퇴사년월"
                css={textFieldStyle}
                value={dayjs(section.end_date) || ""}
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
              value={section.description || ""}
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
            {(section.technologies || []).map((skill, id) => (
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
            <Typography css={dateStyle}>{section.start_date}</Typography>
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
