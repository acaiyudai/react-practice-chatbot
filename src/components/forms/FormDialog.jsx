import React from "react";
import { useState } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {TextInput} from './index'

const FormDialog = (props) => {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');

    const inputName = (event) => {
        setName(event.target.value);
    }

    const inputEmail = (event) => {
        setEmail(event.target.value);
    }

    const inputDescription = (event) => {
        setDescription(event.target.value);
    }

    const submitForm = () => {
        // Slackへの通知
        const payload = {
            text: 'お問い合わせがありました\n' +
                  'お名前 : ' + name + '\n' +
                  'Emai : ' + email + '\n' + 
                  'お問い合わせ内容 : \n' + description
        }
        // 自分のSlackのチャンネルへのURL
        const url ='https://hooks.slack.com/services/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'

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(payload)
        }).then(() => {
            alert("送信が完了しました. ");
            setName('');
            setEmail('');
            setDescription('');
            return props.handleClose();
        })
    }
    

    
    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>お問い合わせフォーム</DialogTitle>
            <DialogContent>
                <TextInput 
                    label={"お名前(必須)"} multiline={false} rows={1}
                    value={name} type={'text'} onChange={inputName}
                />
                <TextInput 
                    label={"メールアドレス(必須)"} multiline={false} rows={1}
                    value={email} type={'email'} onChange={inputEmail}
                />
                <TextInput 
                    label={"お問い合わせ内容(必須)"} multiline={true} rows={5}
                    value={description} type={'text'} onChange={inputDescription}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>
                    キャンセル
                </Button>
                <Button onClick={submitForm}>
                    送信する
                </Button>
            </DialogActions>
        </Dialog>
    );
    
}

export default FormDialog;