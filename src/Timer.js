import React, { useState, useEffect } from 'react';
import './timer.css'

const Timer = () => {
  const [isMainTimerActive, setIsMainTimerActive] = useState(true);
  const maxLoopCount = 4;
  const maxSeconds = 60;
  const maxBreakMinutes = 4;
  const maxBreakSeconds = 60;
  const maxMinutes = 24;
  const [seconds, setSeconds] = useState(maxSeconds);
  const [minutes, setMinutes] = useState(maxMinutes);
  const [isActive, setIsActive] = useState(false);
  const [numberOfLoops, setLoopCount] = (useState(0));

  const isCircleChecked = checkCircles(numberOfLoops);
  const resetText = GetResetText();
  const overloadedSeconds = calculateOverloadedSeconds();
  const overloadedMinutes = calculateOverloadedMinutes();

  const[isBreakActive, setIsBreakActive] = useState(false);
  const [breakSeconds, setBreakSeconds] = useState(maxBreakSeconds);
  const [breakMinutes, setBreakMinutes] = useState(maxBreakMinutes);
  const overloadedBreakSeconds = calculateOverloadedBreakSeconds();
  const overloadedBreakMinutes = calculateOverloadedBreakMinutes();
const message = Message();
  function calculateOverloadedSeconds(){
      return calculateFormat(seconds);
  }

  function calculateOverloadedBreakSeconds(){
      return calculateFormat(breakSeconds);
  }

  function calculateOverloadedMinutes(){
      if(seconds === maxSeconds)
          return minutes + 1;
      else{
          return calculateFormat(minutes);
      }
  }

  function calculateOverloadedBreakMinutes(){
     if(breakSeconds === maxBreakSeconds)
          return breakMinutes + 1;
      else{
          return calculateFormat(breakMinutes);
      }
    }

  function calculateFormat(integer){
      if(integer < 10)
          return "0" + integer;
      else if(integer === 60)
          return "00";
      else
          return integer;
  }

  function toggle() {
    setIsActive(!isActive);
  }

  function toggleBreak(){
      setIsBreakActive(!isBreakActive);
  }


  function GetResetText (){
      if(maxLoopCount === numberOfLoops && minutes === 0 && seconds === 0)
          return "Restart?";
      else if(seconds === 0 && minutes === 0)
          return "Next Loop";
      else
          return "Reset";
  }

  function checkCircles(currentLoops){
    let boxes = [];
    for(let i = 0; i< maxLoopCount; i++){
        if(i >= currentLoops)
        {
            boxes.push(true);
        }
        else{
            boxes.push(false);
        }
    }
    return boxes;
  }


  function reset() {
    setSeconds(maxSeconds);
    setMinutes(maxMinutes);
    setIsActive(false);
    if(seconds === 0 && minutes === 0 && maxLoopCount > numberOfLoops)
        setLoopCount(numberOfLoops => numberOfLoops +1);
    else if(maxLoopCount === numberOfLoops)
        resetLoop();
  }

  function resetBreak(){
      setIsActive(false);
     setBreakSeconds(maxBreakSeconds);
    setBreakMinutes(maxBreakMinutes);
    setIsBreakActive(false);
  }

  function resetLoop(){
      setLoopCount(0);
      checkCircles(0);
    }




//pass in the missing dependencies
  useEffect(() => {
    let interval = null;

    if(isActive) {
        if (seconds === 0 && minutes !== 0) {
            setMinutes(minutes => minutes - 1);
            setSeconds(maxSeconds);
        } else {
            if (seconds !== 0) {
                interval = setInterval(() => {
                    setSeconds(seconds => seconds - 1);
                }, 1000);

            } else {
                resetBreak();
                setIsMainTimerActive(false);
                Message();
            }
        }
    }
    if(isBreakActive){
        if (breakSeconds === 0 && breakMinutes !== 0) {
            setBreakMinutes(breakMinutes => breakMinutes - 1);
            setBreakSeconds(maxBreakSeconds);
        } else {
            if (breakSeconds !== 0) {
                interval = setInterval(() => {
                    setBreakSeconds(breakSeconds => breakSeconds - 1);
                }, 1000);
            }
            else if(isMainTimerActive === false){
                setIsMainTimerActive(true);
            }

        }
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, isBreakActive, breakSeconds]);



  function Message(){
    if (seconds === 0 && isActive && numberOfLoops !== maxLoopCount)
    {
        return "Take a five minute break!";
    }

    else if(numberOfLoops === maxLoopCount && seconds === 0 && minutes === 0) {
          return "Done! Take a longer break!";
      }
    else
      return ""
  }

  const BreakTimer = () => (
      <div className="row">
       <div className="time">
            {overloadedBreakMinutes} : {overloadedBreakSeconds}
       </div>
          <div className="row">
        <button className={`button button-primary button-primary-${isBreakActive ? 'active' : 'inactive'}`} onClick={toggleBreak}>
          {isBreakActive ? 'Pause Break' : 'Start Break'}
        </button>
          </div>
       </div>
  )

    const RegularTimer = () => (
        <div className="row">
        <div className="time">
          {overloadedMinutes} : {overloadedSeconds}
        </div>

        <div className="row">
            <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
                {isActive ? 'Pause' : 'Start'}
            </button>
            <button className="button button-reset" onClick={reset}>
                {resetText}
            </button>
        </div>
        </div>
    )

  return (
    <div className="app">
        <h3 className="row">My Pomodoro Clock</h3>
        <br />
        <div className="about-text row">
           <p><i>The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. The technique uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks. Each interval is known as a pomodoro, from the Italian word for 'tomato', after the tomato-shaped kitchen timer that Cirillo used as a university student.

The technique has been widely popularized by dozens of apps and websites providing timers and instructions. Closely related to concepts such as timeboxing and iterative and incremental development used in software design, the method has been adopted in pair programming contexts. </i> -Wikipedia</p>

        </div>

        <br />
        <div className="row">
            <span className={isCircleChecked[0] ? 'dot' : 'dotComplete'}></span>
            <span className={isCircleChecked[1] ? 'dot' : 'dotComplete'}></span>
            <span className={isCircleChecked[2] ? 'dot' : 'dotComplete'}></span>
            <span className={isCircleChecked[3] ? 'dot' : 'dotComplete'}></span>
        </div>
        {isMainTimerActive ? <RegularTimer /> : null}
        {isMainTimerActive ? null: <BreakTimer /> }

      <div className="Test row">{message}</div>




    </div>
  );
};

export default Timer;