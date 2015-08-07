"use strict";

var socket = io.connect(location.href);

socket.on("test", function (data) {
  console.log(data);
});

var MyComponent = React.createClass({
  displayName: "MyComponent",

  render: function render() {
    return React.createElement(
      "h1",
      null,
      "Hello, ",
      this.props.name,
      "!"
    );
  }
});

React.render(React.createElement(MyComponent, { name: "Handsome" }), document.getElementById('mount-point'));