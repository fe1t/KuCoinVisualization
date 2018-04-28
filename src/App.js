import './App.css'
import React, { Component } from 'react'
import Blockchain from './containers/visualize'
import logo from './logo.svg'
import Api from './common/api/manager'
import Immutable from 'immutable'

const raw = {
  name: 'Hello World',
  children: [{ name: 'pispa pispa', children: null }]
}

const fetchData = async url => {
  const blocks = (await Api.get(url)).data
  return blocks
}

function MyBlockchain(props) {
  let data = fetchData(props.url)
  return data.then(d => <Blockchain width="1435" height="800" raw={d} />)
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <MyBlockchain url="http://localhost:23000/blocks" />
      </div>
    )
  }
}

export default App
