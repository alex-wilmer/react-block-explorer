const BlockSearch = React.createClass({
  getInitialState () {
    return { queryResponse: {} }
  }

, getBlock (event) {
    if (event.keyCode === 13) {
      qwest.post(`/query`, { query: event.target.value })
        .then(response => {
          this.setState({ queryResponse: JSON.parse(response.response) })
        })
    }
  }

, render () {
    const style = {
      padding: `20px`
    , fontFamily: `'Raleway', sans-serif`
    }

    return (
      <div style={ style } className='block-search'>
        <Search action={ this.getBlock } />
        <BlockInfo data={ this.state.queryResponse } />
      </div>
    )
  }
})
