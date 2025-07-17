import { forwardRef, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { modernStyle } from "../../styles/modernTheme";
import type { ResumeData } from "../../types/resume.type";

export const ResumePreviewPanel = forwardRef<
  HTMLDivElement,
  { sections: ResumeData }
>(({ sections }, ref) => {
  const userData = useSelector((state: any) => state.login.loginInfo);
  let projectCount = 0;
  let projectRendered = false;

  console.log("userData", userData);
  const { order, entities } = sections;
  return (
    <div ref={ref} style={modernStyle.previewContainer}>
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
                <h3 style={modernStyle.sectionTitle}>자기소개</h3>
                <p style={modernStyle.sectionContent}>{section.headline}</p>
                <p style={modernStyle.sectionContent}>
                  {section.description || "자기소개를 입력하세요."}
                </p>
              </section>
            );
          case "skills":
            return (
              <section key={id} style={{ marginTop: 30 }}>
                <h3 style={modernStyle.sectionTitle}>기술 스택</h3>
                <ul style={{ paddingLeft: 20, margin: 0 }}>
                  {(section.familiar || []).map((skill: string, i: number) => (
                    <li key={i}>{skill}</li>
                  ))}

                  {(section.strengths || []).map((skill: string, i: number) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>
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
                <h3 style={modernStyle.sectionTitle}>{section.title}</h3>
                <p style={modernStyle.sectionContent}>{section.content}</p>
              </section>
            );
          default:
            return null;
        }
      })}
    </div>
  );
});
