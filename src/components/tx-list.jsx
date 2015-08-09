const TxList = React.createClass({
  render () {
    const latestTransactions = this.props.data.map((tx, i) => {
      const amount = tx.payload.transaction.amount
          , amountClass = amount > 10e7 ? `tx high-roller` : `tx`
          , txClass = `${amountClass} fade-${i}`

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
