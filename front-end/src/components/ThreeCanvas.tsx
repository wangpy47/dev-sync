import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { useSelector } from "react-redux";

interface Project {
  name: string;
  description: string;
  outcomes: OutComes[];
  role: string;
}

interface OutComes {
  result: string;
  title: string;
}

interface GitInfo {
  introduction: {
    description: string;
  };
  projects: Project[];
  skills: {
    knowledgeable: string[];
    strengths: string[];
  };
}

interface ChildComponentProps {
  gitInfo: GitInfo;
}

export const ThreeCanvas = ({ gitInfo }: ChildComponentProps) => {
  const userData = useSelector((state: any) => state.login.loginInfo);
  const [username, setUsername] = useState(userData.username || "");
  const [email, setEmail] = useState(userData.email || "");
  const [githubUrl, setGithubUrl] = useState(userData.githubUrl || "");

  const A4_WIDTH = 210; // A4 width in mm
  const A4_HEIGHT = 297; // A4 height in mm
  const scale = 10; // Scale factor to convert mm to WebGL units
  const planeWidth = A4_WIDTH / scale;
  const planeHeight = A4_HEIGHT / scale;

  const textFontSize = 0.5; // 텍스트 크기
  const lineHeight = 1.2 * textFontSize; // 줄 간격 계산
  console.log(lineHeight);

  const renderSkills = gitInfo.skills.knowledgeable.length
    ? gitInfo.skills.knowledgeable
    : null;

  const renderStrengths = gitInfo.skills.strengths.length
    ? gitInfo.skills.strengths
    : null;

  const renderProj = gitInfo.projects.length ? gitInfo.projects : null;

  // 텍스트를 map 돌려서 렌더링
  const renderTextItems = (items: string[], startY: number) => {
    return items.map((item, index) => {
      const positionY = startY - lineHeight * index;
      return (
        <Text
          key={index}
          color="black"
          anchorX="left"
          anchorY="top"
          position={[-planeWidth / 2 + 1, positionY, 0.01]} // 텍스트 왼쪽
          fontSize={textFontSize}
          textAlign="left"
        >
          {item}
        </Text>
      );
    });
  };

  const renderProjects = (projects: Project[], startY: number) => {
    let currentY = startY;
    console.log(projects);
    return projects.map((project, projectIndex) => {
      const outcomesY = currentY - lineHeight; // outcomes 시작 Y 좌표
      const roleY = outcomesY - lineHeight * project.outcomes.length;

      const elements = [
        <Text
          key={`project-name-${projectIndex}`}
          color="black"
          anchorX="left"
          anchorY="top"
          position={[-planeWidth / 2 + 0.5, currentY, 0.01]}
          fontSize={textFontSize + 0.2}
          textAlign="left"
        >
          {`[${project.name}]`}
        </Text>,
        <Text
          key={`project-description-${projectIndex}`}
          color="black"
          anchorX="left"
          anchorY="top"
          position={[-planeWidth / 2 + 0.5, currentY - lineHeight, 0.01]}
          fontSize={textFontSize}
          textAlign="left"
        >
          {project.description}
        </Text>,
        ...project.outcomes.map((outcome, outcomeIndex) => {
          const outcomeY = outcomesY - lineHeight * outcomeIndex;
          return (
            <>
              <Text
                key={`project-outcome-${projectIndex}-${outcomeIndex}`}
                color="black"
                anchorX="left"
                anchorY="top"
                position={[-planeWidth / 2 + 1, outcomeY - 1, 0.01]}
                fontSize={textFontSize}
                textAlign="left"
              >
                {`- ${outcome.title}`}
              </Text>
              <Text
                key={`project-outcome-${projectIndex}-${outcomeIndex}`}
                color="black"
                anchorX="left"
                anchorY="top"
                position={[-planeWidth / 2 + 1, outcomeY - 2, 0.01]}
                fontSize={textFontSize}
                textAlign="left"
                maxWidth={planeWidth - 0.5}
              >
                {`- ${outcome.result}`}
              </Text>
            </>
          );
        }),
        <Text
          key={`project-role-${projectIndex}`}
          color="black"
          anchorX="left"
          anchorY="top"
          position={[-planeWidth / 2 + 0.5, roleY, 0.01]}
          fontSize={textFontSize}
          textAlign="left"
        >
          {`Role: ${project.role}`}
        </Text>,
      ];

      currentY = roleY - lineHeight * 2; // 다음 프로젝트의 시작 Y 위치
      return <group key={`project-group-${projectIndex}`}>{elements}</group>;
    });
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e2e2e2",
      }}
    >
      <Canvas
        orthographic
        camera={{
          zoom: 16,
          position: [0, 0, 100],
          near: 0.1,
          far: 500,
        }}
      >
        <OrbitControls
          enablePan={false}
          enableRotate={false}
          zoomSpeed={0.5}
          maxZoom={30}
          minZoom={10}
        />
        <ambientLight intensity={8} />
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[planeWidth, planeHeight]} />
          <meshStandardMaterial color="white" />
          <Text
            color="black"
            anchorX="left"
            anchorY="top"
            position={[-planeWidth / 2 + 0.5, planeHeight / 2 - 0.5, 0.01]} // planeGeometry의 왼쪽 상단에서 시작
            fontSize={0.8}
            maxWidth={planeWidth - 0.5} // planeGeometry 크기 기준 너비 제한
            lineHeight={1.2} // 줄 간격
            textAlign="right"
          >
            {username}
          </Text>
          <Text
            color="black"
            anchorX="right"
            anchorY="top"
            position={[
              planeWidth / 2 - 0.5,
              planeHeight / 2 - lineHeight * 2 - 0.5,
              0.01,
            ]} // username 아래
            fontSize={textFontSize}
            maxWidth={planeWidth - 2}
            lineHeight={1.2}
            textAlign="right"
          >
            {`E-mail : ${email}`}
          </Text>
          <Text
            color="black"
            anchorX="right"
            anchorY="top"
            position={[
              planeWidth / 2 - 0.5,
              planeHeight / 2 - lineHeight * 3 - 0.5,
              0.01,
            ]} // username 아래
            fontSize={textFontSize}
            maxWidth={planeWidth - 2}
            lineHeight={1.2}
            textAlign="right"
          >
            {`Github : github.com/${githubUrl}`}
          </Text>
          {gitInfo && (
            <>
              <Text
                color="black"
                anchorX="left"
                anchorY="top"
                position={[
                  -planeWidth / 2 + 0.5,
                  planeHeight / 2 - 5 - 0.5,
                  0.01,
                ]} // planeGeometry의 왼쪽 상단에서 시작
                fontSize={textFontSize}
                maxWidth={planeWidth - 0.5} // planeGeometry 크기 기준 너비 제한
                lineHeight={1.2} // 줄 간격
                textAlign="left" // 왼쪽 정렬
              >
                {gitInfo.introduction.description}
              </Text>

              {/* Skills 처리 */}
              {renderSkills &&
                renderTextItems(renderSkills, planeHeight / 2 - lineHeight * 4)}

              {/* Strengths 처리 */}
              {renderStrengths &&
                renderTextItems(
                  renderStrengths,
                  planeHeight / 2 -
                    lineHeight * (4 + (renderSkills ? renderSkills.length : 0))
                )}

              {/* Projects 처리 */}
              {renderProj &&
                renderProjects(
                  renderProj,
                  planeHeight / 2 -
                    lineHeight *
                      (15 +
                        (renderSkills ? renderSkills.length : 0) +
                        (renderStrengths ? renderStrengths.length : 0))
                )}
            </>
          )}
        </mesh>
      </Canvas>
    </div>
  );
};
