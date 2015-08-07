(() => {
  const TxList = React.createClass({
    render() {
      const latestTransaction = this.props.data
      return (
        <ul>hey { latestTransaction }</ul>
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
        const data = self.state.data.unshift(response).slice(0, 9)
        self.setState({ data })
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
