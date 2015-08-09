React.render(
  <div>
    <BlockSearch />
    <TxFeed limit={ 10 } />
  </div>,
  document.getElementById('mount-point')
)
