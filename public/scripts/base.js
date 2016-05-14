var ProductBox = React.createClass({
  getInitialState: function() {
    return {data: [], cartData: []};
  },
  loadProductsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  loadCartFromServer: function() {
    $.ajax({
      url: this.props.carturl,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({cartData: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.carturl, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadProductsFromServer();
    this.loadCartFromServer();
    setInterval(this.loadCartFromServer, this.props.pollInterval);
  },
  reloadCart: function(){
    this.loadCartFromServer();
  },
  handleSubmit: function(e) {
    e.preventDefault();
    console.log(e);
    var id = document.getElementById('product_id').value;
    var name = document.getElementById('product_name').value;
    var capacity = document.getElementById('product_capacity').value.trim();
    var price = document.getElementById('product_price.value').trim();

    $.ajax({
      url: this.props.carturl,
      dataType: 'json',
      type: 'POST',
      data: {id: id, name: name, capacity: capacity, price: price},
      success: function(data) {
        this.props.reloadCart();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.carturl, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className="productBox">
        <div className="large-font">Products</div>
        <CartCount cartData={this.state.cartData} />
        <ProductList data={this.state.data}/>
      </div>
    );
  }
});

var ProductList = React.createClass({
  render: function() {
    var carturl = this.props.carturl;
  var productNodes = this.props.data.map(function(product) {
      return (
        <Product id={product.id} name={product.name} capacity={product.capacity} price={product.price} image={product.image} />
      );
    });
    return (
      <div className="productList">
        {productNodes}
      </div>
    );
  }
});

var Product = React.createClass({
  getInitialState: function() {
    return {formId: '', formName: '', formCapacity: '', formPrice: ''};
  },
  rawMarkup: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },
  render: function() {
    var url = "/view.html?product_id=" + this.props.id;
    return (
      <div className="product large-4 columns">
        <div className="large-12 columns card">
          <div className="productImage large-12 columns center-text padding"><img src={this.props.image} /></div>
          <div className="productName large-12 columns center-text medium-font medium-padding">{this.props.name}</div>
          <div className="productCapacity large-6 columns center-text small-font small-padding"><span className="alert round">Capacity: {this.props.capacity}</span></div>
          <div className="productPrice large-6 columns center-text small-font small-padding"><span className="alert round">Price: Rs. {this.props.price}</span></div>
          <div className="productAdd large-12 columns center-text medium-font medium-padding">
            <div className="button primary large-12 columns center-text"><a href={url} className="white">View Details</a></div>
          </div>
        </div>
      </div>
    );
  }
});

var CartCount = React.createClass({
  render: function() {
    return (
      <div className="cartCount large-1 large-offset-11 columns">
        <div className="medium-font button alert"><a href="/cart.html">Cart ({this.props.cartData.length})</a></div>
      </div>
    );
  }
});

ReactDOM.render(
  <ProductBox url="/api/products" carturl="/api/cart" pollInterval={2000} />,
  document.getElementById('content')
);