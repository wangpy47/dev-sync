import type { Dispatch, SetStateAction } from "react";
import type {
  ResumeData,
  ProfileTypeSection,
} from "../../../types/resume.type";
import { SectionWrapper } from "./SectionWrapper";
import { gridStyle, textFieldStyle } from "../../../styles/resumeLayerStyle";
import { TextField, InputAdornment, Typography } from "@mui/material";
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
}

export const ProfileSection = ({
  section,
  isEditing,
  setSections,
  onEdit,
  onSave,
}: Props) => {
  const ProfileFieldInput = ({
    label,
    value,
    type,
    placeholder,
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
        slotProps={
          startAdornmentText
            ? {
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      github.com/
                    </InputAdornment>
                  ),
                },
              }
            : undefined
        }
      />
    );
  };

  return (
    <SectionWrapper
      title="기본 정보"
      isEditing={isEditing}
      onEdit={onEdit}
      onSave={onSave}
    >
      {isEditing ? (
        <>
          <div css={gridStyle}>
            <ProfileFieldInput label="이름" value={section.name || ""} />
            <ProfileFieldInput
              label="이메일"
              type="email"
              value={section.email || ""}
            />
            <ProfileFieldInput
              label="전화번호"
              type="tel"
              value={section.phone_number || ""}
              placeholder="전화번호를 입력하세요"
            />
            <ProfileFieldInput
              value={section.github_url || ""}
              startAdornmentText="github.com/"
            />
            <ProfileFieldInput
              label="blog"
              value={section.blog_url || ""}
              placeholder="블로그 주소를 입력하세요"
            />
            <ProfileFieldInput
              label="학력"
              value={section.education || ""}
              placeholder="학력을 입력하세요"
            />
          </div>
          <ProfileFieldInput
            label="주소"
            type="address"
            value={section.address || ""}
          />
        </>
      ) : (
        <>
          <div css={gridStyle}>
            <Typography>이름 : {section.name || "-"}</Typography>
            <Typography>이메일 : {section.email || "-"}</Typography>
            <Typography>전화번호 : {section.phone_number || ""}</Typography>
            <Typography>gitHub : {section.github_url || ""}</Typography>
            <Typography>blog : {section.blog_url || ""}</Typography>
            <Typography>학력 : {section.education || ""}</Typography>
            <Typography>집 주소 : {section.address || ""}</Typography>
          </div>
        </>
      )}
    </SectionWrapper>
  );
};
