/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  Button,
  Chip,
  InputAdornment,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useState } from "react";
import type { OutcomeSection, ResumeData } from "../../types/resume.type";

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

const textFieldStyle = css`
  width: 100%;
`;

const textareaStyle = css`
  width: 100%;
  box-sizing: border-box;
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

const dateStyle = css`
  color: #787878;
  margin: 0;
  display: flex;
  align-items: center;
  &::before {
    content: "";
    display: inline-block;
    margin: 0 8px;
    width: 1px;
    height: 12px;
    background: #757575;
  }
`;

interface GitResumeProps {
  sections: ResumeData;
  // updateSectionData: (id: Key, newData: SectionData) => void;
  // moveSection: (index: number, direction: "up" | "down") => void;
  // addSection: () => void;
}

export const ResumeEditorPanel = ({
  sections,
}: // updateSectionData,
// removeSection,
// addSection,
GitResumeProps) => {
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
        console.log(id);
        const section = entities.find((entity) => entity.id === id);
        if (section === undefined) {
          return;
        }
        console.log(section);
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
                        // label="gitHub"
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
                      <TextField
                        css={textFieldStyle}
                        label="blog"
                        variant="outlined"
                        value={section.blog_url || ""}
                        placeholder="블로그 주소를 입력하세요"
                      />
                      <TextField
                        css={textFieldStyle}
                        label="학력"
                        variant="outlined"
                        value={section.education || ""}
                        placeholder="학력을 입력하세요"
                      />
                    </div>
                    <TextField
                      css={textFieldStyle}
                      label="주소"
                      type="address"
                      variant="outlined"
                      value={section.address || ""}
                    />
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
                        gitHub : {section.github_url || ""}
                      </Typography>
                      <Typography>blog : {section.blog_url || ""}</Typography>
                      <Typography>학력 : {section.education || ""}</Typography>
                      <Typography>집 주소 : {section.address || ""}</Typography>
                    </div>
                    {/* <EditSaveButton isEditing={false} editId={id} /> */}
                  </>
                )}
                <EditSaveButton isEditing={isEditing[id]} editId={id} />
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
                <EditSaveButton isEditing={isEditing[id]} editId={id} />
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
                      <Typography css={dateStyle}>
                        {section.start_date}
                      </Typography>
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
                  자격 및 수상 내역
                </Typography>

                {isEditing[id] ? (
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
                    <EditSaveButton isEditing={true} editId={id} />
                  </>
                ) : (
                  <>
                    <Typography>{section.title}</Typography>
                    <Typography> {section.organization}</Typography>

                    <Typography>{section.date}</Typography>
                    <Typography> {section.description}</Typography>
                    <EditSaveButton isEditing={false} editId={id} />
                  </>
                )}
              </div>
            );

          case "project":
            const relatedOutcomes = entities.filter(
              (e): e is OutcomeSection =>
                e.type === "outcomes" && e.project === section.id
            );
            return (
              <div key={id} css={contentStyle}>
                <Typography css={titleStyle} variant="h5">
                  프로젝트 - {section.name}
                </Typography>

                {!isEditing[id] ? (
                  <>
                    <Bar />
                    <Typography>설명: {section.description}</Typography>
                    <Typography>
                      기간: {section.start_date} ~ {section.end_date}
                    </Typography>
                    <Typography>
                      사용 기술: {section.technologies?.join(", ")}
                    </Typography>

                    {/* 연결된 성과 (outcomes) 목록 */}
                    {relatedOutcomes.length > 0 && (
                      <div css={{ marginTop: "1rem" }}>
                        <Typography
                          css={css`
                            font-weight: bold;
                            font-size: 1.1rem;
                          `}
                        >
                          관련 성과
                        </Typography>
                        {relatedOutcomes.map((outcome) => (
                          <div
                            key={outcome.id}
                            css={{ marginBottom: "0.5rem" }}
                          >
                            <Typography>• 한 일: {outcome.task}</Typography>
                            <Typography>→ 성과: {outcome.result}</Typography>
                          </div>
                        ))}
                      </div>
                    )}
                    <EditSaveButton isEditing={false} editId={id} />
                  </>
                ) : (
                  <>
                    <TextField
                      label="설명"
                      value={section.description}
                      fullWidth
                      size="small"
                      margin="dense"
                    />
                    <TextField
                      label="시작일"
                      value={section.start_date}
                      fullWidth
                      size="small"
                      margin="dense"
                    />
                    <TextField
                      label="종료일"
                      value={section.end_date}
                      fullWidth
                      size="small"
                      margin="dense"
                    />
                    <TextField
                      label="사용 기술"
                      value={section.technologies?.join(", ") || ""}
                      fullWidth
                      size="small"
                      margin="dense"
                      placeholder="예: React, TypeScript, NestJS"
                    />
                    {relatedOutcomes.length > 0 && (
                      <div css={{ marginTop: "1rem" }}>
                        <Typography
                          css={css`
                            font-weight: bold;
                            font-size: 1.1rem;
                          `}
                        >
                          관련 성과
                        </Typography>
                        {relatedOutcomes.map((outcome) => (
                          <div
                            key={outcome.id}
                            css={{
                              marginBottom: "0.5rem",
                              display: "grid",
                              gap: "0.5rem",
                            }}
                          >
                            <TextField
                              label="한 일"
                              value={outcome.task}
                              fullWidth
                              size="small"
                              margin="dense"
                            />
                            <TextField
                              label="성과"
                              value={outcome.result}
                              fullWidth
                              size="small"
                              margin="dense"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    <EditSaveButton isEditing={true} editId={id} />
                  </>
                )}
              </div>
            );

          // case "project":
          //   const projectSections = entities.filter(
          //     (e): e is ProjectSection => e.type === "project"
          //   );

          //   return (
          //     <div key={id} css={contentStyle}>
          //       <Typography css={titleStyle} variant="h5">
          //         프로젝트 경험
          //       </Typography>

          //       {projectSections.map((section) => {
          //         const relatedOutcomes = entities.filter(
          //           (e): e is OutcomeSection =>
          //             e.type === "outcomes" && e.project === section.id
          //         );

          //         return (
          //           <div key={section.id} css={{ marginBottom: "2rem" }}>
          //             {isEditing["projects"] ? (
          //               <>
          //                 <Bar />
          //                 <TextField
          //                   label="이름"
          //                   value={section.name}
          //                   fullWidth
          //                   size="small"
          //                   margin="dense"
          //                 />
          //                 <TextField
          //                   label="설명"
          //                   value={section.description}
          //                   fullWidth
          //                   size="small"
          //                   margin="dense"
          //                 />
          //                 <TextField
          //                   label="시작일"
          //                   value={section.start_date}
          //                   fullWidth
          //                   size="small"
          //                   margin="dense"
          //                 />
          //                 <TextField
          //                   label="종료일"
          //                   value={section.end_date}
          //                   fullWidth
          //                   size="small"
          //                   margin="dense"
          //                 />
          //                 <TextField
          //                   label="사용 기술"
          //                   value={section.technologies?.join(", ") || ""}
          //                   fullWidth
          //                   size="small"
          //                   margin="dense"
          //                   placeholder="예: React, TypeScript, NestJS"
          //                 />

          //                 {relatedOutcomes.length > 0 && (
          //                   <div css={{ marginTop: "1rem" }}>
          //                     <Typography
          //                       css={css`
          //                         font-weight: bold;
          //                         font-size: 1.1rem;
          //                       `}
          //                     >
          //                       관련 성과
          //                     </Typography>
          //                     {relatedOutcomes.map((outcome) => (
          //                       <div
          //                         key={outcome.id}
          //                         css={{
          //                           marginBottom: "0.5rem",
          //                           display: "grid",
          //                           gap: "0.5rem",
          //                         }}
          //                       >
          //                         <TextField
          //                           label="한 일"
          //                           value={outcome.task}
          //                           fullWidth
          //                           size="small"
          //                           margin="dense"
          //                         />
          //                         <TextField
          //                           label="성과"
          //                           value={outcome.result}
          //                           fullWidth
          //                           size="small"
          //                           margin="dense"
          //                         />
          //                       </div>
          //                     ))}
          //                   </div>
          //                 )}
          //               </>
          //             ) : (
          //               <>
          //                 <Bar />
          //                 <Typography>제목: {section.name}</Typography>
          //                 {/* <Bar /> */}
          //                 <Typography>설명: {section.description}</Typography>
          //                 <Typography>
          //                   기간: {section.start_date} ~ {section.end_date}
          //                 </Typography>
          //                 <Typography>
          //                   사용 기술: {section.technologies?.join(", ")}
          //                 </Typography>

          //                 {relatedOutcomes.length > 0 && (
          //                   <div css={{ marginTop: "1rem" }}>
          //                     <Typography
          //                       css={css`
          //                         font-weight: bold;
          //                         font-size: 1.1rem;
          //                       `}
          //                     >
          //                       관련 성과
          //                     </Typography>
          //                     {relatedOutcomes.map((outcome) => (
          //                       <div
          //                         key={outcome.id}
          //                         css={{ marginBottom: "0.5rem" }}
          //                       >
          //                         <Typography>
          //                           • 한 일: {outcome.task}
          //                         </Typography>
          //                         <Typography>
          //                           → 성과: {outcome.result}
          //                         </Typography>
          //                       </div>
          //                     ))}
          //                   </div>
          //                 )}
          //               </>
          //             )}
          //           </div>
          //         );
          //       })}
          //       <EditSaveButton
          //         isEditing={isEditing["projects"]}
          //         editId={"projects"}
          //       />
          //     </div>
          //   );

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
        <Button
          variant="outlined"
          size="large"
          // onClick={addSection}
        >
          섹션 추가하기
        </Button>
      </div>
    </div>
  );
};
