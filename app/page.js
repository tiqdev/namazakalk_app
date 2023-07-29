"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import { RxReset } from "react-icons/rx";

export default function Home() {
  const [isDone, setIsDone] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("sabahnamazi");
    if (data) {
      const { isDone, date } = JSON.parse(data);
      const now = new Date();
      if (
        now.getDate() === new Date(date).getDate() &&
        now.getMonth() === new Date(date).getMonth() &&
        now.getFullYear() === new Date(date).getFullYear()
      ) {
        setIsDone(isDone);
        setTimeout(() => {
          confettiPlay();
        }, 1000);
      }
    }
    setPageLoaded(true);
  }, []);

  const handleClicked = () => {
    localStorage.setItem(
      "sabahnamazi",
      JSON.stringify({ isDone: true, date: new Date() })
    );
    setIsDone(true);
    confettiPlay();
  };

  const reset = () => {
    localStorage.removeItem("sabahnamazi");
    setIsDone(false);
  };

  //confetti patlatma fonksiyonu
  const confettiPlay = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: {
        x: 0.5,
        y: 0.5,
      },
    });
  };

  return (
    <main className="flex h-screen flex-col items-center justify-between py-24 px-12 bg-primary relative">
      <h1 className="text-4xl font-bold text-center text-secondary">
        Namaza Kalktın Mı?
      </h1>

      <AnimatePresence>
        {!pageLoaded ? (
          "Yükleniyor..."
        ) : isDone ? (
          <div className="flex flex-col flex-1 items-center justify-center">
            <motion.img
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.1, opacity: 1 }}
              transition={{ duration: 1, ease: "backInOut" }}
              src="/smile.png"
              alt="emoji"
              className="w-32 h-32 drop-shadow-md"
            />
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "backInOut" }}
              className="text-2xl font-bold text-center text-secondary mt-[20px]"
            >
              Çok Şükür <br /> Kalktım
            </motion.h2>
          </div>
        ) : (
          <div className="flex flex-col flex-1 items-center justify-center space-y-[20px]">
            <motion.img
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.1, opacity: 1 }}
              transition={{ duration: 1, ease: "backInOut" }}
              src="/sleepy.png"
              alt="emoji"
              className="w-32 h-32"
            />
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "backInOut" }}
              onClick={handleClicked}
              className="px-[12px] py-[16px] text-xl font-bold text-center text-primary bg-secondary rounded-[24px]"
            >
              Kalkıyorum İnşallah
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      <div
        onClick={reset}
        className="w-[32px] h-[32px] flex items-center justify-center fixed top-[48px] right-[48px] cursor-pointer"
      >
        <RxReset className="w-[28px] h-[28px]" />
      </div>
    </main>
  );
}
