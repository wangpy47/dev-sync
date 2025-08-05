import { useState, type Dispatch, type SetStateAction } from "react";
import type {
  ResumeData,
  SkillsTypeSection,
  SkillInnerType,
} from "../../../types/resume.type";
import { SectionWrapper } from "./SectionWrapper";
import { css } from "@emotion/react";
import {
  Select,
  MenuItem,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";
import { rowStyle } from "../../../styles/resumeLayerStyle";
import { useDebouncedFetch } from "../../../hooks/useDebouncedFetch";
interface Props {
  section: SkillsTypeSection;
  setSections: Dispatch<SetStateAction<ResumeData>>;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
}

// type skills{}
type skill = {
  icon: string;
  id: number;
  name: string;
};

export const SkillsSection = ({
  section,
  isEditing,
  setSections,
  onEdit,
  onSave,
}: Props) => {
  const [selectSkill, setSelectSkill] = useState<string>("familiar");
  const [query, setQuery] = useState("");

  const { data, loading } = useDebouncedFetch<string>(
    query,
    (q) =>
      `http://localhost:3000/resumes/skills/search?query=${encodeURIComponent(
        q
      )}`
  );

  const chipList = css`
    display: flex;
    flex-direction: column; // 세로로 '기초'와 '숙련' 섹션을 배치
    gap: 10px; // 각 섹션 사이의 간격
    margin-bottom: 20px;
  `;

  const skillSection = css`
    display: flex;
    flex-direction: column; // 제목과 칩들을 세로로 배치
    gap: 0px; // 제목과 칩들 사이의 간격
  `;

  const chipContainer = css`
    display: flex;
    flex-wrap: wrap; // 칩들이 많아지면 다음 줄로 넘어감
    gap: 8px; // 각 칩 사이의 간격
  `;

  const chip = css`
    display: inline-flex;
    align-items: center;
    padding: 6px 12px;
    background-color: #f2f2f2;
    color: #434343;
    border-radius: 16px;
    font-size: 14px;
    line-height: 1.4;
    vertical-align: middle;
  `;
  const handleAddSkill = () => {
    if (query) {
      console.log(selectSkill);
      console.log(query);
    }
  };

  return (
    <SectionWrapper
      title="스킬"
      isEditing={isEditing}
      onEdit={onEdit}
      onSave={onSave}
    >
      {isEditing ? (
        <>
          <div css={rowStyle}>
            <Select
              size="small"
              css={css`
                width: 20%;
              `}
              value={selectSkill}
              onChange={(e) => {
                setSelectSkill(e.target.value as string);
              }}
            >
              <MenuItem value="familiar">기초</MenuItem>
              <MenuItem value="strengths">강점</MenuItem>
            </Select>
            <Autocomplete
              disablePortal
              options={data}
              size="small"
              sx={{ width: "100%" }}
              inputValue={query}
              onInputChange={(_, newInputValue) => {
                setQuery(newInputValue);
              }}
              getOptionLabel={(option: skill) =>
                typeof option === "string" ? option : option.name
              }
              loading={loading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="스킬을 입력하세요."
                  slotProps={{
                    htmlInput: {
                      ...params.inputProps,
                      //브라우저 자동완성 방지
                      autoComplete: "new-password",
                    },
                  }}
                />
              )}
            />
            <Button
              variant="outlined"
              size="large"
              css={css`
                white-space: nowrap;
              `}
              onClick={handleAddSkill}
            >
              추가
            </Button>
          </div>
        </>
      ) : null}
      {/* 스킬 리스트 (원형 UI) */}
      <div css={chipList}>
        {/* 기초 스킬 섹션 */}
        <div css={skillSection}>
          <h3>기초</h3> {/* 제목을 더 명확하게 h3 태그로 변경 */}
          <div css={chipContainer}>
            {(section.familiars || []).map((skill: SkillInnerType, id) => (
              <span key={`familiar-${id}`} css={chip}>
                <i
                  css={css`
                    font-size: 1.1rem;
                    display: inline-block;
                    line-height: 1;
                    margin-right: 6px;
                  `}
                  className={`${skill.icon} colored`}
                ></i>
                <span
                  css={css`
                    transform: translateY(-1px);
                  `}
                >
                  {skill.name}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* 숙련 (강점) 스킬 섹션 */}
        <div css={skillSection}>
          <h3>숙련 (강점)</h3> {/* 제목을 더 명확하게 h3 태그로 변경 */}
          <div css={chipContainer}>
            {(section.strengths || []).map((skill, id) => (
              <div key={`strength-${id}`} css={chip}>
                <i
                  css={css`
                    font-size: 1.1rem;
                    display: inline-block;
                    line-height: 1;
                    margin-right: 6px;
                  `}
                  className={`${skill.icon} colored`}
                ></i>
                <span
                  css={css`
                    transform: translateY(-1px);
                  `}
                >
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
