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
import type { ResumeData } from "../../types/resume.type";

const sectionTemplates = {
  career: {
    id: "",
    type: "career",
    company: "",
    position: "",
    start_date: "",
    end_date: "",
    description: "",
    is_current: false,
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
    content: "",
  },
} as const;

interface GitResumeProps {
  sections: ResumeData;
  setSections: Dispatch<SetStateAction<ResumeData>>;
}

export const CreateSection = ({ sections, setSections }: GitResumeProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleAddSection = (type: keyof typeof sectionTemplates) => {
    const newSection = { ...sectionTemplates[type], id: crypto.randomUUID() };
    // setSections((prev) => ({
    //   ...prev,
    //   order: [...prev.order, newSection.id],
    //   entities: [...prev.entities, newSection],
    // }));
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
