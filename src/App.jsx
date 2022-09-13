import './assets/styles/style.css'
import defaultDataset from './dataset';
import React from 'react';
import {AnswersList, Chats} from './components/index';
import {FormDialog} from './components/forms/index'
import { useState, useEffect, useCallback } from 'react';


const App = () => {
   const [answers, setAnswers] = useState([]);
   const [chats, setChats] = useState([]);
   const [currentId, setCurrentId] = useState("init");
   const [dataset, setDataset] = useState(defaultDataset);
   const [open, setOpen] = useState(false);


   const selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch(true) {
      case (nextQuestionId === 'init'):
        console.log(nextQuestionId);
        setTimeout(() => displayNextQuestion(nextQuestionId, dataset[nextQuestionId]), 500);
        break;

      case (/^https:*/.test(nextQuestionId)):
      // nextQuestionIdがhttpsから始まる場合, 外部リンクへ飛ばす
        const a = document.createElement('a');
        a.href = nextQuestionId;
        a.target = '_blank'; // リンク先をブラウザの別タグで表示させる属性
        a.click();
        break;

        case (nextQuestionId === 'contact'):
          handleClickOpen();
          break;
      
      default:
        addChats({
          text: selectedAnswer,
          type: "answer"
        });
        setTimeout(() => displayNextQuestion(nextQuestionId, dataset[nextQuestionId]), 1000);
        break;
    }
  }

  const displayNextQuestion = (nextQuestionId, nextDataset) => {
    addChats({
      text: nextDataset.question,
      type: 'question'
    });

    setAnswers(nextDataset.answers);
    setCurrentId(nextQuestionId);
  }

  const addChats = (chat) => {
    setChats(prevChats => {
      return [...prevChats, chat];
    });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  // 子供のコンポーネントにpropsとして関数を渡す場合には,
  // useCallbackを使う.
  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);


  useEffect(() => {
    const initAnswer ='';
    selectAnswer(initAnswer, currentId);
  }, []);

  useEffect(() => {
    const scrollArea = document.getElementById('scroll-area');
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  });


  return (
    <section className='c-section'>
      <div className='c-box'>
        <Chats chats={chats} />
        <AnswersList answers={answers} select={selectAnswer} />
        <FormDialog open={open} handleClose={handleClose} />
      </div>
    </section>
  );
  
}

export default App;
