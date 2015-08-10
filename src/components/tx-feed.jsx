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
    const title = { text: `latest transactions` }
    const style = {
      padding: `20px`
    , width: `500px`
    , fontFamily: `'Raleway', sans-serif`
    }

    return (
      <div style={ style }>
        <Title data={ title } />
        <span>hash</span>
        <span>satoshis</span>
        <TxList data={ this.state.data } />
      </div>
    )
  }
})
