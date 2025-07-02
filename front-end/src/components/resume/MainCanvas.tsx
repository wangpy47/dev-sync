import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { modernStyle } from "../../styles/modernTheme";
import { itemStyle } from "../gitRepoList/GitRepoList.styles";
// 🔹 각 개별 섹션의 구조
interface BasicInfoSection {
  type: "basicInfo";
  name: string;
  email: string;
  githubUrl: string;
  phoneNumber: number;
}

interface SkillsSection {
  type: "skills";
  familiar: string[];
  strengths: string[];
}

interface ProjectsSection {
  type: "projects";
  items: {
    name: string;
    role: string;
    description: string;
    outcomes: { task: string; result: string }[];
  }[];
}

interface IntroductionSection {
  type: "introduction";
  headline: string;
  description: string;
}

interface CustomSection {
  type: "custom";
  title: string;
  content: string;
}

// 🔹 유니언 타입으로 묶기
type SectionEntity =
  | BasicInfoSection
  | SkillsSection
  | ProjectsSection
  | IntroductionSection
  | CustomSection;

interface ResumeData {
  order: string[];
  entities: Record<string, SectionEntity>;
}

export const MainCanvas = ({ sections }: { sections: ResumeData }) => {
  const userData = useSelector((state: any) => state.login.loginInfo);
  let projectCount = 0;
  let projectRendered = false;

  console.log("userData", userData);
  const { order, entities } = sections;
  return (
    <div style={modernStyle.previewContainer}>
      {order.map((id) => {
        const section = entities[id];
        switch (section.type) {
          case "basicInfo":
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
                  {section.phoneNumber || "전화번호를 입력하세요"}
                </p>
                <p style={{ margin: 0, fontSize: 14, color: "#666" }}>
                  {section.githubUrl || "깃허브 아이디를 입력하세요"}
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
          case "projects":
            projectCount++;
            const titleRender = !projectRendered;
            projectRendered = true;
            return (
              <section key={id} style={{ marginTop: 30 }}>
                {titleRender && (
                  <h3 style={modernStyle.sectionTitle}>프로젝트 경험</h3>
                )}

                {section.items.map((item, idx) => (
                  <div key={idx}>
                    <h4>{`프로젝트 ${projectCount}: ${item.name}`}</h4>
                    <p>{item.description}</p>
                    <p>
                      <strong>역할:</strong> {item.role}
                    </p>
                    {item.outcomes.map(
                      (outcome: { task: string; result: string }, j) => (
                        <div key={j} style={{ paddingLeft: 10 }}>
                          <p>
                            <strong>{`성과 ${j + 1}: ${outcome.task}`}</strong>
                          </p>
                          <p>{outcome.result}</p>
                        </div>
                      )
                    )}
                  </div>
                ))}
              </section>
            );
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
};
