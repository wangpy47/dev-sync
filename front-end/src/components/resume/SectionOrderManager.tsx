import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Fade,
} from "@mui/material";
import type { ResumeData } from "../../types/resume.type";
import { useEffect, useRef, useState } from "react";

interface Props {
  sections: ResumeData;
  onReorder: (newOrder: string[]) => void;
  onClose: () => void;
}

export const SectionOrderManager = ({
  sections,
  onReorder,
  onClose,
}: Props) => {
  const [localOrder, setLocalOrder] = useState(sections.order);
  const initialOrderRef = useRef<string[]>([]);

  useEffect(() => {
    initialOrderRef.current = sections.order;
  }, []);
  //일단 , 리스트가 변경되면 setLocal 로

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const newOrder = [...localOrder];
    const [removed] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, removed);
    // onReorder(newOrder);
    setLocalOrder(newOrder);
  };

  return (
    <Fade in>
      <Paper
        elevation={6}
        sx={{
          width: 250,
          height: 500,
          p: 2,
          bgcolor: "#ffffff",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight={600}
          textAlign="center"
          mb={1}
        >
          섹션 순서 변경
        </Typography>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="sectionList">
            {(provided) => (
              <List
                dense
                ref={provided.innerRef}
                {...provided.droppableProps}
                sx={{
                  flex: 1,
                  overflowY: "auto",
                  border: "1px solid #ddd",
                  borderRadius: 1,
                  mb: 1.5,
                }}
              >
                {localOrder.map((id, index) => {
                  const entity = sections.entities[id];
                  const label =
                    entity.type === "custom"
                      ? entity.title
                      : (
                          {
                            basicInfo: "기본 정보",
                            skills: "기술 스택",
                            projects: "프로젝트",
                            introduction: "소개",
                          } as const
                        )[entity.type];

                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided, snapshot) => (
                        <ListItem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          disablePadding
                          sx={{
                            background: snapshot.isDragging
                              ? "#f0f8ff"
                              : "transparent",
                          }}
                        >
                          <ListItemButton>
                            <ListItemText primary={label} />
                            <div
                              {...provided.dragHandleProps}
                              style={{
                                cursor: "grab",
                                padding: "4px 6px",
                                color: "#aaa",
                              }}
                            >
                              ☰
                            </div>
                          </ListItemButton>
                        </ListItem>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </DragDropContext>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={() => setLocalOrder(initialOrderRef.current)}>
            취소
          </button>
          <button onClick={() => onReorder(localOrder)}>확인</button>
        </div>
      </Paper>
    </Fade>
  );
};
