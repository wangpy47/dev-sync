import type { Dispatch, SetStateAction } from "react";
import type {
  ResumeData,
  ProfileTypeSection,
} from "../../../types/resume.type";
import { SectionWrapper } from "./SectionWrapper";
import { gridStyle, textFieldStyle } from "../../../styles/resumeLayerStyle";
import { TextField, InputAdornment, Typography } from "@mui/material";
import { useLocalSection } from "../../../hooks/useLocalSection";

interface Props {
  section: ProfileTypeSection;
  setSections?: Dispatch<SetStateAction<ResumeData>>;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
}

interface TextFieldProps {
  label?: string;
  value?: string;
  type?: string;
  placeholder?: string;
  startAdornmentText?: string;
  onChange?: (value: string) => void;
}
const ProfileFieldInput = ({
  label,
  value,
  type,
  placeholder,
  onChange,
  startAdornmentText,
}: TextFieldProps) => {
  return (
    <TextField
      css={textFieldStyle}
      label={label}
      type={type}
      variant="outlined"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange?.(e.target.value)}
      slotProps={
        startAdornmentText
          ? {
              input: {
                startAdornment: (
                  <InputAdornment position="start">github.com/</InputAdornment>
                ),
              },
            }
          : undefined
      }
    />
  );
};

export const ProfileSection = ({
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
      title="기본 정보"
      isEditing={isEditing}
      onEdit={onEdit}
      onSave={SaveSection}
    >
      {isEditing ? (
        <>
          <div css={gridStyle}>
            <ProfileFieldInput
              label="이름"
              value={localSection.name || ""}
              onChange={(v) => {
                handleChange("name", v);
              }}
            />
            <ProfileFieldInput
              label="이메일"
              type="email"
              value={localSection.email || ""}
              onChange={(v) => {
                handleChange("email", v);
              }}
            />
            <ProfileFieldInput
              label="전화번호"
              type="tel"
              value={localSection.phoneNumber || ""}
              onChange={(v) => {
                handleChange("phoneNumber", v);
              }}
              placeholder="전화번호를 입력하세요"
            />
            <ProfileFieldInput
              value={localSection.githubUrl || ""}
              onChange={(v) => {
                handleChange("githubUrl", v);
              }}
              startAdornmentText="github.com/"
            />
            <ProfileFieldInput
              label="blog"
              value={localSection.blogUrl || ""}
              onChange={(v) => {
                handleChange("blogUrl", v);
              }}
              placeholder="블로그 주소를 입력하세요"
            />
            <ProfileFieldInput
              label="학력"
              value={localSection.education || ""}
              onChange={(v) => {
                handleChange("education", v);
              }}
              placeholder="학력을 입력하세요"
            />
          </div>
          <ProfileFieldInput
            label="주소"
            type="address"
            value={localSection.address || ""}
            onChange={(v) => {
              handleChange("address", v);
            }}
          />
        </>
      ) : (
        <>
          <div css={gridStyle}>
            <Typography>이름 : {section.name || "-"}</Typography>
            <Typography>이메일 : {section.email || "-"}</Typography>
            <Typography>전화번호 : {section.phoneNumber || ""}</Typography>
            <Typography>gitHub : {section.githubUrl || ""}</Typography>
            <Typography>blog : {section.blogUrl || ""}</Typography>
            <Typography>학력 : {section.education || ""}</Typography>
            <Typography>집 주소 : {section.address || ""}</Typography>
          </div>
        </>
      )}
    </SectionWrapper>
  );
};
