;(() => {
  const BlockSearch = React.createClass({
    getInitialState() {
      return { blockInfo: {} }
    }

  , render() {
      return (
        <div>
          <Search />
          <BlockInfo data={ this.state.blockInfo } />
        </div>
      )
    }
  })

  const Search = React.createClass({
    handleChange(event) {
      console.log(event)
    }

  , render() {
      return <input onChange={ this.handleChange } />
    }
  })

  const BlockInfo = React.createClass({
    render() {
      return <div>{ this.props.data }</div>
    }
  })

  React.render(
    <BlockSearch />
  , document.getElementById('blockSearch'))

}())
