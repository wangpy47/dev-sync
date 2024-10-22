import { useState } from "react";

const TestButton = () => {
    const [githubUrl, ] = useState('https://github.com/jihwankim97');
    const [blogUrl, ] = useState('https://goto-dev.tistory.com');
    const [email, ] = useState('cool102476@naver.com'); // 사용자의 이메일
    const [name, ] = useState('김지환'); // 사용자의 이메일
    const updateUserData = async () => {
      // const response = await fetch('http://localhost:3000/user/update', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Accept': 'application/json',
      //   },
      //   credentials: 'include',  // 세션 쿠키 포함
      //   body: JSON.stringify({
      //     email,
      //     name,
      //     githubUrl,
      //     blogUrl,
      //   }),
      // });
  
      // if (response.ok) {
      //   const result = await response.json();
      //   console.log('Update success:', result);
      // } else {
      //   const error = await response.json();
      //   console.error('Update failed:', error);
      // }

      fetch('http://localhost:3000/resume/get-user-repo', {
        credentials: 'include',
      })
    };

  return (
    <>
      <button onClick={updateUserData}>회원정보 추가</button>
    </>
  );
};

export default TestButton;
