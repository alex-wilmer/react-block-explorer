'use strict';

(function () {
  var TxList = React.createClass({
    displayName: 'TxList',

    render: function render() {
      var latestTransaction = this.props.data;
      return React.createElement(
        'ul',
        null,
        'hey ',
        latestTransaction
      );
    }
  });

  var TxFeed = React.createClass({
    displayName: 'TxFeed',

    getInitialState: function getInitialState() {
      return { data: [] };
    },

    componentDidMount: function componentDidMount() {
      var self = this;

      socket.on('new_transaction', function (response) {
        var data = self.state.data.unshift(response).slice(0, 9);
        self.setState({ data: data });
      });
    },

    render: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'h1',
          null,
          'latest transactions'
        ),
        React.createElement(TxList, { data: this.state.data })
      );
    }
  });

  var socket = io.connect(location.href);

  React.render(React.createElement(TxFeed, null), document.getElementById('mount-point'));
})();