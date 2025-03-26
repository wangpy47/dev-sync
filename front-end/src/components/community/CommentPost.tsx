/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Divider, TextField, Avatar, Popover } from "@mui/material";
import { useSelector } from "react-redux";
import { memo, useEffect, useRef, useState } from "react";
import { useEvent } from "../../hooks/useEvent";
import { useLocation, useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useRemoveComment } from "../../hooks/useRemoveComment";
import { CommentReply } from "./CommentReply";
import { useSendComment } from "../../hooks/useSendComment";
import { CommentGroup } from "./CommentGroup";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import { useGetCommentList } from "../../hooks/useGetCommentList";

const CommentLayout = memo(
  ({
    comment,
    setComments,
    comments,
    setPage,
    setTotalPages,
  }: {
    setPage: any;
    comment: any;
    comments: any[];
    setTotalPages: any;
    setComments: React.Dispatch<React.SetStateAction<any[]>>;
  }) => {
    const userId = useSelector((state: any) => state.login.loginInfo.user_id);
    const location = useLocation();
    const postId = location.state.post_id; // `navigate`에서 전달된 데이터
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [replying, setReplying] = useState({
      isReplying: false,
      parent_id: 0,
    });

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const handleDeleteComment = async () => {
      await useRemoveComment(comment.comment_id);
      // setComments((prevComments: any[]) =>
      //   prevComments.filter((c) => c.comment_id !== comment.comment_id)
      // );
      useGetCommentList(1, postId, setComments, setTotalPages);
    };

    return (
      <>
        <div
          css={css`
            padding: 0.8rem;
            font-size: 15px;
            background-color: rgba(255, 255, 255, 0.557);
            display: flex;
          `}
        >
          {comment.parent && (
            <div
              css={css`
                padding-right: ;
              `}
            >
              <SubdirectoryArrowRightIcon />
            </div>
          )}
          <div
            css={css`
              width: 100%;
            `}
          >
            <div
              css={css`
                display: flex;
                justify-content: space-between;
              `}
            >
              <div
                css={css`
                  display: flex;
                `}
              >
                <Avatar
                  src={
                    comment.profile_image ? comment.profile_image : undefined
                  }
                  sx={{ width: 38, height: 38 }}
                />
                <div
                  css={css`
                    padding: 5px;
                    line-height: 15px;
                  `}
                >
                  <div
                    css={css`
                      font-size: 14px;
                      color: #4e4e4e;
                      font-weight: bold;
                    `}
                  >
                    <span>{comment.user_name}</span>
                  </div>
                  <div>
                    <span
                      css={css`
                        font-size: 12.5px;
                        color: #7e7e7e;
                        font-weight: 100;
                      `}
                    >
                      {new Date(comment.createdAt).toLocaleString()}{" "}
                      {/* 날짜 변환 */}
                    </span>
                  </div>
                </div>
              </div>
              {comment.user_id === userId && (
                <>
                  <Button
                    css={css`
                      width: 24px;
                      height: 24px;
                      padding: 0;
                      color: #484848;
                    `}
                    aria-describedby={id}
                    onClick={handleClick}
                  >
                    <MoreHorizIcon />
                  </Button>

                  <Popover
                    id={id}
                    open={open}
                    onClose={handleClose}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top", // popover의 위쪽이 버튼 아래쪽에 맞춰짐
                      horizontal: "left", // popover의 왼쪽이 버튼 왼쪽에 맞춰짐
                    }}
                  >
                    <div
                      css={css`
                    width: 4rem;
                    height: 5.3rem;
                    font-size: 0.9rem;
                    },
                  `}
                    >
                      <div>
                        <button>수정</button>
                      </div>
                      <div>
                        <button onClick={handleDeleteComment}>삭제</button>
                      </div>
                    </div>
                  </Popover>
                </>
              )}
            </div>
            <div>{comment.comment}</div>
            <div
              css={css`
                margin-top: 1rem;
              `}
            >
              <button
                css={css`
                  border: 1px solid #d9d9d9;
                  font-size: 12px;
                  color: #2f2f2f;
                `}
                onClick={() => {
                  setReplying({
                    isReplying: !replying.isReplying,
                    parent_id: comment.comment_id,
                  });
                }}
              >
                답글
              </button>
            </div>
          </div>
        </div>
        <Divider />
        {replying.isReplying && (
          <CommentReply
            setReplying={setReplying}
            setComments={setComments}
            setPage={setPage}
            setTotalPages={setTotalPages}
            parentId={replying.parent_id}
          />
        )}

        {/* 답글이 있으면 재귀적으로 렌더링 */}
        {comment.replies && comment.replies.length > 0 && (
          <div>
            {comment.replies.map((reply: any) => (
              <CommentLayout
                setPage={setPage}
                key={reply.comment_id}
                comment={reply}
                comments={comments}
                setComments={setComments}
                setTotalPages={setTotalPages}
              />
            ))}
          </div>
        )}
      </>
    );
  }
);

export const CommentPost = () => {
  const textRef = useRef<HTMLInputElement | null>(null);
  const userId = useSelector((state: any) => state.login.loginInfo.user_id);
  const location = useLocation();
  const postId = location.state.post_id; // `navigate`에서 전달된 데이터
  const [comments, setComments] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    useGetCommentList(page, postId, setComments, setTotalPages);
  }, [page]);

  //댓글 입력시 이벤트 처리
  const eventComment = useEvent(async (value: any) => {
    await useSendComment(value, null, userId, postId);
    //댓글 추가후 첫페이지로 이동 및 댓글 가져오기
    setPage(1);
    useGetCommentList(1, postId, setComments, setTotalPages);
  });

  const handleAddComment = () => {
    if (textRef.current) {
      const textValue = textRef?.current?.value?.trim(); // 앞뒤 공백 제거
      if (textValue) {
        eventComment(textRef?.current?.value);
        //텍스트 필드 값 지우기
        textRef.current!.value = "";
      }
    }
  };

  const commentPage = Math.ceil(totalPages / 20);

  const groupComments = CommentGroup(comments);

  return (
    <>
      <div
        css={css`
          padding: 0.8rem 0;
          display: flex;
          font-size: 1.1rem;
        `}
      >
        <div
          css={css`
            color: #565656;
          `}
        >
          댓글
        </div>
        <div
          css={css`
            margin: 0 0.3rem;
            font-weight: bold;
            color: #4363ac;
          `}
        >
          {totalPages}
        </div>
      </div>
      <div
        css={css`
          min-height: fit-content;
          padding: 0rem 0rem;
          display: flex;
          gap: 5px;
        `}
      >
        <TextField
          hiddenLabel
          inputRef={textRef}
          variant="outlined"
          css={css`
            width: 80%;
            background-color: #ffffff;
            font-size: 12px;
          `}
          multiline
          maxRows={10}
        />
        <Button
          variant="contained"
          css={css`
            margin: 7px;
          `}
          onClick={() => {
            handleAddComment();
          }}
        >
          입력
        </Button>
      </div>
      {/* 댓글 그룹화된 데이터 출력 */}
      {groupComments.map((rootComment) => (
        <CommentLayout
          key={rootComment.comment_id}
          comment={rootComment}
          comments={comments}
          setComments={setComments}
          setPage={setPage}
          setTotalPages={setTotalPages}
        />
      ))}
      {totalPages > 1 && (
        <div
          css={css`
            margin-top: 1rem;
            display: flex;
            justify-content: center;
            gap: 0.5rem;
          `}
        >
          {Array.from({ length: commentPage }, (_, index) => (
            <button
              css={css`
                padding: 0;
                font-size: 14px;
              `}
              key={index + 1}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </>
  );
};
