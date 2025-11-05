import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../Button";

/**
 * Button 컴포넌트 테스트
 *
 * 테스트 내용:
 * 1. 기본 렌더링
 * 2. size prop에 따른 스타일 변화
 * 3. 이벤트 핸들러 동작
 * 4. HTML 속성 전달 (disabled, type 등)
 */
describe("Button 컴포넌트", () => {
  it("버튼이 렌더링되어야 한다", () => {
    render(<Button>클릭</Button>);
    const btn = screen.getByRole("button");

    expect(btn).toBeInTheDocument();
  });

  it("children이 올바르게 렌더링되어야 한다", () => {
    render(<Button>클릭</Button>);
    const btn = screen.getByRole("button");

    expect(btn).toHaveTextContent("클릭");
  });

  describe("size prop", () => {
    it('size="full"일 때 w-full 클래스가 적용되어야 한다', () => {
      render(<Button size="full">클릭</Button>);
      const btn = screen.getByRole("button");

      expect(btn).toHaveClass("w-full");
    });

    it('size="fit"일 때 w-fit 클래스가 적용되어야 한다', () => {
      render(<Button size="fit">클릭</Button>);
      const btn = screen.getByRole("button");

      expect(btn).toHaveClass("w-fit");
    });
  });

  describe("이벤트 핸들러", () => {
    it("클릭 시 onClick 핸들러가 호출되어야 한다", async () => {
      const mockFn = jest.fn();
      render(<Button onClick={mockFn}>클릭</Button>);
      const user = userEvent.setup();
      const btn = screen.getByRole("button");

      await user.click(btn);

      expect(mockFn).toHaveBeenCalled();
    });

    it("disabled 상태에서는 onClick이 호출되지 않아야 한다", async () => {
      const mockFn = jest.fn();
      render(
        <Button disabled onClick={mockFn}>
          클릭
        </Button>
      );
      const btn = screen.getByRole("button");
      const user = userEvent.setup();

      await user.click(btn);

      expect(mockFn).not.toHaveBeenCalled();
    });
  });

  describe("HTML 속성", () => {
    it("disabled 속성이 올바르게 적용되어야 한다", () => {
      render(<Button disabled>클릭</Button>);
      const btn = screen.getByRole("button");

      expect(btn).toHaveAttribute("disabled");
    });

    it("type 속성이 올바르게 적용되어야 한다", () => {
      render(<Button type="button">클릭</Button>);
      const btn = screen.getByRole("button");

      expect(btn).toHaveAttribute("type", "button");
    });
  });
});
