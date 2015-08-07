(() => {
  const TxFeed = React.createClass({
    render() {
      const latestTransaction = this.props.data.id

      return (
        <h1>Latest transaction id: { latestTransaction }</h1>
      )
    }
  })

  const socket = io.connect(location.href)

  socket.on(`new_transaction`, data => {
    React.render(
      <TxFeed data={ data }/>
    , document.getElementById('mount-point'))
  })
}())
