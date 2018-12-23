import {
  renderWithReactRouter,
  RenderWithReactRouter
} from "@j.u.p.iter/react-test-utils";
import React from "react";

import { withScrollHoc } from "../.";

describe("withScrollHOC", () => {
  let renderData: ReturnType<RenderWithReactRouter>;
  let windowScrollToMock: any;
  let firstDisabledPath: string;
  let secondDisabledPath: string;
  const coordinatesScrollTo = [0, 0];

  beforeAll(() => {
    const pathsWithDisabledScroll = ["/", "/some-path"];
    [firstDisabledPath, secondDisabledPath] = pathsWithDisabledScroll;

    windowScrollToMock = jest
      .spyOn(window, "scrollTo")
      .mockImplementation(() => {});

    renderData = renderWithReactRouter(
      withScrollHoc(pathsWithDisabledScroll)(() => <div>Hello</div>)
    );
  });

  beforeEach(() => {
    renderData.goTo!(firstDisabledPath);

    windowScrollToMock.mockClear();
  });

  describe("when both routes should be disabled", () => {
    it("does not scroll window to top", () => {
      // move from '/' to '/some-path'
      renderData.goTo!(secondDisabledPath);

      expect(windowScrollToMock).not.toHaveBeenCalledTimes(1);
    });
  });

  describe("when previous or new routes should not be disabled", () => {
    it("scrolls window to top", () => {
      const notDisabledPath = "/some-new-path";

      // move from '/' to '/some-new-path'
      renderData.goTo!(notDisabledPath);

      expect(windowScrollToMock).toHaveBeenCalledTimes(1);
      expect(windowScrollToMock).toHaveBeenCalledWith(...coordinatesScrollTo);

      windowScrollToMock.mockClear();

      // move from '/some-new-path' to '/some-path'
      renderData.goTo!(secondDisabledPath);

      expect(windowScrollToMock).toHaveBeenCalledTimes(1);
      expect(windowScrollToMock).toHaveBeenCalledWith(...coordinatesScrollTo);
    });
  });

  describe("when both routes should not be disabled", () => {
    beforeEach(() => {
      const notDisabledPath = "/some-not-disabled-path";

      renderData.goTo!(notDisabledPath);
      windowScrollToMock.mockClear();
    });

    it("scrolls window to top", () => {
      const notDisabledPath = "/one-more-not-disabled-path";

      renderData.goTo!(notDisabledPath);

      expect(windowScrollToMock).toHaveBeenCalledTimes(1);
      expect(windowScrollToMock).toHaveBeenCalledWith(...coordinatesScrollTo);
    });
  });
});
