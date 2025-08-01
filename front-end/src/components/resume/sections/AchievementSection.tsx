import type { Dispatch, SetStateAction } from "react";
import type {
  ResumeData,
  AchievementTypeSection,
} from "../../../types/resume.type";
import { SectionWrapper } from "./SectionWrapper";
import { gridStyle, textareaStyle } from "../../../styles/resumeLayerStyle";
import { TextField, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
interface Props {
  section: AchievementTypeSection;
  setSections: Dispatch<SetStateAction<ResumeData>>;
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

export const AchievementSection = ({
  section,
  isEditing,
  setSections,
  onEdit,
  onSave,
}: Props) => {
  return (
    <SectionWrapper
      title="자격증 및 수상내역"
      isEditing={isEditing}
      onEdit={onEdit}
      onSave={onSave}
    >
      {isEditing ? (
        <>
          <div css={gridStyle}>
            <TextField
              label="항목명"
              value={section.title}
              fullWidth
              size="small"
              margin="dense"
            />
            <TextField
              label="발행기관"
              value={section.organization}
              fullWidth
              size="small"
              margin="dense"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="취득일"
                value={dayjs(section.date)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                    margin: "dense",
                  },
                }}
              />
            </LocalizationProvider>
          </div>
          <TextField
            label="설명"
            rows="4"
            // value={section.description}
            css={textareaStyle}
            multiline
          />
        </>
      ) : (
        <>
          <Typography>{section.title}</Typography>
          <Typography> {section.organization}</Typography>

          <Typography>{section.date}</Typography>
          <Typography> {section.description}</Typography>
        </>
      )}
    </SectionWrapper>
  );
};
