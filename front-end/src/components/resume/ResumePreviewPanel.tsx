import { forwardRef, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { modernStyle } from "../../styles/modernTheme";
import { blueGrayStyle } from "../../styles/blueGrayTheme";
import type { ResumeData } from "../../types/resume.type";

type props = {
  sections: ResumeData;
  styleTheme: typeof modernStyle | typeof blueGrayStyle;
};

export const ResumePreviewPanel = forwardRef<HTMLDivElement, props>(
  ({ sections, styleTheme }, ref) => {
    const userData = useSelector((state: any) => state.login.loginInfo);
    let projectCount = 0;
    let projectRendered = false;
    console.log(styleTheme);
    console.log("userData", userData);
    const { order, entities } = sections;
    return (
      <div ref={ref} style={styleTheme.previewContainer}>
        {order.map((id) => {
          const section = entities.find((entity) => entity.id === id);
          if (section === undefined) {
            return;
          }
          switch (section.type) {
            case "profile":
              return (
                <div
                  key={id}
                  style={{
                    marginBottom: 20,
                    borderBottom: "2px solid #444",
                    paddingBottom: 10,
                  }}
                >
                  <h1 style={{ margin: 0, fontSize: 28 }}>
                    {section.name || "이름을 입력하세요"}
                  </h1>
                  <p style={{ margin: 0, fontSize: 14, color: "#666" }}>
                    {section.email || "이메일을 입력하세요"}
                  </p>
                  <p style={{ margin: 0, fontSize: 14, color: "#666" }}>
                    {section.phone_number || "전화번호를 입력하세요"}
                  </p>
                  <p style={{ margin: 0, fontSize: 14, color: "#666" }}>
                    {section.github_url || "깃허브 아이디를 입력하세요"}
                  </p>
                  <p style={{ margin: 0, fontSize: 14, color: "#666" }}>
                    {section.blog_url || "블로그 주소를 입력하세요"}
                  </p>
                  <p style={{ margin: 0, fontSize: 14, color: "#666" }}>
                    {section.address || "집 주소를 입력하세요"}
                  </p>
                  <p style={{ margin: 0, fontSize: 14, color: "#666" }}>
                    {section.education || "학력을 입력하세요"}
                  </p>
                </div>
              );
            case "introduction":
              return (
                <section key={id} style={{ marginTop: 30 }}>
                  <h3 style={styleTheme.sectionTitle}>자기소개</h3>
                  <p style={styleTheme.sectionContent}>{section.headline}</p>
                  <p style={styleTheme.sectionContent}>
                    {section.description || "자기소개를 입력하세요."}
                  </p>
                </section>
              );
            case "skills":
              return (
                <section key={id} style={{ marginTop: 30 }}>
                  <h3 style={styleTheme.sectionTitle}>기술 스택</h3>
                  <div style={styleTheme.chipList}>
                    {(section.familiar || []).map(
                      (skill: string, i: number) => (
                        <span key={`familiar-${i}`} style={styleTheme.chip}>
                          {skill}
                        </span>
                      )
                    )}
                    {(section.strengths || []).map(
                      (skill: string, i: number) => (
                        <span key={`strength-${i}`} style={styleTheme.chip}>
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
                  style={{
                    marginTop: 30,
                  }}
                >
                  <h3 style={styleTheme.sectionTitle}>경력</h3>
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    {/* 날짜: 좌측 20% */}
                    <div
                      style={{
                        width: "20%",
                        fontSize: 14,
                        color: "#64748b",
                        fontWeight: 500,
                        paddingRight: 12,
                        boxSizing: "border-box",
                      }}
                    >
                      {section.start_date} ~{" "}
                      {section.is_current ? "현재" : section.end_date}
                    </div>

                    {/* 우측 80% */}
                    <div style={{ width: "80%" }}>
                      {/* 회사명 + 작은 원 + 포지션 */}
                      <h4
                        style={{
                          margin: 0,
                          fontSize: 16,
                          fontWeight: 700,
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          color: "#1e293b",
                        }}
                      >
                        {section.company} -
                        <span
                          style={{
                            fontSize: 14,
                            color: "#94a3b8",
                            fontWeight: 400,
                          }}
                        >
                          {section.position}
                        </span>
                      </h4>

                      {/* 기술 스택 */}
                      <p
                        style={{
                          marginTop: 6,
                          fontSize: 13,
                          color: "#64748b",
                          fontWeight: 400,
                        }}
                      >
                        기술: {section.technologies.join(", ")}
                      </p>

                      {/* 설명 */}
                      <p
                        style={{
                          marginTop: 8,
                          fontSize: 14,
                          lineHeight: 1.5,
                          color: "#475569",
                        }}
                      >
                        {section.description}
                      </p>
                    </div>
                  </div>
                </section>
              );

            // case "projects":
            //   projectCount++;
            //   const titleRender = !projectRendered;
            //   projectRendered = true;
            //   return (
            //     <section key={id} style={{ marginTop: 30 }}>
            //       {titleRender && (
            //         <h3 style={modernStyle.sectionTitle}>프로젝트 경험</h3>
            //       )}

            //       {section.items.map((item, idx) => (
            //         <div key={idx}>
            //           <h4>{`프로젝트 ${projectCount}: ${item.name}`}</h4>
            //           <p>{item.description}</p>
            //           <p>
            //             <strong>역할:</strong> {item.role}
            //           </p>
            //           {item.outcomes.map(
            //             (outcome: { task: string; result: string }, j) => (
            //               <div key={j} style={{ paddingLeft: 10 }}>
            //                 <p>
            //                   <strong>{`성과 ${j + 1}: ${outcome.task}`}</strong>
            //                 </p>
            //                 <p>{outcome.result}</p>
            //               </div>
            //             )
            //           )}
            //         </div>
            //       ))}
            //     </section>
            //   );
            case "custom":
              return (
                <section key={id} style={{ marginTop: 30 }}>
                  <h3 style={styleTheme.sectionTitle}>{section.title}</h3>
                  <p style={styleTheme.sectionContent}>{section.content}</p>
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
