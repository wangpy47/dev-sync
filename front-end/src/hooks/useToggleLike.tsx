export const useToggleLike = async (postId: number) => {
  try {
    const response = await fetch(
      `http://localhost:3000/posts/${postId}/like-toggle
`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("좋아요 토글 클릭 실패");
    }
    console.log(response);
    const count = await response.json();
    console.log(count);
  } catch (error) {
    return null;
  }
};
