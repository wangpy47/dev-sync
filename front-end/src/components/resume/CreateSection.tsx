import React, { useState, type Dispatch, type SetStateAction } from "react";
import {
  Popover,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  css,
} from "@mui/material";
import type { AchievementItem, AchievementsTypeSection, CareerItem, CareersTypeSection, ResumeData } from "../../types/resume.type";
import { addResume } from "../../redux/resumeSlice";
import { useDispatch } from "react-redux";

const sectionTemplates = {
  career: {
    id: "",
    type: "career",
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
    isCurrent: false,
    technologies: [] as string[],
  },
  achievement: {
    id: "",
    type: "achievement",
    title: "",
    organization: "",
    date: "",
    description: "",
  },
  custom: {
    id: "",
    type: "custom",
    title: "",
    description: "",
  },
} as const;

interface GitResumeProps {
  sections: ResumeData;
  setSections?: Dispatch<SetStateAction<ResumeData>>;
}

export const CreateSection = ({ sections }: GitResumeProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const dispatch = useDispatch();
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleAddSection = (type: "career" | "achievement" | "custom") => {
    if (type === "career" || type === "achievement") {
      const sectionKey = type === "career" ? "careers" : "achievements";

      // 새 item 생성
      const newItem: CareerItem | AchievementItem =
        type === "career"
          ? {
            id: crypto.randomUUID(),
            type: "career",
            company: "",
            position: "",
            startDate: "",
            endDate: "",
            description: "",
          }
          : {
            id: crypto.randomUUID(),
            type: "achievement",
            title: "",
            organization: "",
            date: "",
            description: "",
          };

      dispatch(
        addResume((prev) => {
          const existingSection = prev.entities.find(
            (s) => s.type === sectionKey
          ) as CareersTypeSection | AchievementsTypeSection | undefined;

          if (existingSection) {
            // 이미 섹션이 있으면 items에 추가
            return {
              ...prev,
              entities: prev.entities.map((s) => {
                if (s.id !== existingSection.id) return s;

                if (s.type === "careers") {
                  return { ...s, items: [...s.items, newItem as CareerItem] };
                }
                if (s.type === "achievements") {
                  return {
                    ...s,
                    items: [...s.items, newItem as AchievementItem],
                  };
                }
                return s;
              }),
            };
          } else {
            // 섹션이 없으면 새로 생성
            const newSection =
              type === "career"
                ? {
                  id: crypto.randomUUID(),
                  type: "careers" as const,
                  items: [newItem as CareerItem],
                }
                : {
                  id: crypto.randomUUID(),
                  type: "achievements" as const,
                  items: [newItem as AchievementItem],
                };

            return {
              ...prev,
              order: [...prev.order, newSection.id],
              entities: [...prev.entities, newSection],
            };
          }
        })
      );
    } else if (type === "custom") {
      // custom은 섹션 자체를 새로 추가
      const newSection = {
        ...sectionTemplates.custom,
        id: crypto.randomUUID(),
      };
      dispatch(
        addResume((prev) => ({
          ...prev,
          order: [...prev.order, newSection.id],
          entities: [...prev.entities, newSection],
        }))
      );
    }

    handleClose();
  };



  const open = Boolean(anchorEl);

  return (
    <>
      <div
        css={css`
          text-align: center;
        `}
      >
        <Button
          variant="outlined"
          size="large"
          onClick={handleOpen}
          sx={{ borderRadius: "8px", textTransform: "none", fontWeight: 600 }}
        >
          + 섹션 추가하기
        </Button>
      </div>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        transformOrigin={{ vertical: "bottom", horizontal: "center" }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(8, 8, 8, 0.315)",
            },
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "grid",
            gap: 2,
            width: 220,
          }}
        >
          {[
            { type: "career", label: "경력", desc: "회사, 직무, 기간 기록" },
            {
              type: "achievement",
              label: "자격증 / 수상",
              desc: "자격증, 수상 이력 기록",
            },
            { type: "custom", label: "기본", desc: "봉사활동, 기타 작성" },
          ].map(({ type, label, desc }) => (
            <Card
              key={type}
              sx={{
                cursor: "pointer",
                boxShadow: "none",
                border: "1px solid #cdcbcb",
                borderRadius: "12px",
                "&:hover": { background: "#dfdfdf6b" },
              }}
              onClick={() =>
                handleAddSection(type as keyof typeof sectionTemplates)
              }
            >
              <CardContent>
                <Typography
                  variant="body1"
                  css={css`
                    font-weight: bold;
                  `}
                >
                  {label}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {desc}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Popover>
    </>
  );
};
