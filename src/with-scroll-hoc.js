import withScrollFactory from './with-scroll-factory'
import {previousAndCurrentPathsDisabledFromScroll} from './disable-strategies'

const withScrollHOC = paths =>
  withScrollFactory(previousAndCurrentPathsDisabledFromScroll, paths)

export default withScrollHOC
