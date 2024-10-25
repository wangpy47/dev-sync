/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
export const UserPage = () => {
  return (
    <div
      css={css`
        max-width: 40%;
        margin: auto;
        padding: 2rem;
        // border: 1px solid #ccc;
        border-radius: 12px;
        // box-shadow: 0 4px 8px rgba(100, 33, 33, 0.1);
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        @media (max-width: 600px) {
          max-width: 90%;
          padding: 1.5rem;
        }
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        <Avatar
          alt="User Profile"
          src="/path/to/your/profile-image.jpg"
          sx={{ width: 100, height: 100, marginBottom: 1 }}
        />
        <button
          css={css`
            margin: 0.5rem 0 0 0;
            background-color: #ffffff;
            border-radius: 8px;
            font-size: 0.7rem;
            border: 1.3px solid #d9d9d9;
            cursor: pointer;
            padding: 0.5rem;
            &:hover {
              background-color: #e8e8e8;
            }
            color: #2a2a2a;
            &:focus {
              outline: none;
              box-shadow: 0 0 0 2px rgba(38, 124, 215, 0.667);
            }
          `}
        >
          프로필 편집
        </button>
      </div>

      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        css={css`
          background-color: #f9f9f9;
        `}
      />
      <TextField
        label="E-mail"
        variant="outlined"
        fullWidth
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        css={css`
          background-color: #f9f9f9;
        `}
      />
      <TextField
        label="Join date"
        variant="outlined"
        fullWidth
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        css={css`
          background-color: #f9f9f9;
        `}
      />
      <TextField
        label="Github"
        variant="outlined"
        fullWidth
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        css={css`
          background-color: #f9f9f9;
        `}
      />
      <TextField
        label="Blog"
        variant="outlined"
        fullWidth
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        css={css`
          background-color: #f9f9f9;
        `}
      />
      <Button
        variant="contained"
        color="primary"
        css={css`
          width: 100%;
          padding: 0.8rem;
          font-weight: bold;
        `}
      >
        저장
      </Button>
    </div>
  );
};
