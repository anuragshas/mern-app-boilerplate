import React, { Component } from 'react';
import Axios from 'axios';
import Item from './Item';

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    Axios.get('/api/products').then(response => {
      this.setState({ products: response.data.products });
    });
  }

  render() {
    const { products } = this.state;
    return (
      <div>
        {products.length === 0 ? (
          <div>No Item</div>
        ) : (
          products.map(product => <Item key={product._id} {...product} />)
        )}
      </div>
    );
  }
}

export default Body;
