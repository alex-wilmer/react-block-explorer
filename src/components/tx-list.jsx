const TxList = React.createClass({
  render () {
    const floatRight = { float: `right` }
    const highRoller = {
      color: `#00B300`
    , fontWeight: `bold`
    , fontSize: `1.1em`
    }

    const latestTransactions = this.props.data.map((tx, i) => {
      const amount = tx.payload.transaction.amount

      let liStyle = Object.assign({ opacity: 1 - (i + 1 / 10) })

      liStyle = i // not first element
        ? Object.assign({ marginTop: `15px` }, liStyle)
        : liStyle

      liStyle = amount > 10e7
        ? Object.assign(highRoller, liStyle)
        : liStyle

      const txClass = `fade-${i}`

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
