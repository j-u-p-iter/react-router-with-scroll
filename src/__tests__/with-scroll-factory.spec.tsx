import {
  createWindowMock,
  renderWithReactRouter
} from "@j.u.p.iter/react-test-utils";
import React from "react";

import { withScrollHocFactory } from "../.";

describe("withScrollFactory", () => {
  let windowScrollToMock: ReturnType<typeof createWindowMock>;

  beforeAll(() => {
    windowScrollToMock = createWindowMock("scrollTo");
  });

  describe("when disableScrollStrategy returns false", () => {
    it("should scroll window to top", () => {
      const coordinatesScrollTo = [0, 0];
      const defaultPath = "/";
      const disableScrollStrategy = jest.fn(() => false);
      const renderResult: ReturnType<
        typeof renderWithReactRouter
      > = renderWithReactRouter(
        withScrollHocFactory(disableScrollStrategy)(() => <div>Hello</div>)
      );

      const firstPathGoTo = "/some-path";
      renderResult.goTo!(firstPathGoTo);

      expect(disableScrollStrategy).toHaveBeenCalledTimes(1);
      expect(disableScrollStrategy).toHaveBeenCalledWith(
        defaultPath,
        firstPathGoTo
      );
      expect(windowScrollToMock).toHaveBeenCalledTimes(1);
      expect(windowScrollToMock).toHaveBeenCalledWith(...coordinatesScrollTo);

      disableScrollStrategy.mockClear();
      windowScrollToMock.mockClear();

      const secondPathGoTo = "/some-new-path";
      renderResult.goTo!(secondPathGoTo);

      expect(disableScrollStrategy).toHaveBeenCalledTimes(1);
      expect(disableScrollStrategy).toHaveBeenCalledWith(
        firstPathGoTo,
        secondPathGoTo
      );
      expect(windowScrollToMock).toHaveBeenCalledTimes(1);
      expect(windowScrollToMock).toHaveBeenCalledWith(...coordinatesScrollTo);

      windowScrollToMock.mockClear();
    });
  });

  describe("when disableScrollStrategy returns true", () => {
    it("should not scroll window to top", () => {
      const defaultPath = "/";
      const pathToGo = "/some-path";
      const disableScrollStrategy = jest.fn(() => true);
      const renderResult: ReturnType<
        typeof renderWithReactRouter
      > = renderWithReactRouter(
        withScrollHocFactory(disableScrollStrategy)(() => <div>Hello</div>)
      );

      renderResult.goTo!(pathToGo);

      expect(disableScrollStrategy).toHaveBeenCalledTimes(1);
      expect(disableScrollStrategy).toHaveBeenCalledWith(defaultPath, pathToGo);
      expect(windowScrollToMock).not.toHaveBeenCalled();
    });
  });
});
