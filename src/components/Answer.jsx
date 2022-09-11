import React from "react";
/*-- Material UI の機能 --*/
import Button from '@material-ui/core/Button';
// import { makeStyles } from "@material-ui/styles";


// const useStyles = makeStyles((theme) => ({
//     root: {

//     },
// }));

const Answer = (props) => {
    // const classes = useStyles();
    return (
        <Button variant="contained" color="primary" 
        onClick={() => {props.select(props.content, props.nextId)}}>
            {props.content}
        </Button>
    );
};

export default Answer;