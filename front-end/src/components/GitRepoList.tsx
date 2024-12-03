/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { Checkbox, Typography } from "@mui/material";

const containerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 20px 0px;
`;

const itemStyle = css`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 10px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateX(100%);
  opacity: 0;
  transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out;

  &.visible {
    transform: translateX(0);
    opacity: 1;
  }
`;

const GitRepoList = ({
  result,
  onSelectionChange,
}: {
  result: { name: string }[];
  onSelectionChange: (selected: { name: string; selected: boolean }[]) => void;
}) => {
  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);
  const [selectedItems, setSelectedItems] = useState<
    { name: string; selected: boolean }[]
  >([]);

  useEffect(() => {
    // 초기 상태 설정
    setSelectedItems(result.map((item) => ({ ...item, selected: true })));
  }, [result]);

  useEffect(() => {
    onSelectionChange(selectedItems);
  }, [selectedItems, onSelectionChange]);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    result.forEach((_, index) => {
      const timeout = setTimeout(() => {
        setVisibleIndexes((prev) => [...prev, index]);
      }, index * 100); // 0.1초 간격으로 표시
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [result]);

  const handleCheckboxChange = (index: number) => {
    setSelectedItems((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, selected: !item.selected } : item
      )
    );
  };

  return (
    <div css={containerStyle}>
      {result.map((item, index) => (
        <div
          key={index}
          css={itemStyle}
          className={visibleIndexes.includes(index) ? "visible" : ""}
        >
          <Checkbox
            defaultChecked // 기본 체크 상태
            onChange={() => handleCheckboxChange(index)}
          />
          <Typography>{item.name}</Typography>
        </div>
      ))}
    </div>
  );
};

export default GitRepoList;
