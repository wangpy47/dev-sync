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

// import { useState } from "react";

// const TestButton = () => {
//     const [githubUrl, ] = useState('https://github.com/jihwankim97');
//     const [blogUrl, ] = useState('https://goto-dev.tistory.com');
//     const [email, ] = useState('cool102476@naver.com'); // 사용자의 이메일
//     const [name, ] = useState('김지환'); // 사용자의 이메일
//     const updateUserData = async () => {
//       const response = await fetch('http://localhost:3000/user/update', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//         },
//         credentials: 'include',  // 세션 쿠키 포함
//         body: JSON.stringify({
//           email,
//           name,
//           githubUrl,
//           blogUrl,
//         }),
//       });
  
//       if (response.ok) {
//         const result = await response.json();
//         console.log('Update success:', result);
//       } else {
//         const error = await response.json();
//         console.error('Update failed:', error);
//       }

//       // fetch('http://localhost:3000/resume/get-user-repo', {
//       //   credentials: 'include',
//       // })
//     };

//   return (
//     <>
//       <button onClick={updateUserData}>회원정보 추가</button>
//     </>
//   );
// };

// export default TestButton;

// import { useState } from "react";

// const TestButton = () => {

//     const updateUserData = async () => {
//       const response = await fetch('http://localhost:3000/resume/get-user-repo', {
//         method: 'GET',
//         credentials: 'include',  // 세션 쿠키 포함
//       });
  
//       if (response.ok) {
//         const result = await response.json();
            
//             // result 객체 배열을 텍스트로 변환하여 자소서 생성을 위한 요약 데이터로 사용
//             const profileData = result.map(repo => 
//                 `Repository: ${repo.name}\nDescription: ${repo.description || 'N/A'}\nLanguage: ${repo.language || 'N/A'}\nSize: ${repo.size} KB\nStars: ${repo.stargazers_count}\nForks: ${repo.forks_count}\nRecent Commit Messages: ${repo.recent_commit_messages.join(', ')}\n`
//             ).join("\n");

//             // console.log(profileData)
//       await generateResume(profileData);
//       } else {
//         const error = await response.json();
//         console.error('Update failed:', error);
//       }

//     };


//     const generateResume = async (profileData:object[]) => {
//       try {
//         const response = await fetch('http://localhost:3000/resume/generate', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ profileData }),
//         });
  
//         const result = await response.json();
//         console.log(result.resume);
//       } catch (error) {
//         console.error('Error generating resume:', error);
//       }
//     };

//   return (
//     <>
//       <button onClick={updateUserData}>깃</button>
//     </>
//   );
// };

// export default TestButton;