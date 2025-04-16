// MainBody.tsx
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./Main.body.css";
import homepage from "../../assets/homepage.png";

const MainBody = () => {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div className="main-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            코드를 기록했다면,
            <br />
            이젠 보여줄 차례
            <br />
            자동생성 <span>AI 포트폴리오</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            더 이상 이력서와 포트폴리오 작성에 시간을 낭비하지 마세요.
            <br />
            AI가 당신의 개발 커리어를 기록해드립니다.
          </motion.p>
          <motion.button
            className="start-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            지금 시작하기 →
          </motion.button>
        </div>
        <motion.div
        // className="hero-image"
        // initial={{ opacity: 0, scale: 0.95 }}
        // animate={{ opacity: 1, scale: 1 }}
        // transition={{ duration: 1.2, delay: 0.4 }}
        >
          <img className="img-main" src={homepage} alt="포트폴리오 미리보기" />
        </motion.div>
      </section>

      {/* Section 1 */}
      <section ref={ref1} className="info-section">
        <motion.div
          className="info-box"
          initial={{ opacity: 0, x: -50 }}
          animate={inView1 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.2 }}
        >
          <h2>GitHub와 블로그만 있으면 충분합니다.</h2>
          <p>AI가 자동으로 이력과 기술 스택, 프로젝트 요약을 정리해줍니다.</p>
        </motion.div>
      </section>

      {/* Section 2 */}
      <section ref={ref2} className="info-section">
        <motion.div
          className="info-box"
          initial={{ opacity: 0, x: 50 }}
          animate={inView2 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.2 }}
        >
          <h2>당신만의 이야기로 꾸미세요.</h2>
          <p>
            생성된 포트폴리오를 직접 수정하고, 원하는 내용을 추가할 수 있습니다.
          </p>
        </motion.div>
      </section>

      {/* Section 3 */}
      <section ref={ref3} className="info-section">
        <motion.div
          className="info-box"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView3 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2 }}
        >
          <h2>커뮤니티에서 공유하고 피드백 받기</h2>
          <p>
            다른 개발자와 포트폴리오를 공유하고, 댓글과 피드백을 받아보세요.
          </p>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>지금 바로 Dev-Sync를 시작해보세요.</h2>
        <button className="start-button">무료로 시작하기</button>
      </section>
    </div>
  );
};

export default MainBody;
