import React from 'react';
import '../assets/styles/style.css';
import {Answer} from './index'

const AnswersList = (props) => {
    return (
        <div className='c-grid__answer'>
            {props.answers.map((value, index) => {
                return <Answer content={value.content} key={index.toString()} 
                       select={props.select} nextId={value.nextId} />
            })}
        </div>
    )
};

export default AnswersList;

