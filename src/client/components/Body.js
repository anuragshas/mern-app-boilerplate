import React,{Component} from 'react';
import Axios from 'axios';
import Item from './Item';

class Body extends Component{
  constructor(props){
    super(props);
    this.state ={
      products: []
    } 
  }
  componentDidMount(){
    Axios.get('/api/products').then(response => {this.setState(
      {products: response.data.products}
    )})
  }
  render(){
    return (
      <div>
        {this.state.products.length===0?
          (<div>
            No Item
          </div>):
          (this.state.products.map(product=><Item key={product._id} {...product}/>))}
      </div>
    );
  }
};

export default Body;