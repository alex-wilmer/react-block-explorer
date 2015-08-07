"use strict";

(function () {
  var TxList = React.createClass({
    displayName: "TxList",

    render: function render() {
      var latestTransactions = this.props.data.map(function (tx) {
        return React.createElement(
          "li",
          { key: tx.id },
          React.createElement(
            "span",
            { className: "id" },
            tx.id
          ),
          React.createElement(
            "span",
            { className: "satoshis" },
            tx.payload.transaction.amount
          )
        );
      });

      return React.createElement(
        "ul",
        null,
        latestTransactions
      );
    }
  });

  var TxFeed = React.createClass({
    displayName: "TxFeed",

    getInitialState: function getInitialState() {
      return { data: [] };
    },

    componentDidMount: function componentDidMount() {
      var self = this;

      socket.on("new_transaction", function (response) {
        self.state.data.unshift(response);
        self.setState({ data: self.state.data.slice(0, 9) });
      });
    },

    render: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h1",
          null,
          "latest transactions"
        ),
        React.createElement(TxList, { data: this.state.data })
      );
    }
  });

  var socket = io.connect(location.href);

  React.render(React.createElement(TxFeed, null), document.getElementById('mount-point'));
})();