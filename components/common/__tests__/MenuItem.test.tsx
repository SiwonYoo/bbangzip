import MenuItem from "@/components/common/MenuItem";
import { render, screen } from "@testing-library/react";

/**
 * MenuItem 컴포넌트 테스트
 *
 * 테스트 내용:
 * 1. 기본 렌더링 (링크, 이미지, 텍스트)
 * 2. blank prop에 따른 target/rel 속성
 * 3. disabled prop에 따른 스타일
 */

describe("MenuItem 컴포넌트", () => {
  const mockMenu = {
    link: "/testLink",
    imgPath: "/testImgPath",
    title: "testTitle",
    description: "testDescription",
  };

  describe("기본 렌더링", () => {
    it("링크가 올바른 href를 가져야 한다", () => {
      render(<MenuItem menu={mockMenu} />);
      const menuItem = screen.getByRole("link");

      expect(menuItem).toHaveAttribute("href", "/testLink");
    });

    it("이미지가 올바른 src와 alt를 가져야 한다", () => {
      render(<MenuItem menu={mockMenu} />);
      const menuImage = screen.getByRole("img");

      expect(menuImage).toHaveAttribute("src", mockMenu.imgPath);
      expect(menuImage).toHaveAttribute("alt", `${mockMenu.title} 아이콘`);
    });

    it("title과 description이 렌더링되어야 한다", () => {
      render(<MenuItem menu={mockMenu} />);

      expect(screen.getByText(mockMenu.title)).toBeInTheDocument();
      expect(screen.getByText(mockMenu.description)).toBeInTheDocument();
    });
  });

  describe("blank prop", () => {
    it("blank가 true면 target이 _blank여야 한다", () => {
      render(<MenuItem menu={{ ...mockMenu, blank: true }} />);
      const menuItem = screen.getByRole("link");

      expect(menuItem).toHaveAttribute("target", "_blank");
    });

    it("blank가 true면 rel이 'noopener noreferrer'여야 한다", () => {
      render(<MenuItem menu={{ ...mockMenu, blank: true }} />);
      const menuItem = screen.getByRole("link");

      expect(menuItem).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("blank가 false면 target이 _self여야 한다", () => {
      render(<MenuItem menu={{ ...mockMenu, blank: false }} />);
      const menuItem = screen.getByRole("link");

      expect(menuItem).toHaveAttribute("target", "_self");
    });

    it("blank가 없으면 기본값으로 target이 _self여야 한다", () => {
      render(<MenuItem menu={mockMenu} />);
      const menuItem = screen.getByRole("link");

      expect(menuItem).toHaveAttribute("target", "_self");
    });
  });

  describe("disabled prop", () => {
    it("disabled가 true면 opacity-50 클래스를 가져야 한다", () => {
      render(<MenuItem menu={{ ...mockMenu, disabled: true }} />);
      const menuItem = screen.getByRole("link");

      expect(menuItem).toHaveClass("opacity-50");
    });

    it("disabled가 true면 pointer-events-none 클래스를 가져야 한다", () => {
      render(<MenuItem menu={{ ...mockMenu, disabled: true }} />);
      const menuItem = screen.getByRole("link");

      expect(menuItem).toHaveClass("pointer-events-none");
    });

    it("disabled가 false면 opacity-50 클래스를 가지지 않아야 한다", () => {
      render(<MenuItem menu={{ ...mockMenu, disabled: false }} />);
      const menuItem = screen.getByRole("link");

      expect(menuItem).not.toHaveClass("opacity-50");
    });

    it("disabled가 false면 pointer-events-none 클래스를 가지지 않아야 한다.", () => {
      render(<MenuItem menu={{ ...mockMenu, disabled: false }} />);
      const menuItem = screen.getByRole("link");

      expect(menuItem).not.toHaveClass("pointer-events-none");
    });
  });
});
