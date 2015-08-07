'use strict';

(function () {
  var TxFeed = React.createClass({
    displayName: 'TxFeed',

    render: function render() {
      var latestTransaction = this.props.data.id;

      return React.createElement(
        'h1',
        null,
        'Latest transaction id: ',
        latestTransaction
      );
    }
  });

  var socket = io.connect(location.href);

  socket.on('new_transaction', function (data) {
    React.render(React.createElement(TxFeed, { data: data }), document.getElementById('mount-point'));
  });
})();