import React from 'react';

const Item = ({ name, price }) => (
  <div>
    <div>
      {name} : {price}
    </div>
  </div>
);

export default Item;
