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
      const latestTransactions = this.props.data.map((tx, i) => {
        const amount = tx.payload.transaction.amount
        const amountClass = amount > 10e7 ? `tx high-roller` : `tx`
        const txClass = `${amountClass} fade-${i}`

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
        this.setState({ data: this.state.data.slice(0, this.props.limit + 1) })
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
    <TxFeed limit={ 10 }/>
  , document.getElementById('mount-point'))

}())
