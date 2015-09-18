/*eslint-env mocha */
import expect from 'expect'
import React from 'react'
import createHistory from 'history/lib/createMemoryHistory'
import createRedirect from '../Redirect'
import createRouter from '../Router'
import createRoute from '../Route'

const Redirect = createRedirect(React)
const Router = createRouter(React)
const Route = createRoute(React)

describe('A <Redirect>', function () {

  let node
  beforeEach(function () {
    node = document.createElement('div')
  })

  afterEach(function () {
    React.unmountComponentAtNode(node)
  })

  it('works', function (done) {
    React.render((
      <Router history={createHistory('/notes/5')}>
        <Route path="/messages/:id" />
        <Redirect from="/notes/:id" to="/messages/:id" />
      </Router>
    ), node, function () {
      expect(this.state.location.pathname).toEqual('/messages/5')
      done()
    })
  })

})
