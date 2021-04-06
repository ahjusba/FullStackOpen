import React from 'react'



const App = () => {

  const merkkijono = 'stringstring'
  let pituus = merkkijono.length
  console.log(pituus)

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} /> {/*We could send the object "course", and access the properties within the components"*/}
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      <button>NAPPI</button>
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )  
}

const Content = (props) => {
  const parts = props.parts

  return (
    <div>
      <Part partName={parts[0].name} exercises={parts[0].exercises} />
      <Part partName={parts[1].name} exercises={parts[1].exercises} />
      <Part partName={parts[2].name} exercises={parts[2].exercises} />
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.partName} {props.exercises}</p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </div>
  )
}

export default App