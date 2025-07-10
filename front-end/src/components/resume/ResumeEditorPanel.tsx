/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, type Key } from "react";
import {
  Button,
  TextField,
  Typography,
  InputAdornment,
  Select,
  MenuItem,
  Chip,
  Fab,
} from "@mui/material";
import type { ResumeData } from "../../types/resume.type";

const containerStyle = css`
  height: 100vh;
  margin: 2rem;
`;

const contentStyle = css`
  border: 1.5px solid #dbdbdb;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const titleStyle = css`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const gridStyle = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  max-width: 800px;
  margin: 2rem auto;
`;

const textFieldStyle = css`
  width: 100%;
`;

const textareaStyle = css`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const titleTextFieldStyle = css`
  width: 100%;
  height: 100%;
  overflow: auto;
  margin-bottom: 1rem;
`;

const rowStyle = css`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 16px;
`;

const skillListStyle = css`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

interface GitResumeProps {
  sections: ResumeData;
  // updateSectionData: (id: Key, newData: SectionData) => void;
  moveSection: (index: number, direction: "up" | "down") => void;
  addSection: () => void;
}

export const ResumeEditorPanel = ({
  sections,
  updateSectionData,
  removeSection,
  addSection,
}: GitResumeProps) => {
  const [isEditing, setEditing] = useState<Record<string, boolean>>({});
  const [selectSkill, setSelectSkill] = useState<string>("knowledgeable");

  const handleEdit = (i: string) => {
    console.log(i);
    setEditing((prev) => ({ ...prev, [i]: true }));
  };

  const handleSave = (i: string) => {
    console.log(i, isEditing);
    setEditing((prev) => ({ ...prev, [i]: false }));
  };

  const EditSaveButton = ({
    isEditing,
    editId,
  }: {
    isEditing: boolean;
    editId: string;
  }) => (
    <div
      css={css`
        display: flex;
        margin-top: 2rem;
        justify-content: space-between;
      `}
    >
      {isEditing && <Button variant="outlined"> 삭제</Button>}
      <Button
        css={css`
          margin-left: auto;
        `}
        variant="contained"
        onClick={
          isEditing
            ? () => {
                handleSave(editId);
              }
            : () => {
                handleEdit(editId);
              }
        }
      >
        {isEditing ? "저장" : "수정"}
      </Button>
    </div>
  );

  //두개로분리
  const { order, entities } = sections;

  return (
    <div css={containerStyle}>
      {order.map((id) => {
        const section = entities[id];
        switch (section.type) {
          case "basicInfo":
            return (
              <div key={id} css={contentStyle}>
                <Typography css={titleStyle} variant="h5">
                  기본 정보
                </Typography>
                {isEditing[id] ? (
                  <>
                    <div css={gridStyle}>
                      <TextField
                        css={textFieldStyle}
                        label="이름"
                        variant="outlined"
                        value={section.name || ""}
                      />
                      <TextField
                        css={textFieldStyle}
                        label="이메일"
                        type="email"
                        variant="outlined"
                        value={section.email || ""}
                      />
                      <TextField
                        css={textFieldStyle}
                        label="전화번호"
                        type="tel"
                        variant="outlined"
                        value={section.phoneNumber || ""}
                        placeholder="전화번호를 입력하세요"
                      />
                      <TextField
                        css={textFieldStyle}
                        label="깃허브"
                        variant="outlined"
                        value={section.githubUrl || ""}
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                github.com/
                              </InputAdornment>
                            ),
                          },
                        }}
                      />
                    </div>
                    <EditSaveButton isEditing={true} editId={id} />
                  </>
                ) : (
                  <>
                    <div css={gridStyle}>
                      <Typography>이름 : {section.name || "-"}</Typography>
                      <Typography>이메일 : {section.email || "-"}</Typography>
                      <Typography>
                        전화번호 : {section.phoneNumber || ""}
                      </Typography>
                      <Typography>
                        git주소 : {section.githubUrl || ""}
                      </Typography>
                    </div>
                    <EditSaveButton isEditing={false} editId={id} />
                  </>
                )}
              </div>
            );

          case "skills":
            return (
              <div key={id} css={contentStyle}>
                <Typography css={titleStyle} variant="h5">
                  스킬
                </Typography>
                {isEditing[id] ? (
                  <div css={rowStyle}>
                    <Select
                      size="small"
                      value={selectSkill}
                      onChange={(e) => setSelectSkill(e.target.value)}
                    >
                      <MenuItem value="familiar">기초</MenuItem>
                      <MenuItem value="strengths">강점</MenuItem>
                    </Select>

                    <TextField label="스킬 입력" size="small" fullWidth />

                    <Button variant="outlined">추가</Button>
                  </div>
                ) : null}
                {/* 스킬 리스트 (원형 UI) */}
                <div css={skillListStyle}>
                  {(section.familiar || []).map((skill, id) => (
                    <Chip
                      key={`k-${id}`}
                      label={`(기초) ${skill}`}
                      variant="outlined"
                    />
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
                <EditSaveButton isEditing={!!isEditing[id]} editId={id} />
              </div>
            );

          case "introduction":
            return (
              <div key={id} css={contentStyle}>
                <Typography css={titleStyle} variant="h5">
                  자기소개
                </Typography>
                {isEditing[id] ? (
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
                    <EditSaveButton isEditing={true} editId={id} />
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
                    <EditSaveButton isEditing={false} editId={id} />
                  </>
                )}
              </div>
            );

          case "projects":
            return section.items.map((proj, idx) => {
              const editKey = `${id}-${idx}`;
              return (
                <div key={editKey} css={contentStyle}>
                  <Typography css={titleStyle} variant="h5">
                    프로젝트 {idx + 1}
                  </Typography>

                  {!isEditing[editKey] ? (
                    <>
                      <Typography>제목 : {proj.name || ""}</Typography>
                      <Typography>역할 : {proj.role || ""}</Typography>
                      <Typography>설명: {proj.description || ""}</Typography>

                      {proj.outcomes.map((o, oIdx) => (
                        <Typography key={oIdx}>
                          성과 {oIdx + 1}: {o.task} — {o.result}
                        </Typography>
                      ))}

                      <EditSaveButton isEditing={false} editId={editKey} />
                    </>
                  ) : (
                    <>
                      <TextField
                        type="title"
                        css={textFieldStyle}
                        label="제목"
                        value={proj.name}
                      />
                      <TextField
                        type="role"
                        label="역할"
                        css={textFieldStyle}
                        value={proj.role}
                      />
                      <TextField
                        multiline
                        label="설명"
                        css={textFieldStyle}
                        value={proj.description}
                      />
                      {proj.outcomes.map((outcome, j) => (
                        <div key={j} style={{ paddingTop: 20 }}>
                          <TextField
                            css={css`
                              width: 100%;
                              margin-bottom: 5px;
                            `}
                            label={`성과${j + 1}`}
                            value={outcome.task}
                            multiline
                          />
                          <TextField
                            css={textFieldStyle}
                            label={`성과${j + 1} - 설명`}
                            value={outcome.result}
                            multiline
                          />
                        </div>
                      ))}
                      <EditSaveButton isEditing={true} editId={editKey} />
                    </>
                  )}
                </div>
              );
            });

          case "custom":
            return (
              <div key={id} css={contentStyle}>
                {isEditing[id] ? (
                  <>
                    <TextField
                      css={css`
                        font-weight: bold;
                        margin-bottom: 1rem;
                        input {
                          font-size: 1.3rem;
                        }
                      `}
                      value={section.title}
                    />
                    <div
                      style={{
                        gap: "10px",
                        marginBottom: "1.5rem",
                        width: "100%",
                      }}
                    >
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        value={section.content}
                      />
                    </div>
                    <EditSaveButton isEditing={true} editId={id} />
                  </>
                ) : (
                  <>
                    <Typography css={titleStyle} variant="h5">
                      {section.title}
                    </Typography>

                    <Typography>{section.content}</Typography>
                    <EditSaveButton isEditing={false} editId={id} />
                  </>
                )}
              </div>
            );

          default:
            return null;
        }
      })}

      <div
        css={css`
          text-align: center;
        `}
      >
        <Button variant="outlined" size="large" onClick={addSection}>
          섹션 추가하기
        </Button>
      </div>
    </div>
  );
};
