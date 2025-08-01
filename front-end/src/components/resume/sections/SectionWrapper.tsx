import { css } from "@emotion/react";
import { Button, Typography } from "@mui/material";
import { sectionBar } from "../../../styles/resumeLayerStyle";

const contentStyle = css`
  border: 1.5px solid #dbdbdb;
  border-radius: 10px;
  padding: 1.5rem 2.5rem;
  margin-bottom: 2rem;
`;

const titleStyle = css`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;
export const SectionWrapper = ({
  title,
  onEdit,
  onSave,
  onDelete,
  isEditing,
  children,
}: {
  title?: string;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onDelete?: () => void;
  children: React.ReactNode;
}) => {
  console.log(isEditing);
  return (
    <div css={contentStyle}>
      <Typography css={titleStyle} variant="h5">
        {title}
      </Typography>
      <div css={sectionBar} />
      {children}
      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "2rem",
        }}
      >
        {isEditing && <Button>삭제</Button>}
        <Button
          css={css`
            margin-left: auto;
          `}
          variant="contained"
          onClick={isEditing ? onSave : onEdit}
        >
          {isEditing ? "저장" : "수정"}
        </Button>
      </div>
    </div>
  );
};
