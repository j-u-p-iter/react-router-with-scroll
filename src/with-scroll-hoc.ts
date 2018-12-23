import { previousAndCurrentPathsDisabledFromScroll } from "./disable-scroll-strategies";
import { withScrollHocFactory } from "./with-scroll-hoc-factory";

export const withScrollHoc = (paths: string[]) =>
  withScrollHocFactory(previousAndCurrentPathsDisabledFromScroll(paths));
