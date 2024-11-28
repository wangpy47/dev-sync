import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./Main.body.css";

const MainBody = () => {
  // Intersection Observer 설정
  const [ref1, inView1] = useInView({ triggerOnce: false, threshold: 0.2 });
  const [ref2, inView2] = useInView({ triggerOnce: false, threshold: 0.2 });
  const [ref3, inView3] = useInView({ triggerOnce: false, threshold: 0.2 });

  return (
    <div className="App">
      {/* 메인 섹션 */}
      <section className="main-section">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }} // 애니메이션 더 느리게
          className="main-title"
        >
          Dev-Sync
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }} // 애니메이션 더 느리게
          className="main-subtitle"
        >
          GitHub를 연동하여 AI로 자동 포트폴리오를 생성하세요!
        </motion.p>
      </section>

      {/* 설명 섹션 1 */}
      <section ref={ref1} className="info-section">
        <motion.div
          className="info-box"
          initial={{ opacity: 0, x: -50 }}
          animate={inView1 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.2 }} // 애니메이션 더 느리게
        >
          <h2>깃허브 레포지토리를 준비하세요</h2>
          <p>
            좋은 결과물을 얻기 위해 <strong>about</strong>을 채워넣고
            <br />
            <strong>commit</strong>에는 최대한 상세한 내용을 적어주세요.
          </p>
        </motion.div>
      </section>

      {/* 설명 섹션 2 */}
      <section ref={ref2} className="info-section">
        <motion.div
          className="info-box"
          initial={{ opacity: 0, x: 50 }}
          animate={inView2 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.2 }} // 애니메이션 더 느리게
        >
          <h2>포트폴리오를 수정하세요</h2>
          <p>
            생성된 포트폴리오를 직접 수정하고,
            <br />
            당신의 이야기를 추가해보세요.
          </p>
        </motion.div>
      </section>

      {/* 마지막 섹션 */}
      <section ref={ref3} className="info-section">
        <motion.div
          className="info-box"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView3 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2 }} // 애니메이션 더 느리게
        >
          <h2>지금 바로 시작하세요!</h2>
          <p>Dev-Sync와 함께 손쉽게 멋진 포트폴리오를 만들어보세요.</p>
        </motion.div>
      </section>
    </div>
  );
};

export default MainBody;
