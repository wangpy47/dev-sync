import { useCallback, useEffect, useState } from "react";
import { updateResume } from "../redux/resumeSlice";
import { useDispatch } from "react-redux";
import type { ResumeSection } from "../types/resume.type";
import dayjs from "dayjs";

export const useLocalSection = <T extends ResumeSection>(
  section: T,
  onSave: () => void
) => {
  const [localSection, setLocalSection] = useState<T>(section);
  const dispatch = useDispatch();

  const handleChange = useCallback(
    (key: string, value: number | string | typeof dayjs) => {
      setLocalSection((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  //   useEffect(() => {
  //     setLocalSection(section);
  //     console.log("유즈이펙트");
  //   }, [section]);

  const SaveSection = () => {
    dispatch(updateResume(localSection));
    console.log("저장시", localSection);
    onSave();
  };

  return { handleChange, SaveSection, localSection };
};
