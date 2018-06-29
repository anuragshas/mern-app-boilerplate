import React from 'react';

const Item = ({ name, price, _id, request })=>(
  <div>
    <div>
      {name} : {price}
    </div>
  </div>
)

export default Item;