const MyComponent = React.createClass({
  render() {
    return (
      <h1>Hello, {this.props.name}!</h1>
    )
  }
})

React.render(
  <MyComponent name="Handsome" />
, document.getElementById('mount-point'))
