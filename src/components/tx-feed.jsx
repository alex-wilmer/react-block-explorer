(() => {
  const TxList = React.createClass({
    render() {
      const latestTransactions = this.props.data.map(tx => {
        const txClass =
          tx.payload.transaction.amount > 10e7 ? `tx high-roller` : `tx`

        return (
          <li className={ txClass } key={ tx.id }>
            <span className='id'>{ tx.id }</span>
            <span className='satoshis'>
              { tx.payload.transaction.amount }
            </span>
          </li>
        )
      })

      return (
        <ul className='tx-list'>{ latestTransactions }</ul>
      )
    }
  })

  const TxFeed = React.createClass({
    getInitialState() {
      return { data: [] }
    }

  , componentDidMount() {
      socket.on(`new_transaction`, response => {
        this.state.data.unshift(response)
        this.setState({ data: this.state.data.slice(0, 9) })
      })
    }

  , render() {
      return (
        <div className='tx-feed'>
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
