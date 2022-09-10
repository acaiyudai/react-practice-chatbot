import './assets/styles/style.css'
import React from 'react';
import { Component } from 'react';
import defaultDataset from './dataset'
import {AnswersList} from './components/index';

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

  initAnswer = () => {
    const initDataset = this.state.dataset[this.state.currentId];
    const initAnswers = initDataset.answers;
    this.setState({
      answers: initAnswers
    });
  };

  componentDidMount(){
    this.initAnswer();
    console.log(this.state.answers);
  }

  render(){
    return (
      <section className='c-section'>
        <div className='c-box'>
          <AnswersList answers={this.state.answers} />
        </div>
      </section>
    );
  }
  
}

export default App;
