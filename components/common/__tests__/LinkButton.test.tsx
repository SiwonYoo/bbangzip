import LinkButton from "@/components/common/LinkButton";
import { render, screen } from "@testing-library/react";

/**
 * LinkButton 컴포넌트 테스트
 *
 * 테스트 내용:
 * 1. 기본 렌더링 및 href 속성
 * 2. size prop에 따른 스타일 변화
 * 3. children 렌더링
 * 4. HTML 속성 전달
 */

describe("LinkButton 컴포넌트", () => {
  describe("기본 렌더링", () => {
    beforeEach(() => {
      render(<LinkButton href="/">이동</LinkButton>);
    });
    it("LinkButton이 렌더링되어야 한다", () => {
      const linkBtn = screen.getByRole("link");

      expect(linkBtn).toBeInTheDocument();
    });

    it("href 속성이 올바르게 전달되어야 한다", () => {
      const linkBtn = screen.getByRole("link");

      expect(linkBtn).toHaveAttribute("href", "/");
    });

    it("children이 올바르게 렌더링되어야 한다", () => {
      const linkBtn = screen.getByRole("link");

      expect(linkBtn).toHaveTextContent("이동");
    });
  });

  describe("size prop", () => {
    it('size="full"일 때 w-full 클래스가 적용되어야 한다', () => {
      render(<LinkButton size="full" href="/" />);
      const linkBtn = screen.getByRole("link");

      expect(linkBtn).toHaveClass("w-full");
    });

    it('size="fit"일 때 w-fit 클래스가 적용되어야 한다', () => {
      render(<LinkButton size="fit" href="/" />);
      const linkBtn = screen.getByRole("link");

      expect(linkBtn).toHaveClass("w-fit");
    });

    it("size를 지정하지 않으면 기본값 full이 적용되어야 한다", () => {
      render(<LinkButton href="/" />);
      const linkBtn = screen.getByRole("link");

      expect(linkBtn).toHaveClass("w-full");
    });
  });

  describe("HTML 속성", () => {
    it("추가 속성들이 올바르게 전달되어야 한다", () => {
      render(
        <LinkButton href="/" target="_blank" rel="noopener">
          이동
        </LinkButton>
      );
      const linkBtn = screen.getByRole("link");

      expect(linkBtn).toHaveAttribute("target", "_blank");
      expect(linkBtn).toHaveAttribute("rel", "noopener");
    });
  });
});
