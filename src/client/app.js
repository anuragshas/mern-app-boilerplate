// Node.JS
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/app.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';
  
class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header/>
        <Body/>
        <Footer/>
      </div>
    );
  }
};

export default App;

ReactDOM.render(<App />, document.getElementById("app"));


module.hot.accept();