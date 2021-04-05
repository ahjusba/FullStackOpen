import React from 'react'

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name} your age is {props.age}</p>
    </div>
  )
}

const App = () => {

  const now = new Date()
  const a = 10
  const b = 20

  return (
    <div>
      <p>Hello world, it is {now.toString()}</p>
      <p>
        {a} plus {b} equals {a + b}
      </p>
      <br />
      <Hello name="Jussi" age={21}/>
      <Hello name={a.toString() + b.toString()} age={a} />
    </div>
  )
}

export default App