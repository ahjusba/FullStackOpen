import React, { useState } from 'react'

const Button = ({action, text}) => {
  return(
    <button onClick={action}>
      {text}
    </button>
  )
}

// const findLargestValueIndex = (points) => {
//   let largest = 0
//   let index = 0
//   for(let i = 0; i < points.length; i++){
//     if(points[i] > largest){
//       largest = points[i]
//       index = i
//     }
//   }
//   return index
// }

const getLargest = (points) => points.reduce((acc, item, index) => {
	const { value } = acc;
	return item > value ? { value: item, index } : acc;
}, { value: 0, index: 0})

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]  
  
  const [selected, setSelected] = useState(0)
  const [points, changePoints] = useState(Array(anecdotes.length).fill(0))

  const addVote = () => {
    const copy = [...points]
    copy[selected] += 1
    changePoints(copy)
  }

  const largest = getLargest(points)

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <Button action={()=>setSelected(getRandomInt(0, anecdotes.length - 1))} text="Random sentance"/>
      <Button action={addVote} text="vote"/>
      <p>Total votes: {points[selected]}</p>
      <p>Most Votes: </p>      
      <p>"{anecdotes[largest.index]}" with {largest.value} votes</p>

    </div>
  )
}

export default App