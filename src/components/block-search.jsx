const BlockSearch = React.createClass({
  getInitialState () {
    return { blockInfo: {} }
  }

, getBlock (event) {
    if (event.keyCode === 13) {
      qwest.post(`/query`, { query: event.target.value })
        .then(data => this.setState({ blockInfo: data }))
    }
  }

, render () {
    return (
      <div className='block-search'>
        <Search action={ this.getBlock } />
        <BlockInfo data={ this.state.blockInfo } />
      </div>
    )
  }
})
