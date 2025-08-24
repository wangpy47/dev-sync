import type { Dispatch, SetStateAction } from "react";
import type {
  ResumeData,
  ProjectsTypeSection,
} from "../../../types/resume.type";
import { SectionWrapper } from "./SectionWrapper";
import { sectionBar } from "../../../styles/resumeLayerStyle";
import { TextField, Typography, css } from "@mui/material";

interface Props {
  section: ProjectsTypeSection;
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

export const ProjectsSection = ({
  section,
  isEditing,
  setSections,
  onEdit,
  onSave,
}: Props) => {
  console.log(section)
  return (
    <SectionWrapper
      title="프로젝트"
      isEditing={isEditing}
      onEdit={onEdit}
      onSave={onSave}
    >
      {section.items.map((project) => (
        <div key={project.id} css={{ marginBottom: "2rem" }}>
          {isEditing ? (
            <section
              css={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                key={project.id}
                css={{
                  // background: "#fdfdfd",
                  borderRadius: "12px",
                  border: "1px solid #d0d0d0",
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div
                  css={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  <TextField
                    label="프로젝트명"
                    value={project.name}
                    fullWidth
                    size="small"
                    margin="dense"
                  />
                  <TextField
                    label="사용 기술"
                    value={project.skills.join(", ")}
                    fullWidth
                    size="small"
                    margin="dense"
                    multiline
                    minRows={2}
                    placeholder="예: React, TypeScript, NestJS"
                  />
                </div>
                <div
                  css={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  <TextField
                    label="시작일"
                    value={project.startDate}
                    fullWidth
                    size="small"
                    margin="dense"
                  />
                  <TextField
                    label="종료일"
                    value={project.endDate}
                    fullWidth
                    size="small"
                    margin="dense"
                  />
                </div>
                <TextField
                  label="설명"
                  value={project.description}
                  fullWidth
                  size="small"
                  margin="dense"
                  multiline
                  minRows={3}
                />
                {project.outcomes.length > 0 && (
                  <div
                    css={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                      // border: "2px solid red",
                    }}
                  >
                    <Typography
                      css={{
                        fontWeight: 600,
                        fontSize: "1.1rem",
                        color: "#444",
                      }}
                    >
                      관련 성과
                    </Typography>

                    {project.outcomes.map((outcome) => (
                      <div
                        key={outcome.id}
                        css={{
                          // background: "#fafafa",
                          borderRadius: "8px",
                          padding: "1rem",
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.8rem",
                          boxShadow: "inset 0 0 4px rgba(0,0,0,0.05)",
                        }}
                      >
                        <TextField
                          label="한 일"
                          value={outcome.task}
                          fullWidth
                          size="small"
                          margin="dense"
                          multiline
                          minRows={2}
                        />
                        <TextField
                          label="성과"
                          value={outcome.result}
                          fullWidth
                          size="small"
                          margin="dense"
                          multiline
                          minRows={3}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          ) : (
            <>
              <Typography css={{ fontWeight: "bold" }}>
                {project.name}
              </Typography>
              <Typography>설명: {project.description}</Typography>
              <Typography>
                기간: {project.startDate} ~ {project.endDate}
              </Typography>
              <Typography>사용 기술: {project.skills.join(", ")}</Typography>

              {project.outcomes.length > 0 && (
                <div css={{ marginTop: "1rem" }}>
                  <Typography
                    css={css`
                      font-weight: bold;
                      font-size: 1.1rem;
                    `}
                  >
                    관련 성과
                  </Typography>
                  {project.outcomes.map((outcome) => (
                    <div key={outcome.id} css={{ marginBottom: "0.5rem" }}>
                      <Typography>• 한 일: {outcome.task}</Typography>
                      <Typography>→ 성과: {outcome.result}</Typography>
                    </div>
                  ))}
                </div>
              )}
              <div css={sectionBar} />
            </>
          )}
        </div>
      ))}
    </SectionWrapper>
  );
};
