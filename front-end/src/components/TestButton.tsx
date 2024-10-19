import { useState } from "react";

const TestButton = () => {
  const [githubUrl] = useState('https://github.com/jihwankim97');
  const [blogUrl] = useState('https://goto-dev.tistory.com');

  const fetchUserData = async () => {
    fetch('http://localhost:3000/auth/logout', {
      method: 'GET',
      credentials: 'include', // 쿠키를 포함하여 요청
    })
      .then((response) => {
        if (response.ok) {
          console.log('Logged out');
          window.location.href = '/login'; // 로그아웃 후 리디렉션
        }
      })
      .catch((error) => {
        console.error('Logout failed', error);
      });
  };

  return (
    <>
      <button onClick={fetchUserData}>회원정보 추가</button>
    </>
  );
};

export default TestButton;
