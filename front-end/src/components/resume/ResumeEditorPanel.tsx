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
  Switch,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import type { ResumeData } from "../../types/resume.type";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const containerStyle = css`
  height: 100vh;
  margin: 2rem;
`;

const contentStyle = css`
  border: 1.5px solid #dbdbdb;
  border-radius: 10px;
  padding: 1.5rem 2.5rem;
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
const threeGridStyle = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  max-width: 100%;
  // margin: 2rem auto;
  border: 2px solid red;
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

  const Bar = () => {
    return (
      <div
        css={css`
          width: 100%;
          height: 1px;
          background-color: #e0e0e0; /* 연한 그레이 */
          margin: 1rem 0;
        `}
      />
    );
  };

  return (
    <div css={containerStyle}>
      {order.map((id: string) => {
        const section = entities.find((entity) => entity.id === id);
        if (section === undefined) {
          return;
        }
        switch (section.type) {
          case "profile":
            return (
              <div key={id} css={contentStyle}>
                <Typography css={titleStyle} variant="h5">
                  기본 정보
                </Typography>
                <Bar />
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
                        value={section.phone_number || ""}
                        placeholder="전화번호를 입력하세요"
                      />
                      <TextField
                        css={textFieldStyle}
                        label="깃허브"
                        variant="outlined"
                        value={section.github_url || ""}
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
                        전화번호 : {section.phone_number || ""}
                      </Typography>
                      <Typography>
                        git주소 : {section.github_url || ""}
                      </Typography>
                      <Typography>
                        블로그 주소 : {section.blog_url || ""}
                      </Typography>
                      <Typography>집 주소 : {section.address || ""}</Typography>
                      <Typography>학력 : {section.education || ""}</Typography>
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
                <Bar />
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
                <Bar />
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
          case "career":
            return (
              <div key={id} css={contentStyle}>
                <div
                  css={css`
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                  `}
                >
                  <Typography
                    css={css`
                      font-size: 1.8rem;
                      font-weight: bold;
                      margin: 0;
                    `}
                    variant="h5"
                  >
                    경력
                  </Typography>
                  {isEditing[id] ? (
                    <div
                      css={css`
                        // justifiy-content: center;
                        align-items: center;
                        display: flex;
                      `}
                    >
                      <Switch checked={section.is_current} />
                      <Typography>재직중</Typography>
                    </div>
                  ) : null}
                </div>
                <Bar />
                {isEditing[id] ? (
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
                        // rows={4}
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
                    <EditSaveButton isEditing={true} editId={id} />
                  </>
                ) : (
                  <>
                    <div
                      css={css`
                        display: flex;
                        // margin-bottom: 1rem;
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
                      <Typography
                        css={css`
                          font-size: 1.1rem;
                          color: #787878;
                        `}
                      >
                        {section.start_date}
                      </Typography>
                    </div>
                    <Typography
                      css={css`
                        margin-bottom: 1rem;
                      `}
                    >
                      {section.position}
                    </Typography>
                    <Typography>{section.description || ""}</Typography>
                    <div css={skillListStyle}>
                      {(section.technologies || []).map((skill, id) => (
                        <Chip
                          key={`k-${id}`}
                          label={`${skill}`}
                          variant="outlined"
                        />
                      ))}
                    </div>
                    <EditSaveButton isEditing={false} editId={id} />
                  </>
                )}
              </div>
            );

          case "achievement":
            return (
              <div key={id} css={contentStyle}>
                <Typography css={titleStyle} variant="h5">
                  자격증
                </Typography>

                {isEditing[id] ? (
                  <>
                    <TextField
                      label="자격증명"
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
                    <TextField value={section.description} />
                    <EditSaveButton isEditing={true} editId={id} />
                  </>
                ) : (
                  <>
                    <Typography>자격증명: {section.title}</Typography>
                    <Typography>발행기관: {section.organization}</Typography>
                    <Typography>
                      취득일:
                      {section.date}
                    </Typography>
                    <Typography>설명: {section.description}</Typography>
                    <EditSaveButton isEditing={false} editId={id} />
                  </>
                )}
              </div>
            );

          // case "projects":
          //   return section.items.map((proj, idx) => {
          //     const editKey = `${id}-${idx}`;
          //     return (
          //       <div key={editKey} css={contentStyle}>
          //         <Typography css={titleStyle} variant="h5">
          //           프로젝트 {idx + 1}
          //         </Typography>

          //         {!isEditing[editKey] ? (
          //           <>
          //             <Typography>제목 : {proj.name || ""}</Typography>
          //             <Typography>역할 : {proj.role || ""}</Typography>
          //             <Typography>설명: {proj.description || ""}</Typography>

          //             {proj.outcomes.map((o, oIdx) => (
          //               <Typography key={oIdx}>
          //                 성과 {oIdx + 1}: {o.task} — {o.result}
          //               </Typography>
          //             ))}

          //             <EditSaveButton isEditing={false} editId={editKey} />
          //           </>
          //         ) : (
          //           <>
          //             <TextField
          //               type="title"
          //               css={textFieldStyle}
          //               label="제목"
          //               value={proj.name}
          //             />
          //             <TextField
          //               type="role"
          //               label="역할"
          //               css={textFieldStyle}
          //               value={proj.role}
          //             />
          //             <TextField
          //               multiline
          //               label="설명"
          //               css={textFieldStyle}
          //               value={proj.description}
          //             />
          //             {proj.outcomes.map((outcome, j) => (
          //               <div key={j} style={{ paddingTop: 20 }}>
          //                 <TextField
          //                   css={css`
          //                     width: 100%;
          //                     margin-bottom: 5px;
          //                   `}
          //                   label={`성과${j + 1}`}
          //                   value={outcome.task}
          //                   multiline
          //                 />
          //                 <TextField
          //                   css={textFieldStyle}
          //                   label={`성과${j + 1} - 설명`}
          //                   value={outcome.result}
          //                   multiline
          //                 />
          //               </div>
          //             ))}
          //             <EditSaveButton isEditing={true} editId={editKey} />
          //           </>
          //         )}
          //       </div>
          //     );
          //   });

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
                    <Bar />
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
