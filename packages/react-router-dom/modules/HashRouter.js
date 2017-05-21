import React from 'react'
import PropTypes from 'prop-types'
import createHistory from 'history/createHashHistory'
import { Router } from 'react-router'

/**
 * The public API for a <Router> that uses window.location.hash.
 */
class HashRouter extends React.Component {
  static propTypes = {
    basename: PropTypes.string,
    getUserConfirmation: PropTypes.func,
    hashType: PropTypes.oneOf([ 'hashbang', 'noslash', 'slash' ]),
    children: PropTypes.node
  }

  history = createHistory(this.props)

  render() {
    if (this.props.history) {
      console.error(
        '`<HashRouter history={...}` prop has been ignored. For custom history, ' +
        'make sure to `import {Router}` and not `import {... as Router}`.')
    }

    return <Router history={this.history} children={this.props.children}/>
  }
}

export default HashRouter
