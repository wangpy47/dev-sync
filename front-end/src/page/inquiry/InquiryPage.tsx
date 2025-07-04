/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as styles from "../../components/contact/Inquiry.styles";
import { useSelector } from "react-redux";

// 저장된 문의 데이터 (조회 시 사용)
export interface Inquiry {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export const InquiryPage = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    // fetchInquiries();
  }, []);
  // 문의사항 조회

  const fetchInquiries = async () => {
    setLoading(true); // 버튼 비활성화 시작
    try {
      const response = await fetch(
        `http://localhost:3000/contact/inquiries?email=${email}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch inquiries");
      }

      const data: Inquiry[] = await response.json();
      setInquiries(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // 반드시 로딩 상태 해제
    }
  };

  return (
    <div css={styles.container}>
      <div css={styles.card}>
        <h2 css={styles.title}>내 문의 </h2>
        <div css={styles.inputGroup}>
          <button onClick={() => navigate("/inquiry/new")} disabled={loading}>
            문의 하기
          </button>
          <button onClick={fetchInquiries} disabled={loading}>
            {loading ? "조회 중..." : "문의 조회"}
          </button>
        </div>

        {inquiries?.length > 0 ? (
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
      </div>
    </div>
  );
};
