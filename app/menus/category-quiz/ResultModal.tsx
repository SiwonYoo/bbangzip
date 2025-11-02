"use client";

import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import Image from "next/image";
import Button from "@/components/common/Button";

interface ResultModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isAnswer: boolean;
  breadName: string;
  categoryName: string;
  handleClickNext: () => void;
}

function ResultModal({ isOpen, setIsOpen, isAnswer, breadName, categoryName, handleClickNext }: ResultModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleAlertClose = () => {
    setIsOpen(false);
    handleClickNext();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      dialogRef.current?.focus();

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Enter" || event.key === "Escape") {
          event.preventDefault();
          handleAlertClose();
        }
      };

      window.addEventListener("keydown", handleKeyDown, true);

      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown, true);
      };
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed flex h-dvh min-w-100 max-w-3xl mx-auto inset-0 justify-center items-center bg-black/50 z-10">
          <div
            role="dialog"
            className="flex flex-col gap-4 items-center p-8 w-[90%] max-w-100 rounded-4xl bg-white z-10 text-center"
            ref={dialogRef}
            tabIndex={-1}
          >
            <div>
              <Image
                src={isAnswer ? "/images/bbangzip-icons/happy-bbangzip.png" : "/images/bbangzip-icons/sad-bbangzip.png"}
                alt={isAnswer ? "정답 아이콘" : "오답 아이콘"}
                width={100}
                height={100}
                className="mb-4"
              />
              {isAnswer ? <p>정답이에요!</p> : <p>틀렸어요ㅠㅠ</p>}
            </div>
            <div className="text-center">
              <p>
                <span className="text-t-primary text-2xl">{breadName}</span>은/는
              </p>
              <p>
                <span className="text-t-primary text-2xl">{categoryName}</span>이에요!
              </p>
            </div>

            <Button size="full" onClick={handleAlertClose}>
              다음 문제
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default ResultModal;
