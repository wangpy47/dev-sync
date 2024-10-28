// import { useState } from "react";

// const TestButton = () => {
//   const [email] = useState('cool102476@naver.com'); // 사용자의 이메일
//   const [selectedFile, setSelectedFile] = useState(null); // 선택된 파일 상태

//   const handleFileChange = (event) => {
//     console.log(event.target.files[0]); // 파일 객체 출력
//     setSelectedFile(event.target.files[0]); // 선택된 파일 저장
//   };

//   const updateProfileImage = async () => {
//     if (!selectedFile) {
//       console.error("파일을 선택하세요.");
//       return;
//     }
  
//     const formData = new FormData();
//     formData.append('file', selectedFile); // 선택된 파일 추가
  
//     try {
//       const response = await fetch('http://localhost:3000/user/updateProfile', {
//         method: 'POST',
//         body: formData,
//         credentials: 'include', // 세션 쿠키 포함
//       });
  
//       if (response.ok) {
//         const result = await response.json();
//         console.log('Profile image update success:', result);
//       } else {
//         const error = await response.json();
//         console.error('Profile image update failed:', error.message || error);
//       }
//     } catch (error) {
//       console.error('Error during profile update:', error);
//     }
//   };

//   return (
//     <>
//       <input type="file" onChange={handleFileChange} /> {/* 파일 선택 */}
//       <button onClick={updateProfileImage}>프로필 이미지 변경</button>
//     </>
//   );
// };

// export default TestButton;

import { useState } from "react";

const TestButton = () => {
    const [githubUrl, ] = useState('https://github.com/jihwankim971');
    const [blogUrl, ] = useState('https://goto-dev.tistory.com1');
    const [email, ] = useState('cool102476@naver.com'); // 사용자의 이메일
    const [name, ] = useState('김지환1'); // 사용자의 이메일
    const updateUserData = async () => {
      const response = await fetch('http://localhost:3000/user/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',  // 세션 쿠키 포함
        body: JSON.stringify({
          email,
          name,
          githubUrl,
          blogUrl,
        }),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Update success:', result);
      } else {
        const error = await response.json();
        console.error('Update failed:', error);
      }

      // fetch('http://localhost:3000/resume/get-user-repo', {
      //   credentials: 'include',
      // })
    };

  return (
    <>
      <button onClick={updateUserData}>회원정보 추가</button>
    </>
  );
};

export default TestButton;
