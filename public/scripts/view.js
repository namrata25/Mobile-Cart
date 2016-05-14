var ProductBox = React.createClass({
  getInitialState: function() {
    return {data: [], cartData: [], id: ''};
  },
  loadProductsFromServer: function() {
    $.ajax({
      url: this.props.url + window.location.search,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
        this.setState({id: data.id});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadProductsFromServer();
  },
  reloadCart: function(){
    this.loadCartFromServer();
  },
  handleSubmit: function(e) {
    e.preventDefault();
    $.ajax({
      url: this.props.carturl,
      dataType: 'json',
      type: 'POST',
      data: {product_id: this.state.id},
      success: function(data) {
        window.location = "/index.html";
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.carturl, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className="large-12 columns card">
      <div className="large-font">
        <a href="/index.html">Home</a>
        </div>
        <div className="large-3 large-offset-1 columns">
          <img src={this.state.data.image} />
        </div>
        <div className="large-7 large-pull-2 columns center-text">
          <div className="large-12 columns large-font">{this.state.data.name}</div>
          <div className="large-6 columns center-text small-font small-padding"><span className="alert round">Capacity: {this.state.data.capacity}</span></div>
          <div className="large-6 columns center-text small-font small-padding"><span className="alert round">Price: Rs. {this.state.data.price}</span></div>
          <form className="addToCartForm" onSubmit={this.handleSubmit}>
            <input type="submit" className="button primary" value="Add to Cart"/>
            <input type="hidden" value={this.state.id} />
          </form>
          <div className="large-12 columns">
            {this.state.data.description}
          </div>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <ProductBox url="/api/product" carturl="/api/cart" />,
  document.getElementById('content')
);