import React from "react";
/*-- Material UI の機能 --*/
import Button from '@material-ui/core/Button';
import {makeStyles, createStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(() => (
    createStyles({
        'button':{
            borderColor: '#FF8549',
            color: '#FF8549',
            fontWeight: 600,
            marginBottom: '8px',
            '&:hover':{
                backgroundColor: '#FF8549',
                color: '#FFF'
            }
        }
    })

));

const Answer = (props) => {
    const classes = useStyles();

    return (
        <Button variant="outlined" className={classes.button}
        onClick={() => {props.select(props.content, props.nextId)}}>
            {props.content}
        </Button>
    );
};

export default Answer;