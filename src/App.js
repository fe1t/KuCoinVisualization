import './App.css'
import React, { Component } from 'react'
import Blockchain from './containers/visualize'
import Api from './common/api/manager'
import moment from 'moment'

class App extends Component {
  state = {
    raw: undefined,
    nodeData: undefined
  }

  fetchData = async url => (await Api.get(url)).data

  async componentDidMount() {
    const targetURL = '2' + process.env.REACT_APP_NODE_ID
    const url = `http://localhost:${targetURL}/blocks`
    const raw = await this.fetchData(url)
    setInterval(async () => {
      const raw = await this.fetchData(url)
      this.setState({ raw })
    }, 15000)
    this.setState({ raw })
  }

  setNodeData = (event, node) => {
    if (node && node.data !== this.state.nodeData) {
      this.setState({ nodeData: node.data })
    } else if (!node) {
      this.setState({ nodeData: undefined })
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }

  render() {
    const nodeData = this.state.nodeData
    if (!this.state.raw) {
      return null
    }

    // alert(
    //   `Block Height: ${JSON.stringify(node.data.name)}\nBlock Hash: ${JSON.stringify(
    //     node.data.hash
    //   )}\nBlock PrevHash: ${JSON.stringify(node.data.prevHash)}\n`
    // )
    return (
      <div className="App">
        <div className="nodeTopLeftHeader"> Node: {process.env.REACT_APP_NODE_ID}</div>
        {nodeData && (
          <div className="nodeTopRightHeader">
            <p> Block Height: {JSON.stringify(nodeData.name)} </p>
            <p> Block Hash: {JSON.stringify(nodeData.hash)} </p>
            <p> Block PrevHash: {JSON.stringify(nodeData.prevHash)} </p>
            <p> Block Nonce: {JSON.stringify(nodeData.nonce)} </p>
            <p>
              Block Timestamp: {JSON.stringify(nodeData.timestamp)} (
              {moment().format('LLLL')})
            </p>
          </div>
        )}
        <Blockchain width="1435" height="800" raw={this.state.raw} mouseOverCallback={this.setNodeData} />
      </div>
    )
  }
}

export default App
