import React from 'react'

const Course = ({course}) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }
  
  const Header = ({course}) => {
    return (
      <div>
        <h1>{course.name}</h1>
      </div>
    )  
  }
  
  const Content = ({course}) => {
    const parts = course.parts
  
    return (
      <div>
        {parts.map(part => <Part key={part.id} part={part} />)}
      </div>
    )
  }
  
  const Part = ({part}) => {
    return (
      <li>{part.name} {part.exercises}</li>
    )
  }
  
  const Total = ({course}) => {
  
    const totalAmount = course.parts.reduce((sum, part) => 
      sum + part.exercises, 0)
  
    return (
      <div>
        <p>Number of exercises {totalAmount}</p>
      </div>
    )
  }

  export default Course