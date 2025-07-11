/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Box,
  Chip,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid";
type ResumeSummary = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  headline: string;
  skills: string[];
};

export const ResumeListPage = () => {
  const resumeList: ResumeSummary[] = [
    {
      id: "resume-001",
      name: "홍길동",
      email: "hong@example.com",
      phoneNumber: "010-1234-5678",
      headline: "프론트엔드 개발자 · React 전문가",
      skills: ["React", "TypeScript", "Emotion", "Vite"],
    },
    {
      id: "resume-002",
      name: "이영희",
      email: "lee@example.com",
      phoneNumber: "010-9876-5432",
      headline: "풀스택 개발자 · Next.js & Node.js",
      skills: ["Next.js", "Node.js", "Prisma", "PostgreSQL"],
    },
    {
      id: "resume-003",
      name: "이영희",
      email: "lee@example.com",
      phoneNumber: "010-9876-5432",
      headline: "풀스택 개발자 · Next.js & Node.js",
      skills: ["Next.js", "Node.js", "Prisma", "PostgreSQL"],
    },
    {
      id: "resume-004",
      name: "이영희",
      email: "lee@example.com",
      phoneNumber: "010-9876-5432",
      headline: "풀스택 개발자 · Next.js & Node.js",
      skills: ["Next.js", "Node.js", "Prisma", "PostgreSQL"],
    },
    {
      id: "resume-005",
      name: "이영희",
      email: "lee@example.com",
      phoneNumber: "010-9876-5432",
      headline: "풀스택 개발자 · Next.js & Node.js",
      skills: ["Next.js", "Node.js", "Prisma", "PostgreSQL"],
    },
  ];

  return (
    <Box
      css={css`
        max-width: 900px;
        margin: auto;
        padding: 0 1rem;
      `}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom color="#ffffff">
        기존 이력서 목록
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Grid container spacing={3}>
        {resumeList.map((resume) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={resume.id}>
            <Card
              variant="outlined"
              css={css`
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                transition: box-shadow 0.3s ease;
                color: #333333;
                background-color: #ffffffdf;
                &:hover {
                  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                }
              `}
            >
              <CardContent>
                <Typography variant="h6" fontWeight={600}>
                  {resume.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  css={css`
                    margin-bottom: 0.3rem;
                  `}
                >
                  {resume.email}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  css={css`
                    margin-bottom: 0.5rem;
                  `}
                >
                  {resume.phoneNumber}
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight="500"
                  css={css`
                    margin-bottom: 0.8rem;
                  `}
                >
                  {resume.headline}
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ gap: 1 }}
                  flexWrap="wrap"
                >
                  {resume.skills.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Stack>
              </CardContent>
              <Box
                css={css`
                  padding: 0 1rem 1rem;
                `}
              >
                <Button variant="contained" size="small" fullWidth>
                  선택하기
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
