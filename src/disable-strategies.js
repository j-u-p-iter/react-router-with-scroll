import {matchPath} from 'react-router-dom'

const createRouteFilter = pathsWithDisabledScroll => pathname =>
  pathsWithDisabledScroll.find(path =>
    matchPath(pathname, {
      path,
      exact: true,
    }),
  )

export const previousAndCurrentPathsDisabledFromScroll = paths => {
  const isPathDisabledFromScroll = createRouteFilter(paths)

  return (prevPathname, newPathname) => {
    return (
      isPathDisabledFromScroll(prevPathname) &&
      isPathDisabledFromScroll(newPathname)
    )
  }
}
