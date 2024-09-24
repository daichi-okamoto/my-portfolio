// src/components/Loading.jsx
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

function Loading({ onFinish }) {
  const nameControls = useAnimation();
  const thinLineControls = useAnimation();
  const thickLineControls = useAnimation();

  useEffect(() => {
    async function sequence() {
      // 1. 名前のフェードインとスライドアップ
      await nameControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 },
      });

      // 3. 薄いロードラインのスケールイン
      await thinLineControls.start({
        scaleX: 1,
        transition: { duration: 0.4 },
      });

      // 3. スケールインの間に遅延を追加（0.3秒）
      await new Promise((resolve) => setTimeout(resolve, 300));

      // 4. 濃いロードラインのスケールイン（薄いロードラインのスケールイン後に開始）
      await thickLineControls.start({
        scaleX: 1,
        transition: { duration: 0.6 },
      });

      // 4. 名前のフェードアウトとスライドダウン
      await nameControls.start({
        opacity: 0,
        y: 5, // 5px 下に移動
        transition: { duration: 0.7 },
      });

      // 5. 薄いロードラインと濃いロードラインの transformOrigin を右に変更
      await Promise.all([
        thinLineControls.set({ transformOrigin: 'right' }),
        thickLineControls.set({ transformOrigin: 'right' }),
      ]);

      // 6. 薄いロードラインと濃いロードラインのスケールアウト（同時に消える）
      await Promise.all([
        thinLineControls.start({
          scaleX: 0,
          transition: { duration: 0.5, ease: 'easeIn' },
        }),
        thickLineControls.start({
          scaleX: 0,
          transition: { duration: 0.5, ease: 'easeIn' },
        }),
      ]);

      // 7. アニメーション終了後にメインコンテンツを表示
      onFinish();
    }

    sequence();
  }, [nameControls, thinLineControls, thickLineControls, onFinish]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
      {/* 名前のフェードイン・アウト */}
      <motion.h1
        initial={{ opacity: 0, y: 5 }}
        animate={nameControls}
        className="tracking-[0.4em] font-bold mb-2"
      >
        DAICHI OKAMOTO
      </motion.h1>

      {/* ロードラインのコンテナ */}
      <div className="w-72 h-1 relative">
        {/* 薄いロードライン */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={thinLineControls}
          className="absolute top-0 left-0 w-full h-1 bg-black bg-opacity-10 origin-left z-10"
        ></motion.div>

        {/* 濃いロードライン */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={thickLineControls}
          className="absolute top-0 left-0 w-full h-1 bg-black origin-left z-20"
        ></motion.div>
      </div>
    </div>
  );
}

export default Loading;
