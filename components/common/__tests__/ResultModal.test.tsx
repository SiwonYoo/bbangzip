import ResultModal from "@/components/common/ResultModal";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

/**
 * ResultModal 컴포넌트 테스트
 *
 * 테스트 내용:
 * 1. 조건부 렌더링 (isOpen)
 * 2. isAnswer에 따른 이미지/텍스트 변화
 * 3. breadName, categoryName 렌더링
 * 4. 버튼 클릭 시 핸들러 호출
 * 5. 키보드 이벤트 (Enter, Escape)
 */

describe("ResultModal 컴포넌트", () => {
  const setIsOpen = jest.fn();
  const handleClickNext = jest.fn();

  beforeEach(() => {
    setIsOpen.mockClear();
    handleClickNext.mockClear();
  });

  const mockProps = {
    isOpen: true,
    setIsOpen,
    isAnswer: true,
    breadName: "빵이름",
    categoryName: "카테고리이름",
    handleClickNext,
  };

  describe("조건부 렌더링", () => {
    it("isOpen이 true면 모달이 렌더링되어야 한다", () => {
      render(<ResultModal {...mockProps} />);
      const resultModal = screen.queryByRole("dialog");

      expect(resultModal).toBeInTheDocument();
    });

    it("isOpen이 false면 모달이 렌더링되지 않아야 한다", () => {
      render(<ResultModal {...{ ...mockProps, isOpen: false }} />);
      const resultModal = screen.queryByRole("dialog");

      expect(resultModal).not.toBeInTheDocument();
    });
  });

  describe("isAnswer에 따른 UI 변화", () => {
    it("isAnswer가 true면 happy 이미지가 렌더링되어야 한다", () => {
      render(<ResultModal {...mockProps} />);
      const resultImg = screen.getByRole("img");

      expect(resultImg).toHaveAttribute("src", "/images/bbangzip-icons/happy-bbangzip.png");
    });

    it("isAnswer가 true면 '정답이에요!' 텍스트가 보여야 한다", () => {
      render(<ResultModal {...mockProps} />);

      expect(screen.getByText("정답이에요!")).toBeInTheDocument();
    });

    it("isAnswer가 false면 sad 이미지가 렌더링되어야 한다", () => {
      render(<ResultModal {...{ ...mockProps, isAnswer: false }} />);
      const resultImg = screen.getByRole("img");

      expect(resultImg).toHaveAttribute("src", "/images/bbangzip-icons/sad-bbangzip.png");
    });

    it("isAnswer가 false면 '틀렸어요ㅠㅠ' 텍스트가 보여야 한다", () => {
      render(<ResultModal {...{ ...mockProps, isAnswer: false }} />);

      expect(screen.getByText("틀렸어요ㅠㅠ")).toBeInTheDocument();
    });
  });

  describe("빵 정보 렌더링", () => {
    it("breadName이 올바르게 렌더링되어야 한다", () => {
      render(<ResultModal {...mockProps} />);

      expect(screen.getByText(mockProps.breadName)).toBeInTheDocument();
    });

    it("categoryName이 올바르게 렌더링되어야 한다", () => {
      render(<ResultModal {...mockProps} />);

      expect(screen.getByText(mockProps.categoryName)).toBeInTheDocument();
    });
  });

  describe("버튼 클릭", () => {
    it("버튼 클릭 시 setIsOpen(false)와 handleClickNext가 호출되어야 한다", async () => {
      render(<ResultModal {...mockProps} />);
      const btn = screen.getByRole("button");

      await userEvent.click(btn);

      expect(setIsOpen).toHaveBeenCalledWith(false);
      expect(handleClickNext).toHaveBeenCalled();
    });
  });

  describe("키보드 이벤트", () => {
    it("Enter 키 누르면 모달이 닫히고 다음 문제로 넘어가야 한다", async () => {
      const user = userEvent.setup();
      render(<ResultModal {...mockProps} />);

      await user.keyboard("{Enter}");

      expect(setIsOpen).toHaveBeenCalledWith(false);
      expect(handleClickNext).toHaveBeenCalled();
    });

    it("Escape 키 누르면 모달이 닫히고 다음 문제로 넘어가야 한다", async () => {
      const user = userEvent.setup();
      render(<ResultModal {...mockProps} />);

      await user.keyboard("{Escape}");

      expect(setIsOpen).toHaveBeenCalledWith(false);
      expect(handleClickNext).toHaveBeenCalled();
    });
  });
});
