import './assets/styles/style.css'
import React from 'react';
import { Component } from 'react';
import defaultDataset from './dataset'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      chats: [],
      currentId: 'init',
      dataset: defaultDataset,
      open: false
    }
  }

  render(){
    return (
      <section className='c-section'>
        <div className='c-box'>
        </div>
      </section>
    );
  }
  
}

export default App;
