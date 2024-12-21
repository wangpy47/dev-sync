/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as styles from "./Contact.styles";


// 저장된 문의 데이터 (조회 시 사용)
export interface Inquiry {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

// 문의 제출용 폼 데이터 (제출 시 사용)
export interface InquiryFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}


const Contact: React.FC = () => {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // 입력값 변경 핸들러
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 문의사항 제출
  const submitInquiry = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3000/contact/contact-submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit inquiry");
      }

      alert("문의가 성공적으로 제출되었습니다!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error:", error);
      alert("문의 제출에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 문의사항 조회
  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/contact/inquiries?email=${formData.email}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch inquiries");
      }

      const data: Inquiry[] = await response.json();
      setInquiries(data);
    } catch (error) {
      console.error("Error:", error);
      alert("문의사항 조회에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div css={styles.container}>
      <div css={styles.card}>
        <h2 css={styles.title}>내 문의사항</h2>
        <div css={styles.inputGroup}>
          <label>이름</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="이름을 입력하세요"
          />

          <label>이메일</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="이메일을 입력하세요"
          />

          <label>제목</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="제목을 입력하세요"
          />

          <label>내용</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="내용을 입력하세요"
          ></textarea>

          <button onClick={submitInquiry} disabled={loading}>
            {loading ? "전송 중..." : "문의 제출"}
          </button>
          <button onClick={fetchInquiries} disabled={loading}>
            {loading ? "조회 중..." : "문의 조회"}
          </button>
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

        <button
          css={styles.bottomButton}
          onClick={() => navigate("/contact_form")}
        >
          문의하기
        </button>
      </div>
    </div>
  );
};

export default Contact;
