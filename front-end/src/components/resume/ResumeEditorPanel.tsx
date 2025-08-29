import { css } from "@emotion/react";
import { useState, type Dispatch, type SetStateAction } from "react";
import type { ResumeData, ResumeSection } from "../../types/resume.type";

import { ProfileSection } from "./sections/ProfileSection";
import { SkillsSection } from "./sections/SkillsSection";
import { AchievementSection } from "./sections/AchievementSection";
import { CareerSection } from "./sections/CareerSection";
import { IntroductionSection } from "./sections/IntroductionSection";
import { ProjectsSection } from "./sections/ProjectsSection";

import { CreateSection } from "./CreateSection";
import { CustomSection } from "./sections/CustomSection";

const containerStyle = css`
  height: 100vh;
  margin: 2rem;
`;

interface GitResumeProps {
  sections: ResumeData;
  // setSections: Dispatch<SetStateAction<ResumeData>>;
}

export const ResumeEditorPanel = ({
  sections,
}: // setSections,
  GitResumeProps) => {
  const [isEditing, setEditing] = useState<Record<string, boolean>>({});

  const onEdit = (id: string) => {
    setEditing((prev) => ({ ...prev, [id]: true }));
  };

  const onSave = (id: string) => {
    setEditing((prev) => ({ ...prev, [id]: false }));
  };


  const renderSection = (section: ResumeSection) => {
    const common = {
      isEditing: isEditing[section.id],
      onEdit: () => onEdit(section.id),
      onSave: () => onSave(section.id),
    };

    switch (section.type) {
      case "profile":
        return (
          <ProfileSection key={section.id} section={section} {...common} />
        );
      case "skills":
        return <SkillsSection key={section.id} section={section} {...common} />;
      case "careers":
        return <CareerSection key={section.id} section={section} {...common} />;
      case "achievements":
        return (
          <AchievementSection key={section.id} section={section} {...common} />
        );
      case "projects":
        return (
          <ProjectsSection key={section.id} section={section} {...common} />
        );
      case "introduction":
        return (
          <IntroductionSection key={section.id} section={section} {...common} />
        );
      case "custom":
        return (
          <CustomSection key={section.id} section={section} {...common} />
        )
      default:
        return null;
    }
  };

  const { order, entities } = sections;

  return (
    <div css={containerStyle}>
      {order.map((id) => {
        const section = entities.find((entity) => entity.id === id);
        if (!section) return null;
        return renderSection(section);
      })}
      <CreateSection sections={sections} />
    </div>
  );
};
