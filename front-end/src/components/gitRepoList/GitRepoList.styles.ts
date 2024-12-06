/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const containerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 20px 0;
`;

export const itemStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 5px 5px 0 0;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateX(100%);
  opacity: 0;
  transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out;

  &.visible {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const commitAreaStyle = css`
  padding: 15px 10px;
  margin-left: 20px;
  background-color: #f5f5f5;
  border-left: 3px solid #ddd;
  border-radius: 0 5px 5px 0;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.05);
  animation: slide-in 0.3s ease-out;

  @keyframes slide-in {
    from {
      transform: translateX(-20px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

export const commitContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const commitStyle = css`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const commitHeaderStyle = css`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const textareaStyle = css`
  width: 100%;
  resize: none;
  padding: 5px;
  font-size: 0.9rem;
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;

  &:focus {
    border-color: #aaa;
  }
`;
