/** @jsxImportSource @emotion/react */
import { forwardRef } from "react";
import { useSelector } from "react-redux";
import { blueGrayStyle } from "../../styles/blueGrayTheme";
import { modernStyle } from "../../styles/modernTheme";
import type { ResumeData } from "../../types/resume.type";
import { css } from "@emotion/react";
import {
  SkillInnerType,
  ProjectTypeSection,
  OutcomeTypeSection,
} from "../../types/resume.type";

type Props = {
  sections: ResumeData;
  styleTheme: typeof modernStyle | typeof blueGrayStyle;
};
export const ResumePreviewPanel = forwardRef<HTMLDivElement, Props>(
  ({ sections, styleTheme }, ref) => {
    const { order, entities } = sections;

    return (
      <div ref={ref} css={styleTheme.previewContainer}>
        {order.map((id) => {
          const section = entities.find((entity) => entity.id === id);
          if (!section) return null;
          switch (section.type) {
            case "profile":
              return (
                <div key={id} css={styleTheme.profileStyle}>
                  {/* 이름 */}
                  <h1 css={styleTheme.profileName}>{section.name || ""}</h1>

                  {/* 이메일 + 전화번호 */}
                  <div css={styleTheme.profileSide}>
                    <div
                      css={css`
                        display: flex;
                      `}
                    >
                      <span>이메일</span>
                      <span>{section.email || ""}</span>
                    </div>
                    <div
                      css={css`
                        display: flex;
                        gap: 6px;
                      `}
                    >
                      <span>전화번호</span>
                      <span>{section.phoneNumber || ""}</span>
                    </div>
                  </div>

                  {/* 주소 */}
                  <div
                    css={css`
                      display: flex;
                      justify-content: right;
                      margin-top: 8px;
                      font-size: 14px;
                      ${styleTheme.fontColor};
                    `}
                  >
                    <span
                      css={css`
                        min-width: 40px;
                      `}
                    >
                      주소
                    </span>
                    <span>{section.address}</span>
                  </div>

                  {/* 구분선 */}
                  <div
                    css={css`
                      ${styleTheme.fontColor}
                      margin-top: 20px;
                      margin-bottom: 16px;
                    `}
                  />

                  {/* 하단 정보 */}
                  <div
                    css={css`
                      display: flex;
                      flex-direction: column;
                      font-size: 14px;
                    `}
                  >
                    <div
                      css={css`
                        display: flex;
                        gap: 8px;
                      `}
                    >
                      <span
                        css={css`
                          width: 100px;
                          font-weight: 600;
                          ${styleTheme.fontColor};
                        `}
                      >
                        학력
                      </span>
                      <span>{section.education || "학력을 입력하세요"}</span>
                    </div>
                    <div
                      css={css`
                        display: flex;
                        gap: 8px;
                      `}
                    >
                      <span
                        css={css`
                          width: 100px;
                          font-weight: 600;
                          ${styleTheme.fontColor};
                        `}
                      >
                        GitHub
                      </span>
                      <span>
                        {section.githubUrl || "깃허브 아이디를 입력하세요"}
                      </span>
                    </div>
                    <div
                      css={css`
                        display: flex;
                        gap: 8px;
                      `}
                    >
                      <span
                        css={css`
                          width: 100px;
                          font-weight: 600;
                          ${styleTheme.fontColor};
                        `}
                      >
                        블로그
                      </span>
                      <span>{section.blogUrl || "aaaaa@com"}</span>
                    </div>
                  </div>
                </div>
              );

            case "introduction":
              return (
                <section
                  key={id}
                  css={css`
                    margin-top: 30px;
                  `}
                >
                  <h3 css={styleTheme.sectionTitle}>자기소개</h3>
                  <p css={styleTheme.sectionContent}>{section.headline}</p>
                  <p css={styleTheme.sectionContent}>
                    {section.description || "자기소개를 입력하세요."}
                  </p>
                </section>
              );

            case "skills":
              return (
                <section
                  key={id}
                  css={css`
                    margin-top: 30px;
                  `}
                >
                  <h3 css={styleTheme.sectionTitle}>기술 스택</h3>
                  <div css={styleTheme.firstSkillGroup}>
                    <div css={styleTheme.skillTitle}>familiars</div>
                    <div css={styleTheme.chipList}>
                      {(section.familiars || []).map(
                        (skill: SkillInnerType, i: number) => (
                          <span key={`familiar-${i}`} css={styleTheme.chip}>
                            <i className={`${skill.icon} colored`}></i>
                            {skill.name}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                  <div css={styleTheme.skillGroup}>
                    <div css={styleTheme.skillTitle}>strengths</div>
                    <div css={styleTheme.chipList}>
                      {(section.strengths || []).map(
                        (skill: SkillInnerType, i: number) => (
                          <span key={`strength-${i}`} css={styleTheme.chip}>
                            <i className={`${skill.icon} colored`}></i>
                            {skill.name}
                          </span>
                        )
                      )}
                    </div>
                    <div />
                  </div>
                </section>
              );

            case "career":
              return (
                <section
                  key={id}
                  css={css`
                    margin-top: 30px;
                  `}
                >
                  <h3 css={styleTheme.sectionTitle}>경력</h3>
                  <div
                    css={css`
                      display: flex;
                    `}
                  >
                    <div css={styleTheme.careerLeft}>
                      {section.startDate} ~{" "}
                      {section.isCurrent ? "현재" : section.endDate}
                    </div>
                    <div
                      css={css`
                        width: 80%;
                      `}
                    >
                      <h4 css={styleTheme.career}>
                        {section.company}
                        <span
                          css={css`
                            padding: 0 12px;
                            border-left: 1px solid #d1d5db; /* 구분선 */
                          `}
                        >
                          {section.position}
                        </span>
                      </h4>
                      <p css={styleTheme.careerSkills}>
                        기술: {section.technologies.join(", ")}
                      </p>
                      <p css={styleTheme.careerDescription}>
                        {section.description}
                      </p>
                    </div>
                  </div>
                </section>
              );

            case "custom":
              return (
                <section
                  key={id}
                  css={css`
                    margin-top: 30px;
                  `}
                >
                  <h3 css={styleTheme.sectionTitle}>{section.title}</h3>
                  <p css={styleTheme.sectionContent}>{section.content}</p>
                </section>
              );
            case "achievement":
              // 현재 section이 order에서 첫 번째 achievement인지 확인
              const firstAchievementIndex = order.findIndex(
                (id) =>
                  entities.find((e) => e.id === id)?.type === "achievement"
              );
              const isFirstAchievement = order[firstAchievementIndex] === id;

              return (
                <section key={id}>
                  {/* 첫 번째 achievement에서만 제목 표시 */}
                  {isFirstAchievement && (
                    <h3 css={styleTheme.sectionTitle}>자격증 · 수상</h3>
                  )}

                  <div
                    css={css`
                      display: flex;
                      flex-direction: column;
                      border-bottom: 1px solid #ddd;
                      padding-bottom: 4px;
                      margin-bottom: 8px;
                    `}
                  >
                    <div
                      css={css`
                        display: flex;
                        align-items: center;
                      `}
                    >
                      {/* 제목 */}
                      <h4
                        css={css`
                          font-size: 14px;
                          font-weight: 600;
                          color: #111827;
                          padding-right: 12px;
                          border-right: 1px solid #d1d5db;
                        `}
                      >
                        {section.title}
                      </h4>

                      {/* 기관 */}
                      {section.organization && (
                        <span
                          css={css`
                            font-size: 14px;
                            color: #374151;
                            padding: 0 12px;
                            border-right: 1px solid #d1d5db;
                          `}
                        >
                          {section.organization}
                        </span>
                      )}

                      {/* 날짜 */}
                      <span
                        css={css`
                          font-size: 14px;
                          color: #6b7280;
                          padding: 0 12px;
                        `}
                      >
                        {section.date}
                      </span>

                      {/* 설명 */}
                      {section.description && (
                        <span
                          css={css`
                            font-size: 14px;
                            border-left: 1px solid #d1d5db;
                            color: #374151;
                            padding-left: 12px;
                          `}
                        >
                          {section.description}
                        </span>
                      )}
                    </div>
                  </div>
                </section>
              );
            case "projects":
              return (
                <section key={id}>
                  <h3 css={styleTheme.sectionTitle}>프로젝트</h3>
                  {section.items.map((i: ProjectTypeSection, idx: number) => (
                    <div
                      key={idx}
                      css={css`
                        margin-bottom: 20px;
                      `}
                    >
                      {/* 프로젝트명 */}
                      <h4
                        css={css`
                          font-size: 16px;
                          font-weight: 600;
                          margin-bottom: 8px;
                          color: #111827;
                        `}
                      >
                        {i.name}
                      </h4>

                      {/* 수행기간 */}
                      <p
                        css={css`
                          font-size: 14px;
                          color: #6b7280;
                          margin-bottom: 6px;
                        `}
                      >
                        {i.startDate} ~ {i.endDate || "진행 중"}
                      </p>

                      {/* 설명 */}
                      <p
                        css={css`
                          font-size: 15px;
                          margin-bottom: 10px;
                          line-height: 1.5;
                          color: #374151;
                        `}
                      >
                        {i.description}
                      </p>

                      {/* 기술 스택 */}
                      {i.skills?.length > 0 && (
                        <div
                          css={css`
                            display: flex;
                            flex-wrap: wrap;
                            gap: 6px;
                            margin-bottom: 12px;
                          `}
                        >
                          {i.skills.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              css={css`
                                font-size: 13px;
                                padding: 4px 10px;
                                border-radius: 9999px;
                                // background: #e0f2fe; /* 파란색 계열 */
                                color: #465a80;
                                font-weight: 500;
                              `}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* 한일 & 성과 */}
                      {i.outcomes.map((t: OutcomeTypeSection, oIdx: number) => (
                        <div
                          key={oIdx}
                          css={css`
                            margin-top: 20px;
                            padding-left: 10px;
                            border-left: 3px solid #aeaeae; /* 파란색 구분선 */
                          `}
                        >
                          <p
                            css={css`
                              font-size: 14px;
                              margin: 0;
                              color: #111827;
                            `}
                          >
                            <strong>업무 : </strong> {t.task}
                          </p>
                          <p
                            css={css`
                              font-size: 14px;
                              margin: 4px 0 0;
                              color: #374151;
                            `}
                          >
                            <strong>기여 : </strong> {t.result}
                          </p>
                        </div>
                      ))}
                    </div>
                  ))}
                </section>
              );

            default:
              return null;
          }
        })}
      </div>
    );
  }
);
