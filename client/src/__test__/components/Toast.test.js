import React from "react";
import Toast from "../../components/Toast";
import { render, screen } from "@testing-library/react";

test("render a toast with className error", () => {
  const { container } = render(<Toast title="error" type="error" />);

  expect(container.getElementsByClassName("error-bg").length).toBe(1);
});

test("render a toast with className success", () => {
  const { container } = render(<Toast title="success" type="success" />);

  expect(container.getElementsByClassName("success-bg").length).toBe(1);
});
