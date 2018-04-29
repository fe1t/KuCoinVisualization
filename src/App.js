import './App.css'
import React, { Component } from 'react'
import Blockchain from './containers/visualize'
import logo from './logo.svg'
import Api from './common/api/manager'
import Immutable from 'immutable'

class App extends Component {
  state = {
    raw: undefined
  }

  fetchData = async url => (await Api.get(url)).data

  async componentDidMount() {
    const raw = await this.fetchData('http://localhost:23000/blocks')
    this.setState({ raw })
  }

  render() {
    if (!this.state.raw) {
      return null
    }
    return (
      <div className="App">
        <Blockchain width="1435" height="800" raw={this.state.raw} />
      </div>
    )
  }
}

export default App
