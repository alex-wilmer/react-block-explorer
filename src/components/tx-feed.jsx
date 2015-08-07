(() => {
  const TxList = React.createClass({
    render() {
      const latestTransactions = this.props.data.map(tx => {
        return (
          <li>{ tx.id }</li>
        )
      })

      return (
        <ul>{ latestTransactions }</ul>
      )
    }
  })

  const TxFeed = React.createClass({
    getInitialState() {
      return { data: [] }
    }

  , componentDidMount() {
      const self = this

      socket.on(`new_transaction`, response => {
        self.state.data.unshift(response)
        self.setState({ data: self.state.data.slice(0, 9) })
      })
    }

  , render() {
      return (
        <div>
          <h1>latest transactions</h1>
          <TxList data={ this.state.data } />
        </div>
      )
    }
  })

  const socket = io.connect(location.href)

  React.render(
    <TxFeed />
  , document.getElementById('mount-point'))

}())
