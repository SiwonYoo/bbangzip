import Header from "@/components/common/Header";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

/**
 * Header 컴포넌트 테스트
 *
 * 테스트 내용:
 * 1. title prop 렌더링
 * 2. 홈 링크
 * 3. 로고 이미지
 */

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Header 컴포넌트", () => {
  let mockBack: jest.Mock;

  beforeEach(() => {
    mockBack = jest.fn();
    const mockUseRouter = jest.mocked(useRouter);
    mockUseRouter.mockReturnValue({ back: mockBack } as Partial<AppRouterInstance> as AppRouterInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("기본 렌더링", () => {
    it("header가 렌더링되어야 한다", () => {
      render(<Header title="title" />);
      const header = screen.getByRole("banner");

      expect(header).toBeInTheDocument();
    });

    it("title이 올바르게 렌더링되어야 한다", () => {
      render(<Header title="title" />);
      const header = screen.getByRole("heading");

      expect(header).toHaveTextContent("title");
    });
  });

  describe("홈 링크", () => {
    it("홈으로 가는 링크가 있어야 한다", () => {
      render(<Header title="title" />);
      const homeBtn = screen.getByRole("link");

      expect(homeBtn).toHaveAttribute("href", "/");
    });
  });

  describe("로고 이미지", () => {
    it("로고 이미지가 렌더링되어야 한다", () => {
      render(<Header title="title" />);
      const logo = screen.getByRole("img");

      expect(logo).toBeInTheDocument();
    });

    it("로고 이미지가 올바른 alt를 가져야 한다", () => {
      render(<Header title="title" />);
      const logo = screen.getByRole("img");

      expect(logo).toHaveAttribute("alt", "home으로 이동");
    });
  });

  describe("뒤로가기 버튼", () => {
    it("backBtn이 true면 버튼이 렌더링되어야 한다", () => {
      render(<Header title="title" backBtn={true} />);
      const backBtn = screen.getByRole("button");

      expect(backBtn).toBeInTheDocument();
    });

    it("backBtn이 false면 버튼이 렌더링되지 않아야 한다", () => {
      render(<Header title="title" backBtn={false} />);
      const backBtn = screen.queryByRole("button");

      expect(backBtn).not.toBeInTheDocument();
    });

    it("버튼 클릭 시 navigate.back()이 호출되어야 한다", async () => {
      render(<Header title="title" backBtn={true} />);
      const backBtn = screen.getByRole("button");

      await userEvent.click(backBtn);

      expect(mockBack).toHaveBeenCalled();
    });
  });
});
