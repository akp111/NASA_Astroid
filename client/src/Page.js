import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function Page() {
  const classes = useStyles();
    const [start_date, setstart] = useState(new Date())
    const [end_date, setend] = useState(new Date())
    var output =null;
  return (
      <div>
    <form className={classes.container} noValidate>
      <TextField
        id="date1"
        label="Start Date"
        type="date"
        defaultValue="2017-05-24"
        className={classes.textField}
        onChange={(e) => { setstart(e.target.value) }}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
    <br></br>
    <form className={classes.container} noValidate>
    <TextField
      id="date2"
      label="End Date"
      type="date"
      defaultValue="2017-05-24"
      className={classes.textField}
      onChange={(e) => { setend(e.target.value) }}
      InputLabelProps={{
        shrink: true,
      }}
    />
  </form>
      <br></br>
  <button
    onClick={()=>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ start_date:start_date,end_date:end_date })
        };
        console.log(requestOptions)
        fetch('http://localhost:4000/output', requestOptions).then((e)=>{
            console.log(e)
            output.push(e)
        }
        )
    
    }}
  >Submit</button>
  <p>{output}</p>
  </div>
  );
}