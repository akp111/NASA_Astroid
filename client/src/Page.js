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
    const [minDist, setMinDist] = useState(null)
    const [minId, setminId] = useState(null)
    const [maxId, setmaxId] = useState(null)
    const [maxSpeed, setmaxSpeed] = useState(null)
    const [avgSize, setavgSize] = useState(null)
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
        fetch('http://localhost:4000/', requestOptions).then(
           fetch('http://localhost:4000/output').then(
               res=> res.text()).then((res)=>{
                       var k=JSON.parse(res)[0]
                       console.log(k)
                       setMinDist(k.minDist)
                       setminId(k.minDistId)
                       setmaxSpeed(k.maxSpeed)
                       setmaxId(k.maxSpeedId)
                       setavgSize(k.avgerageSize)

                }
               
           
        ))
    
    }}
  >Submit</button>
  <h3>Minimum Distance</h3>
<p>Astroid id: {minId} </p>
<p>Distance:{minDist} km</p>
<br></br>
<h3>Maximun Velocity</h3>
<p>Astroid id: {maxId} km/sec</p>
<p>Velocity:{maxSpeed} </p>
<br></br>
<h3>Average Size :{avgSize}</h3>



  </div>
  );
}