import React from 'react'
import PropTypes from 'prop-types'

const withScrollFactory = (disableScroll, paths) => Component => {
  class WithScroll extends React.Component {
    propTypes = {
      location: PropTypes.object.isRequired,
    }

    componentDidUpdate({location: {pathname: prevPathname}}) {
      const {
        location: {pathname: newPathname},
      } = this.props

      const isScrollDisabled = paths ? disableScroll(paths) : disableScroll

      if (!isScrollDisabled(prevPathname, newPathname)) {
        window.scrollTo(0, 0)
      }
    }

    render() {
      return <Component {...this.props} />
    }
  }

  return WithScroll
}

export default withScrollFactory
