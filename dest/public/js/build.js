'use strict';

var BlockInfo = React.createClass({
  displayName: 'BlockInfo',

  render: function render() {
    var style = {
      margin: '10px 0'
    };

    return React.createElement(
      'div',
      { style: style },
      'Difficulty: ',
      this.props.data.difficulty
    );
  }
});

var BlockSearch = React.createClass({
  displayName: 'BlockSearch',

  getInitialState: function getInitialState() {
    return { queryResponse: {} };
  },

  getBlock: function getBlock(event) {
    var _this = this;

    if (event.keyCode === 13) {
      qwest.post('/query', { query: event.target.value }).then(function (response) {
        _this.setState({ queryResponse: JSON.parse(response.response) });
      });
    }
  },

  render: function render() {
    var style = {
      padding: '20px',
      fontFamily: '\'Raleway\', sans-serif'
    };

    return React.createElement(
      'div',
      { style: style, className: 'block-search' },
      React.createElement(Search, { action: this.getBlock }),
      React.createElement(BlockInfo, { data: this.state.queryResponse })
    );
  }
});

var Search = React.createClass({
  displayName: 'Search',

  render: function render() {
    var style = {
      padding: '8px 18px',
      fontSize: '1.3em',
      outline: 'none',
      border: '3px solid',
      borderRadius: '50px',
      width: '350px'
    };

    var placeholder = 'Enter block height';

    return React.createElement('input', { type: 'text', style: style,
      placeholder: placeholder, onKeyDown: this.props.action });
  }
});

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

var TxFeed = React.createClass({
  displayName: 'TxFeed',

  getInitialState: function getInitialState() {
    return { data: [] };
  },

  componentDidMount: function componentDidMount() {
    var _this2 = this;

    var socket = io.connect(location.href);

    socket.on('new_transaction', function (response) {
      _this2.state.data.unshift(response);
      _this2.setState({ data: _this2.state.data.slice(0, _this2.props.limit + 1) });
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

React.render(React.createElement(
  'div',
  null,
  React.createElement(BlockSearch, null),
  React.createElement(TxFeed, { limit: 10 })
), document.getElementById('mount-point'));