'use strict';

;(function () {
  var BlockSearch = React.createClass({
    displayName: 'BlockSearch',

    getInitialState: function getInitialState() {
      return { blockInfo: {} };
    },

    render: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(Search, null),
        React.createElement(BlockInfo, { data: this.state.blockInfo })
      );
    }
  });

  var Search = React.createClass({
    displayName: 'Search',

    handleChange: function handleChange(event) {
      console.log(event);
    },

    render: function render() {
      return React.createElement('input', { onChange: this.handleChange });
    }
  });

  var BlockInfo = React.createClass({
    displayName: 'BlockInfo',

    render: function render() {
      return React.createElement(
        'div',
        null,
        this.props.data
      );
    }
  });

  React.render(React.createElement(BlockSearch, null), document.getElementById('blockSearch'));
})();(function () {
  var Title = React.createClass({
    displayName: 'Title',

    render: function render() {
      var classList = this.props.data.classList,
          text = this.props.data.text;

      return React.createElement(
        'h1',
        { className: classList },
        text
      );
    }
  });

  var TxList = React.createClass({
    displayName: 'TxList',

    render: function render() {
      var latestTransactions = this.props.data.map(function (tx, i) {
        var amount = tx.payload.transaction.amount,
            amountClass = amount > 10e7 ? 'tx high-roller' : 'tx',
            txClass = amountClass + ' fade-' + i;

        return React.createElement(
          'li',
          { className: txClass, key: tx.id },
          React.createElement(
            'span',
            { className: 'id' },
            tx.id
          ),
          React.createElement(
            'span',
            { className: 'satoshis' },
            amount
          )
        );
      });

      return React.createElement(
        'ul',
        { className: 'tx-list' },
        latestTransactions
      );
    }
  });

  var TxFeed = React.createClass({
    displayName: 'TxFeed',

    getInitialState: function getInitialState() {
      return { data: [] };
    },

    componentDidMount: function componentDidMount() {
      var _this = this;

      var socket = io.connect(location.href);

      socket.on('new_transaction', function (response) {
        _this.state.data.unshift(response);
        _this.setState({ data: _this.state.data.slice(0, _this.props.limit + 1) });
      });
    },

    render: function render() {
      var title = { text: 'latest transactions', classList: 'tx-title' };

      return React.createElement(
        'div',
        { className: 'tx-feed' },
        React.createElement(Title, { data: title }),
        React.createElement(TxList, { data: this.state.data })
      );
    }
  });

  React.render(React.createElement(TxFeed, { limit: 10 }), document.getElementById('mount-point'));
})();