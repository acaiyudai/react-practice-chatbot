import './assets/styles/style.css'
import React from 'react';
import { Component } from 'react';
import defaultDataset from './dataset'
import {AnswersList, Chats} from './components/index';
import {FormDialog} from './components/forms/index'


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

    this.selectAnswer = this.selectAnswer.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClickClose = this.handleClickClose.bind(this);
  }

  initAnswer = () => {
    const initDataset = this.state.dataset[this.state.currentId];
    const initAnswers = initDataset.answers;
    this.setState({
      answers: initAnswers
    });
  }

  initChats = () => {
    const initDataset = this.state.dataset[this.state.currentId];
    const chat = {
      text:initDataset.question,
      type: 'question'
    }

    const chats = this.state.chats;
    chats.push(chat);

    this.setState({
      chats: chats
    });

    console.log(chats);
  }

  selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch(true) {
      case (nextQuestionId === 'init'):
        setTimeout(() => this.displayNextQuestion(nextQuestionId), 500);
        break;

      case (/^https:*/.test(nextQuestionId)):
      // nextQuestionIdがhttpsから始まる場合, 外部リンクへ飛ばす
        const a = document.createElement('a');
        a.href = nextQuestionId;
        a.target = '_blank'; // リンク先をブラウザの別タグで表示させる属性
        a.click();
        break;

        case (nextQuestionId === 'contact'):
          this.handleClickOpen();
          break;
      
      default:
        const chats = this.state.chats;
        chats.push({
          text: selectedAnswer,
          type: 'answer'
        });
    
        this.setState({
          chats: chats
        });

        setTimeout(() => this.displayNextQuestion(nextQuestionId), 1000);
        break;
    }
  }

  displayNextQuestion = (nextQuestionId) => {
    const chats = this.state.chats;
    chats.push({
      text: this.state.dataset[nextQuestionId].question,
      type: 'question'
    });

    this.setState({
      answers: this.state.dataset[nextQuestionId].answers,
      chats: chats,
      currentId: nextQuestionId
    });
  }

  handleClickOpen = () => {
    this.setState({
        open: true
    });
  }
  handleClickClose = () => {
    this.setState({
        open: false
    });
  }


  componentDidMount(){
    const initAnswer ='';
    this.selectAnswer(initAnswer, this.state.currentId);
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    const scrollArea = document.getElementById('scroll-area');
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }

  render(){
    return (
      <section className='c-section'>
        <div className='c-box'>
          <Chats chats={this.state.chats} />
          <AnswersList answers={this.state.answers} select={this.selectAnswer} />
          <FormDialog open={this.state.open} handleClose={this.handleClickClose} />
        </div>
      </section>
    );
  }
  
}

export default App;
