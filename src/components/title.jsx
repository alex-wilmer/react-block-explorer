const Title = React.createClass({
  render () {
    const classList = this.props.data.classList
        , text = this.props.data.text

    return <h1 className={ classList }>{ text }</h1>
  }
})
