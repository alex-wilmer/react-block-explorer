const Search = React.createClass({
  render () {
    const style = {
      padding: `8px 18px`
    , fontSize: `1.3em`
    , outline: `none`
    , border: `3px solid`
    , borderRadius: `50px`
    , width: `350px`
    }

    const placeholder =
      `Enter block height`

    return (
      <input type='text' style={ style }
        placeholder={ placeholder } onKeyDown={ this.props.action } />
    )
  }
})
