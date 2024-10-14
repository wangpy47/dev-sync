import { useState } from "react";

const TestButton = () => {
  const [githubUrl] = useState('https://github.com/jihwankim97');
  const [blogUrl] = useState('https://goto-dev.tistory.com');

  const fetchUserData = async () => {
    try {
      // 서버에 GET 요청을 보냄
      console.log("featch")
      const response = await fetch('http://localhost:3000/user/getUser/cool102476@naver.com', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',  // 세션 쿠키를 포함하여 요청
      });

      if (!response.ok) {
        throw new Error('유저 정보를 가져오지 못했습니다.');
      }

      const data = await response.json();
      console.log('유저 데이터:', data);  // 응답 데이터 콘솔에 출력
    } catch (error) {
      console.error('유저 정보 가져오는 중 오류 발생:', error);
    }
  };

  return (
    <>
      <button onClick={fetchUserData}>유저 정보 가져오기</button>
    </>
  );
};

export default TestButton;
