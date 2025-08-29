import type { Dispatch, SetStateAction } from "react";
import type {
    ResumeData,
    CustomTypeSection,
} from "../../../types/resume.type";
import { SectionWrapper } from "./SectionWrapper";
import {
    textareaStyle,
    titleTextFieldStyle,
} from "../../../styles/resumeLayerStyle";
import { TextField, Typography, css } from "@mui/material";

interface Props {
    section: CustomTypeSection;
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

export const CustomSection = ({
    section,
    isEditing,
    onEdit,
    onSave,
}: Props) => {


    return (
        <SectionWrapper
            title={
                isEditing ? (
                    <TextField
                        css={css`  width: 100%; height: 100%; overflow: auto;`}
                        value={section.title || ""}
                        placeholder="섹션 제목을 입력하세요"
                        fullWidth
                    />
                ) : (
                    <Typography variant="h5">
                        {section.title || "사용자 정의 섹션"}
                    </Typography>
                )
            }
            isEditing={isEditing}
            onEdit={onEdit}
            onSave={onSave}
        >
            {
                isEditing ? (
                    <>
                        <TextField
                            multiline
                            css={textareaStyle}
                            value={section.description || ""}
                            placeholder="설명을 입력하세요"
                            minRows={4}
                        />
                    </>
                ) : (
                    <>
                        <Typography>{section.description || ""}</Typography>
                    </>
                )}
        </SectionWrapper >
    );
};
