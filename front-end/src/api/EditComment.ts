
export const EditComment = async(comment: string, commentId: number) => {
       console.log(comment,  commentId)
    try{
       const response = await fetch(`http://localhost:3000/posts/comment` ,{
        method : "PATCH",
        headers: {
            "Content-Type": "application/json", // JSON 형식으로 데이터를 전송
          },
        credentials: "include", // CORS 및 쿠키를 포함하려면 'include'로 설정
        body: JSON.stringify({
            comment: comment,
            comment_id : commentId
        }),
       })
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "글 편집에 실패 했어요.");
          }
          const data = await response.json();
     console.log(data)
    }
    catch(error){
     console.error(error);
    }
}