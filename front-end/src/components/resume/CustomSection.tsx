/** @jsxImportSource @emotion/react */
import { TextField, Box, css, Typography, Button } from "@mui/material";

const contentStyle = css`
  border: 2px solid #c7c7c7;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const titleStyle = css`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const CustomSection = ({ section, isEditing, id }) => {
  return (
    <div key={id} css={contentStyle}>
      <div css={titleStyle}>
        {/* <Typography variant="h5"> </Typography> */}
        <TextField label="타이틀 입력" fullWidth variant="standard">
          {section.title}
        </TextField>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "1.5rem",
            width: "100%",
          }}
        >
          <TextField label="내용 입력" fullWidth multiline rows={4}>
            {section.content}
          </TextField>
        </div>
      </div>
    </div>
  );
};

export default CustomSection;
