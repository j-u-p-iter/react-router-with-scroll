import { arePathsMatch } from "@j.u.p.iter/node-utils";

const createRouteFilter = (pathsWithDisabledScroll: string[]) => (
  pathname: string
): boolean =>
  pathsWithDisabledScroll.some((path: string) => arePathsMatch(pathname, path));

export const previousAndCurrentPathsDisabledFromScroll = (paths: string[]) => {
  const isPathDisabledFromScroll = createRouteFilter(paths);

  return (prevPathname: string, newPathname: string): boolean =>
    isPathDisabledFromScroll(prevPathname) &&
    isPathDisabledFromScroll(newPathname);
};
