export const useSendComment = async (
  value: any,
  parent: number | null,
  userId: number,
  postId: number
) => {
  try {
    const response = await fetch("http://localhost:3000/posts/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // JSON 형식으로 데이터를 전송
      },
      credentials: "include", // CORS 및 쿠키를 포함하려면 'include'로 설정
      body: JSON.stringify({
        user_id: userId,
        post_id: postId,
        parent_id: parent,
        comment: value,
      }),
    });
    if (!response.ok) {
      throw new Error("댓글실패");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
