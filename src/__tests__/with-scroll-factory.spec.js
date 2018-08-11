import React from 'react'

import {push, routerReducer} from 'react-router-redux'
import {withRouter} from 'react-router-dom'

import withScrollFactory from '../with-scroll-factory'
import {renderReduxComponent} from '../../utils'

describe('withScrollFactory', () => {
  beforeAll(() => {
    window.scrollTo = jest.fn()
  })

  afterEach(() => window.scrollTo.mockClear())

  describe('when predicate function returns false', () => {
    it('should scroll window to top', () => {
      const predicateFn = jest.fn(() => false)

      const ComponentWithScroll = withRouter(
        withScrollFactory(predicateFn)(() => <div>Hello</div>),
      )

      const {store} = renderReduxComponent({
        ui: <ComponentWithScroll />,
        rootReducer: {routing: routerReducer},
      })

      store.dispatch(push('/some-route'))

      expect(predicateFn).toHaveBeenCalledTimes(1)
      expect(predicateFn).toHaveBeenCalledWith('/', '/some-route')
      expect(window.scrollTo).toHaveBeenCalledTimes(1)
      expect(window.scrollTo).toHaveBeenCalledWith(0, 0)

      predicateFn.mockClear()
      window.scrollTo.mockClear()

      store.dispatch(push('/some-new-route'))

      expect(predicateFn).toHaveBeenCalledTimes(1)
      expect(predicateFn).toHaveBeenCalledWith('/some-route', '/some-new-route')
      expect(window.scrollTo).toHaveBeenCalledTimes(1)
      expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
    })
  })

  describe('when predicate function returns true', () => {
    it('should not scroll window to top', () => {
      const predicateFn = jest.fn(() => true)

      const ComponentWithScroll = withRouter(
        withScrollFactory(predicateFn)(() => <div>Hello</div>),
      )

      const {store} = renderReduxComponent({
        ui: <ComponentWithScroll />,
        rootReducer: {routing: routerReducer},
      })

      store.dispatch(push('/some-route'))

      expect(predicateFn).toHaveBeenCalled()
      expect(window.scrollTo).not.toHaveBeenCalled()
    })
  })
})
