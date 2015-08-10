const Title = React.createClass({
  render () {
    const text = this.props.data.text
    const style = { fontSize: `2em`, margin: `15px 0` }

    return <h1 style={ style }>{ text }</h1>
  }
})
