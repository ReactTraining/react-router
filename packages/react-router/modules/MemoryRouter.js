import React from 'react'
import PropTypes from 'prop-types'
import createHistory from 'history/createMemoryHistory'
import Router from './Router'

/**
 * The public API for a <Router> that stores location in memory.
 */
class MemoryRouter extends React.Component {
  static propTypes = {
    initialEntries: PropTypes.array,
    initialIndex: PropTypes.number,
    getUserConfirmation: PropTypes.func,
    keyLength: PropTypes.number,
    children: PropTypes.node
  }

  history = createHistory(this.props)

  render() {
    if (this.props.history) {
      console.error(
        '`<MemoryRouter history={...}` prop has been ignored. For custom history, ' +
        'make sure to `import {Router}` and not `import {... as Router}`.')
    }

    return <Router history={this.history} children={this.props.children}/>
  }
}

export default MemoryRouter
