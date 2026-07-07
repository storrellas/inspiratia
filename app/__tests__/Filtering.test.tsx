import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Filtering from "@/app/_components/Filtering";

describe("Filtering", () => {
  it("submits the current filter values", () => {
    const onFilter = vi.fn();
    const onReset = vi.fn();
    const onHide = vi.fn();

    render(
      <Filtering onFilter={onFilter} onReset={onReset} onHide={onHide} />
    );

    fireEvent.change(screen.getByPlaceholderText("Filter by ID..."), {
      target: { value: "12" },
    });
    fireEvent.change(screen.getByPlaceholderText("Filter by user ID..."), {
      target: { value: "34" },
    });
    fireEvent.change(screen.getByPlaceholderText("Filter by title..."), {
      target: { value: "HELLO" },
    });
    fireEvent.change(screen.getByPlaceholderText("Filter by body..."), {
      target: { value: "World" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Filter" }));

    expect(onFilter).toHaveBeenCalledTimes(1);
    expect(onFilter).toHaveBeenCalledWith({
      id: 12,
      userId: 34,
      title: "hello",
      body: "world",
    });
    expect(onReset).not.toHaveBeenCalled();
    expect(onHide).not.toHaveBeenCalled();
  });

  it("resets the inputs and calls onReset", () => {
    const onFilter = vi.fn();
    const onReset = vi.fn();
    const onHide = vi.fn();

    render(
      <Filtering onFilter={onFilter} onReset={onReset} onHide={onHide} />
    );

    fireEvent.change(screen.getByPlaceholderText("Filter by ID..."), {
      target: { value: "7" },
    });
    fireEvent.change(screen.getByPlaceholderText("Filter by title..."), {
      target: { value: "Sample" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Reset" }));

    expect(onReset).toHaveBeenCalledTimes(1);
    expect(onFilter).not.toHaveBeenCalled();
    expect(screen.getByPlaceholderText("Filter by ID...")).toHaveValue(null);
    expect(screen.getByPlaceholderText("Filter by title...")).toHaveValue("");
  });

  it("calls onHide when the close icon is clicked", () => {
    const onFilter = vi.fn();
    const onReset = vi.fn();
    const onHide = vi.fn();

    const { container } = render(
      <Filtering onFilter={onFilter} onReset={onReset} onHide={onHide} />
    );

    fireEvent.click(container.querySelector("i.fa-times") as HTMLElement);

    expect(onHide).toHaveBeenCalledTimes(1);
    expect(onFilter).not.toHaveBeenCalled();
    expect(onReset).not.toHaveBeenCalled();
  });
});