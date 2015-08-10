const TxList = React.createClass({
  render () {
    const opaqueTransition = { opacity: 1, transition: `opacity 0.3s ease` }
    const floatRight = { float: `right` }
    const latestTransactions = this.props.data.map((tx, i) => {
      const amount = tx.payload.transaction.amount
      const amountClass = amount > 10e7 ? `high-roller` : ``
      const txClass = `${amountClass} fade-${i}`
      const liStyle = i
        ? Object.assign({ marginTop: `15px` }, opaqueTransition)
        : opaqueTransition

      return (
        <li style={ liStyle } className={ txClass } key={ tx.id }>
          <span>{ tx.id }</span>
          <span style={ floatRight }>{ amount }</span>
        </li>
      )
    })

    return <ul className='tx-list'>{ latestTransactions }</ul>
  }
})
