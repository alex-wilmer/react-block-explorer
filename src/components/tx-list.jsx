const TxList = React.createClass({
  render () {
    const opaqueTransition = { opacity: 1, transition: `opacity 0.3s ease` }
    const floatRight = { float: `right` }
    const highRoller = {
      color: `#00B300`
    , fontWeight: `bold`
    , fontSize: `1.1em`
    }

    const latestTransactions = this.props.data.map((tx, i) => {
      let liStyle = i
        ? Object.assign({ marginTop: `15px` }, opaqueTransition)
        : opaqueTransition

      liStyle = tx.payload.transaction.amount > 10e7
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
