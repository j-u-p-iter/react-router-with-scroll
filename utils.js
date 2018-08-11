import React from 'react'
import {Provider} from 'react-redux'
import {render} from 'react-testing-library'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {routerMiddleware, ConnectedRouter} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

export const renderReduxComponent = ({
  ui,
  initialState = {},
  rootReducer = {},
  rootSaga,
}) => {
  const history = createHistory()
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [routerMiddleware(history), sagaMiddleware]
  const store = createStore(
    combineReducers(rootReducer),
    initialState,
    applyMiddleware(...middlewares),
  )

  const dispatchSpy = jest.spyOn(store, 'dispatch')

  if (rootSaga) {
    sagaMiddleware.run(rootSaga)
  }

  return {
    renderResults: render(
      <Provider store={store}>
        <ConnectedRouter history={history}>{ui}</ConnectedRouter>
      </Provider>,
    ),
    store,
    dispatchSpy,
  }
}
