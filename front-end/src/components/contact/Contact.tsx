/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as styles from "./Contact.styles";

interface Inquiry {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

const Contact: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const navigate = useNavigate();


  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  //TODO:서버에서 이메일 기반으로 문의 리스트 가져오기 
  const fetchInquiries = async () => {
    
  };

  return (
    <div css={styles.container}>
      <div css={styles.card}>
        <h2 css={styles.title}>내 문의사항</h2>
        <div css={styles.inputGroup}>
          <label>이메일 입력</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="이메일을 입력하세요"
          />
          <button onClick={fetchInquiries}>조회하기</button>
        </div>

        {inquiries.length > 0 ? (
          <ul css={styles.inquiryList}>
            {inquiries.map((inquiry) => (
              <li key={inquiry.id}>
                <p>제목: {inquiry.subject}</p>
                <p>내용: {inquiry.message}</p>
                <p>작성일: {new Date(inquiry.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>조회된 문의사항이 없습니다.</p>
        )}

        <button css={styles.bottomButton} onClick={() => navigate("/contact_form")}>
          문의하기
        </button>
      </div>
    </div>
  );
};

export default Contact;
