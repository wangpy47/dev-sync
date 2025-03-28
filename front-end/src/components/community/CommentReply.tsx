/** @jsxImportSource @emotion/react */
import { Button, css, Divider, TextField } from "@mui/material";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import { useRef } from "react";
import { useSendComment } from "../../hooks/useSendComment";
import { useEvent } from "../../hooks/useEvent";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useGetCommentList } from "../../hooks/useGetCommentList";

export const CommentReply = ({
  parentId,
  setPage,
  setComments,
  setTotalPages,
  setReplying,
}: {
  setPage: any;
  parentId: number;
  setComments: any;
  setTotalPages: any;
  setReplying: any;
}) => {
  const location = useLocation();
  const userId = useSelector((state: any) => state.login.loginInfo.user_id);
  const postId = location.state.post_id; // `navigate`에서 전달된 데이터
  const textRef = useRef<HTMLInputElement | null>(null);

  const replyComment = useEvent(async (value: any) => {
    await useSendComment(value, parentId, userId, postId);
    setPage(1);
    useGetCommentList(1, postId, setComments, setTotalPages);
  });

  const onChangeTextField = () => {
    if (textRef.current) {
      const textValue = textRef?.current?.value?.trim();
      if (textValue) {
        replyComment(textRef?.current?.value);
        setReplying(false);
      }
    }
  };

  return (
    <div
      css={css`
        background-color: rgba(255, 255, 255, 0.557);
      `}
    >
      <div
        css={css`
          padding: 1rem 1.5rem 0 1.5rem;
          // justify-content: center;
          display: flex;
        `}
      >
        <SubdirectoryArrowRightIcon />
        <div
          css={css`
            width: 100%;
            padding-left: 1rem;
          `}
        >
          <TextField
            hiddenLabel
            inputRef={textRef}
            variant="outlined"
            css={css`
              width: 100%;
              background-color: #ffffff;
              font-size: 12px;
              height: 100%;
              overflow-y: auto;
            `}
            multiline
            maxRows={20}
          />
        </div>
      </div>
      <div
        css={css`
          display: flex;
          justify-content: flex-end;
          margin: 0.5rem 1.5rem;
          gap: 0.3rem;
        `}
      >
        <Button variant="contained" onClick={onChangeTextField}>
          입력
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setReplying(false);
          }}
        >
          취소
        </Button>
      </div>
      <Divider />
    </div>
  );
};
