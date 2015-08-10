const TxList = React.createClass({
  render () {
    const floatRight = { float: `right` }
    const highRoller = {
      color: `#00B300`
    , fontWeight: `bold`
    , fontSize: `1.1em`
    }

    const latestTransactions = this.props.data.map((tx, i) => {
      const txHash = `${tx.payload.transaction.hash.substr(0, 10)}...`
      const amount = tx.payload.transaction.amount

      let liStyle = { opacity: 1 - (i / this.props.data.length) }

      liStyle = i // not first element
        ? Object.assign({ marginTop: `15px` }, liStyle)
        : liStyle

      liStyle = amount > 10e7
        ? Object.assign({}, highRoller, liStyle)
        : liStyle

      return (
        <li style={ liStyle } key={ tx.id }>
          <span>{ txHash }</span>
          <span style={ floatRight }>{ amount }</span>
        </li>
      )
    })

    return <ul className='tx-list'>{ latestTransactions }</ul>
  }
})
