/** @jsxImportSource @emotion/react */
import { forwardRef } from "react";
import { useSelector } from "react-redux";
import { blueGrayStyle } from "../../styles/blueGrayTheme";
import { modernStyle } from "../../styles/modernTheme";
import type { ResumeData } from "../../types/resume.type";
import { css } from "@emotion/react";

type Props = {
  sections: ResumeData;
  styleTheme: typeof modernStyle | typeof blueGrayStyle;
};
export const ResumePreviewPanel = forwardRef<HTMLDivElement, Props>(
  ({ sections, styleTheme }, ref) => {
    const userData = useSelector((state: any) => state.login.loginInfo);
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
                  <h1 css={styleTheme.profileName}>
                    {section.name || "이민경"}
                  </h1>

                  {/* 이메일 + 전화번호 */}
                  <div css={styleTheme.profileSide}>
                    <div
                      css={css`
                        display: flex;
                      `}
                    >
                      <span>이메일</span>
                      <span>{section.email || "lmk4070@gmail.com"}</span>
                    </div>
                    <div
                      css={css`
                        display: flex;
                        gap: 6px;
                      `}
                    >
                      <span>전화번호</span>
                      <span>{section.phone_number || "010-5555-4875"}</span>
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
                    <span>{"경기도 화성시 봉담읍 (18315)"}</span>
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
                        {section.github_url || "깃허브 아이디를 입력하세요"}
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
                      <span>{section.blog_url || "dsfksdl@com"}</span>
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
                  <div css={styleTheme.chipList}>
                    {(section.familiar || []).map(
                      (skill: string, i: number) => (
                        <span key={`familiar-${i}`} css={styleTheme.chip}>
                          {skill}
                        </span>
                      )
                    )}
                    {(section.strengths || []).map(
                      (skill: string, i: number) => (
                        <span key={`strength-${i}`} css={styleTheme.chip}>
                          {skill}
                        </span>
                      )
                    )}
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
                      {section.start_date} ~{" "}
                      {section.is_current ? "현재" : section.end_date}
                    </div>
                    <div
                      css={css`
                        width: 80%;
                      `}
                    >
                      <h4 css={styleTheme.career}>
                        {section.company} -<span>{section.position}</span>
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

            default:
              return null;
          }
        })}
      </div>
    );
  }
);
