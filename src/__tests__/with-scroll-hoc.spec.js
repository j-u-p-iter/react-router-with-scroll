import React from 'react'

import {push, routerReducer} from 'react-router-redux'
import {withRouter} from 'react-router-dom'

import withScrollHOC from '../with-scroll-hoc'
import {renderReduxComponent} from '../../utils'

const PATHS_WITH_DISABLED_SCROLL = ['/', '/some-path']

describe('withScrollHOC', () => {
  let renderData

  beforeAll(() => {
    window.scrollTo = jest.fn()

    const ComponentWithScroll = withRouter(
      withScrollHOC(PATHS_WITH_DISABLED_SCROLL)(() => <div>Hello</div>),
    )

    renderData = renderReduxComponent({
      ui: <ComponentWithScroll />,
      rootReducer: {routing: routerReducer},
    })
  })

  beforeEach(() => {
    renderData.store.dispatch(push('/'))

    window.scrollTo.mockClear()
  })

  describe('when both routes should be disabled', () => {
    it('should not scroll window to top', () => {
      // move from '/' to '/some-path'
      renderData.store.dispatch(push('/some-path'))

      expect(window.scrollTo).not.toHaveBeenCalledTimes(1)
    })
  })

  describe('when previous or new routes should not be disabled', () => {
    it('should scroll window to top', () => {
      // move from '/' to '/some-new-path'
      renderData.store.dispatch(push('/some-new-path'))

      expect(window.scrollTo).toHaveBeenCalledTimes(1)
      expect(window.scrollTo).toHaveBeenCalledWith(0, 0)

      window.scrollTo.mockClear()

      // move from '/some-new-path' to '/some-path'
      renderData.store.dispatch(push('/some-path'))

      expect(window.scrollTo).toHaveBeenCalledTimes(1)
      expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
    })
  })

  describe('when both routes should not be disabled', () => {
    beforeEach(() => {
      renderData.store.dispatch(push('/'))
      window.scrollTo.mockClear()
    })

    it('should scroll window to top', () => {
      renderData.store.dispatch(push('/one-more-not-disabled-path'))

      expect(window.scrollTo).toHaveBeenCalledTimes(1)
      expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
    })
  })
})
