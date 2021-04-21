import React, {useState, useEffect} from 'react';
import './App.css';

// data diff object
const DateDiff = {
  inSeconds: function(d1, d2) {
    var t2 = d2.getTime();
    var t1 = d1.getTime();
    return parseInt((t2-t1)/(1000));
  },
  inMinutes: function(d1, d2) {
    var t2 = d2.getTime();
    var t1 = d1.getTime();
    return parseInt((t2-t1)/(60*1000));
  },
  inHours: function(d1, d2) {
    var t2 = d2.getTime();
    var t1 = d1.getTime();
    return parseInt((t2-t1)/(3600*1000));
  },
  inDays: function(d1, d2) {
    var t2 = d2.getTime();
    var t1 = d1.getTime();
    return parseInt((t2-t1)/(24*3600*1000));
  },
  inDHMS: function(d1, d2) {
    var t2 = d2.getTime();
    var t1 = d1.getTime();
    var days = parseInt((t2 - t1) / (24*3600*1000));
    var hours = parseInt(((t2 - t1) - days * (24*3600*1000)) / (3600*1000));
    var minutes = parseInt(((t2 - t1) - days * (24*3600*1000) - hours * (3600*1000)) / (60*1000));
    var seconds = parseInt(((t2 - t1) - days * (24*3600*1000) - hours * (3600*1000) - minutes * (60*1000)) / (1000));
    return [days, hours, minutes, seconds];
  },
  inWeeks: function(d1, d2) {
    var t2 = d2.getTime();
    var t1 = d1.getTime();
    return parseInt((t2-t1)/(24*3600*1000*7));
  },
  inMonths: function(d1, d2) {
    var d1Y = d1.getFullYear();
    var d2Y = d2.getFullYear();
    var d1M = d1.getMonth();
    var d2M = d2.getMonth();
    return (d2M+12*d2Y)-(d1M+12*d1Y);
  },
  inYears: function(d1, d2) {
    return d2.getFullYear()-d1.getFullYear();
  }
}

function App() {
  
  var start = new Date(1999, 1, 21);
  var end = new Date(1999 + 80, 1, 21);

  const [now, setNow] = useState(new Date());

  // update every second
  useEffect(() => {
    const saver = setInterval(updateNow, 1000);
    return () => {
      clearInterval(saver);
    };
  });

  function updateNow() {
    setNow(new Date());
  }

  function formatDHMS(dhms) {
    return dhms[0] + ' days ' + dhms[1] + ':' + dhms[2] + ':' + dhms[3];
  }
    
  return (
    <div className="App">
      <div className="centered unselectable" style={{
        width: (100 * (now - start) / (end - start)).toString() + '%', 
        height: "100%", 
        float: "left", 
        color: "black",
        backgroundColor: "white"}}
        >
        {DateDiff.inYears(start, now)} years
        <br/>
        {formatDHMS(DateDiff.inDHMS(start, now))}
      </div>
      <div className="centered unselectable" style={{
        width: (100 * (end - now) / (end - start)).toString() + '%', 
        height: "100%", 
        float: "right", 
        color: "white",
        backgroundColor: "black"}}
        >
        {DateDiff.inYears(now, end)} years
        <br/>
        {formatDHMS(DateDiff.inDHMS(now, end))}
      </div>      
    </div>
  );
}

export default App;
