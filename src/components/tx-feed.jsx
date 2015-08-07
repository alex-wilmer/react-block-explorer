(() => {
  const Title = React.createClass({
    render() {
      const classList = this.props.data.classList
          , text = this.props.data.text

      return <h1 className={ classList }>{ text }</h1>
    }
  })

  const TxList = React.createClass({
    render() {
      const latestTransactions = this.props.data.map(tx => {
        const amount = tx.payload.transaction.amount
        const txClass = amount > 10e7 ? `tx high-roller` : `tx`

        return (
          <li className={ txClass } key={ tx.id }>
            <span className='id'>{ tx.id }</span>
            <span className='satoshis'>{ amount }</span>
          </li>
        )
      })

      return <ul className='tx-list'>{ latestTransactions }</ul>
    }
  })

  const TxFeed = React.createClass({
    getInitialState() {
      return { data: [] }
    }

  , componentDidMount() {
      const socket = io.connect(location.href)

      socket.on(`new_transaction`, response => {
        this.state.data.unshift(response)
        this.setState({ data: this.state.data.slice(0, 9) })
      })
    }

  , render() {
      const title = { text: 'latest transactions', classList: 'tx-title' }

      return (
        <div className='tx-feed'>
          <Title data={ title } />
          <TxList data={ this.state.data } />
        </div>
      )
    }
  })

  React.render(
    <TxFeed />
  , document.getElementById('mount-point'))

}())
