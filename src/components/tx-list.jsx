const TxList = React.createClass({
  render () {
    const opaqueTransition = { opacity: 1, transition: `opacity 0.3s ease` }
        , floatRight = { float: `right` }
        , latestTransactions = this.props.data.map((tx, i) => {
      const amount = tx.payload.transaction.amount
          , amountClass = amount > 10e7 ? `high-roller` : ``
          , txClass = `${amountClass} fade-${i}`

      return (
        <li style={ opaqueTransition } className={ txClass } key={ tx.id }>
          <span>{ tx.id }</span>
          <span style={ floatRight }>{ amount }</span>
        </li>
      )
    })

    return <ul className='tx-list'>{ latestTransactions }</ul>
  }
})
