/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, CircularProgress } from "@mui/material";
import { useCallback, useEffect } from "react";
import GitRepoList from "../../components/gitRepoList/GitRepoList";
import { useNavigate, useOutletContext } from "react-router-dom";
import type { ResumeContextType } from "../../layout/ResumeSetupLayout ";

export const GitConnectPage = () => {
  const {
    repoData,
    selectedRepos,
    setSelectedRepos,
    setIsLoading,
    setRepoData,
    isLoading,
  } = useOutletContext<ResumeContextType>();

  const navigate = useNavigate();
  const handleSelectionChange = useCallback(
    (
      updatedSelection: {
        name: string;
        selected: boolean;
        commits: { message: string; description: string };
      }[]
    ) => {
      setSelectedRepos(updatedSelection);
    },
    []
  );

  const generateResume = async (repoData: any[]) => {
    const filteredRepos = repoData.filter((repo) => repo.selected);

    setIsLoading(true);
    const profileData = filteredRepos
      .map((repo) => {
        const commitDetails = repo.commits
          .map(
            (commit, index) =>
              `- ${commit.message}\n  Description: ${
                commit.description || "No additional details provided"
              }`
          )
          .join("\n");

        return `Repository: ${repo.name}\nDescription: ${
          repo.description || "N/A"
        }\nLanguage: ${repo.language || "N/A"}\nSize: ${repo.size} KB\nStars: ${
          repo.stargazers_count
        }\nForks: ${
          repo.forks_count
        }\nRecent Commit Details:\n${commitDetails}\n`;
      })
      .join("\n");

    try {
      const response = await fetch("http://localhost:3000/resumes/generate", {
        method: "POST",
        credentials: "include", // 세션 쿠키 포함
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ profileData: filteredRepos }),
      });

      const result = await response.json();
      console.log(result);
      //   setGitInfo(result);
      //   setGitBtnClick(true);
      navigate("/resume/editor", { state: result });
    } catch (error) {
      console.error("Error generating resume:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // repoData가 없을 경우에만 복구
    if (repoData.length === 0) {
      const saved = sessionStorage.getItem("repoData");
      if (saved) {
        const parsed = JSON.parse(saved);
        setRepoData(parsed);
      }
    }
  }, []);

  if (isLoading) {
    return (
      <div
        css={css`
          display: flex;
          justify-content: center;
          margin-top: 3%;
        `}
      >
        <CircularProgress size={80} />
      </div>
    );
  }
  return (
    <>
      {repoData.length > 0 && (
        <>
          <GitRepoList
            result={repoData}
            onSelectionChange={handleSelectionChange}
          />
          <div
            css={css`
              width: 59%;
              justify-content: flex-end;
              display: flex;
              margin: 0 auto 5rem auto;
              position: relative;

              @media (max-width: 768px) {
                justify-content: center;
                margin: 0;
                width: 100%;
              }
            `}
          >
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={() => {
                generateResume(selectedRepos);
              }}
            >
              이력서 만들기
            </Button>
          </div>
        </>
      )}
    </>
  );
};
