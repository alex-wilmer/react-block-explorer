const TxFeed = React.createClass({
  getInitialState () {
    return { data: [] }
  }

, componentDidMount () {
    const socket = io.connect(location.href)

    socket.on(`new_transaction`, response => {
      this.state.data.unshift(response)
      this.setState({ data: this.state.data.slice(0, this.props.limit + 1) })
    })
  }

, render () {
    const title = { text: `latest transactions`, classList: `tx-title` }

    return (
      <div className='tx-feed'>
        <Title data={ title } />
        <TxList data={ this.state.data } />
      </div>
    )
  }
})
