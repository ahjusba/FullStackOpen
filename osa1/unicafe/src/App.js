import React, { useState } from 'react'

const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Average = ({bad, good, all}) => {
  const average = (good - bad) / all
  if(Number.isNaN(average)) {
    return 0
  } else {
    return average
  }
}

const Percentage = ({good, all}) => {  
  const percentage = (good / all) * 100
  if(Number.isNaN(percentage)) {
    return 0
  } else {
    return percentage
  }  
}

const Statistics = ({bad, neutral, good, all}) => {
  if(all === 0){
    return (
      <p>No feedback given</p>
    )
  } else {
    return (
      <div>
        <table>
          <tbody>
            <StatisticsLine text="bad" value={bad}/>
            <StatisticsLine text="neutral" value={neutral}/>
            <StatisticsLine text="good" value={good}/>
            <StatisticsLine text="average" value={Average({bad, good, all})}/>
            <StatisticsLine text="positive" value={Percentage({good, all})}/> 
          </tbody>          
        </table>        
      </div>      
    )
  }  
}

const StatisticsLine = ({text, value}) => {
  return (    
    <tr>
      <td>{text}: </td>
      <td>{value}</td>
    </tr> 
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [bad, setBad] = useState(0)  
  const [neutral, setNeutral] = useState(0)
  const [good, setGood] = useState(0)
  const [all, allClicks] = useState(0)

  const addBad = () => {
    allClicks(all + 1)
    setBad(bad + 1)
  }
  const addNeutral = () => {
    allClicks(all + 1)
    setNeutral(neutral + 1)
  }
  const addGood = () => {
    allClicks(all + 1)
    setGood(good + 1)
  } 

  return (
    <div>
      <p>give feedback</p>
      <Button handleClick={addBad} text='bad'/> 
      <Button handleClick={addNeutral} text='neutral'/> 
      <Button handleClick={addGood} text='good'/> 
      <Statistics bad={bad} neutral={neutral} good={good} all={all}/>      
    </div>
  )
}

export default App