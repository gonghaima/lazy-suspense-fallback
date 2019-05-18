import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import lazyImport from './lazyImport'

const FunComponent = lazyImport('./FunComponent')
const TerribleComponent = lazyImport('./TerribleComponent')
const TestComponent = lazyImport('./TestComponent')

const LoadingMessage = () => (
  "I'm loading..."
)

const App = () => (
  <Router>
    <div>
      <header>
        <nav>
          <div>
            <Link to="/">
              Home
            </Link>
          </div>

          <div>
            <Link to="/fun">
              Fun
            </Link>
          </div>

          <div>
            <Link to="/terrible">
              Terrible
            </Link>
          </div>
        </nav>
      </header>

      <br />

      <Suspense fallback={<LoadingMessage />}>
        <Switch>
          <Route path="/fun">
            <FunComponent />
          </Route>

          <Route path="/terrible">
            <TerribleComponent />
          </Route>

          <Route>
            <TestComponent />
          </Route>
        </Switch>
      </Suspense>
    </div>
  </Router>
)

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
