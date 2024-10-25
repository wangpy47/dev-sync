import { useState } from "react";

const TestButton = () => {
  const [githubUrl] = useState('https://github.com/jihwankim97');
  const [blogUrl] = useState('https://goto-dev.tistory.com');
  const [email] = useState('cool102476@naver.com');
  const [name] = useState('김지환');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    console.log(event.target.files[0]); // 파일 객체 출력
    setSelectedFile(event.target.files[0]); // 선택된 파일 저장
  };

  const updateUserData = async () => {
    if (!selectedFile) {
      console.error("파일을 선택하세요.");
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile); // 선택된 파일 추가
    formData.append('email', email);
    formData.append('name', name);
    formData.append('githubUrl', githubUrl);
    formData.append('blogUrl', blogUrl);

    try {
      const response = await fetch('http://localhost:3000/user/update', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Update success:', result);
      } else {
        const error = await response.json();
        console.error('Update failed:', error.message || error);
      }
    } catch (error) {
      console.error('Error during update:', error);
    }
  };

  return (
    <>
      <input type="file" onChange={handleFileChange} />
      <button onClick={updateUserData}>회원정보 추가</button>
    </>
  );
};

export default TestButton;

// import { useState } from "react";

// const TestButton = () => {
//     const [githubUrl, ] = useState('https://github.com/jihwankim97');
//     const [blogUrl, ] = useState('https://goto-dev.tistory.com');
//     const [email, ] = useState('cool102476@naver.com'); // 사용자의 이메일
//     const [name, ] = useState('김지환'); // 사용자의 이메일
//     const updateUserData = async () => {
//       // const response = await fetch('http://localhost:3000/user/update', {
//       //   method: 'POST',
//       //   headers: {
//       //     'Content-Type': 'application/json',
//       //     'Accept': 'application/json',
//       //   },
//       //   credentials: 'include',  // 세션 쿠키 포함
//       //   body: JSON.stringify({
//       //     email,
//       //     name,
//       //     githubUrl,
//       //     blogUrl,
//       //   }),
//       // });
  
//       // if (response.ok) {
//       //   const result = await response.json();
//       //   console.log('Update success:', result);
//       // } else {
//       //   const error = await response.json();
//       //   console.error('Update failed:', error);
//       // }

//       fetch('http://localhost:3000/resume/get-user-repo', {
//         credentials: 'include',
//       })
//     };

//   return (
//     <>
//       <button onClick={updateUserData}>회원정보 추가</button>
//     </>
//   );
// };

// export default TestButton;
