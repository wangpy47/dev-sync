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
import { useLocalSection } from "../../../hooks/useLocalSection";
interface Props {
  section: AchievementTypeSection;
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

export const AchievementSection = ({
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
      title="자격증 및 수상내역"
      isEditing={isEditing}
      onEdit={onEdit}
      onSave={SaveSection}
    >
      {isEditing ? (
        <>
          <div css={gridStyle}>
            <TextField
              label="항목명"
              value={localSection.title}
              onChange={(e) => handleChange("title", e.target.value)}
              fullWidth
              size="small"
              margin="dense"
            />
            <TextField
              label="발행기관"
              value={localSection.organization}
              onChange={(e) => handleChange("organization", e.target.value)}
              fullWidth
              size="small"
              margin="dense"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="취득일"
                value={localSection.date ? dayjs(localSection.date) : null}
                onChange={(newValue) => {
                  if (newValue) {
                    const formattedDate = newValue.format("YYYY-MM-DD");
                    handleChange("date", formattedDate);
                  }
                }}
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
            value={localSection.description}
            onChange={(e) => handleChange("description", e.target.value)}
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
