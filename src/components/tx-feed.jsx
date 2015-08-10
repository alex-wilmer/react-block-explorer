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
    const floatRight = { float: `right` }
    const style = {
      padding: `20px`
    , width: `500px`
    , fontFamily: `'Raleway', sans-serif`
    }
    const margin = {
      margin: `10px 0`
    }

    return (
      <div style={ style }>
        <Title data={ title } />
        <div style={ margin }>
          <span>hash</span>
          <span style={ floatRight }>satoshis</span>
        </div>
        <TxList data={ this.state.data } style={ floatRight } />
      </div>
    )
  }
})
