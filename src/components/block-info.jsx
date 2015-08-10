const BlockInfo = React.createClass({
  render () {
    const style = { margin: `10px 0` }

    return (
      <div style={ style }>
        Difficulty: { this.props.data.difficulty }
      </div>
    )
  }
})
