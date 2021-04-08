import React, { useState } from 'react'

const showAll = ({persons}) => {
  for(let i = 0; i < persons.length; i++){
    persons[i].show = true
  }
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    console.log('Added person')

    const personObject = {
      name: newName,
      number: newNumber
    }

    const sameEntry = persons.filter(person => person.name === personObject.name)
    if(sameEntry.length === 0) {
      setPersons(persons.concat(personObject))      
      setNewName('')
      setNewNumber('')
    } else {
      window.alert(`${personObject.name} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {  
    setNewSearch(event.target.value)
    if(event.target.value === ''){
      console.log('Empty search field')   
      showAll({persons})   
    } 
  }

  

  return (
    <div>
      <h2>Phonebook</h2>
      <Input newSearch={newSearch} handleSearchChange={handleSearchChange} addPerson={addPerson} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>      
      <h2>Numbers</h2>
      <Persons persons={persons} newSearch={newSearch} />      
    </div>
  )
}


const Input = ({newSearch, handleSearchChange, addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <div>
      filter shown with: 
      <input 
        value={newSearch}
        onChange={handleSearchChange}
      />  
      <form onSubmit={addPerson}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={handleNameChange}  
          />          
        </div>
        <div>
          number: 
          <input 
            value={newNumber}
            onChange={handleNumberChange}  
          />          
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>    
    </div>
  )
}

const Persons = ({persons, newSearch}) => {
  return (
    <div>
      {persons
      .filter(person => {
        const { name, number } = person;
        const search = newSearch.toLowerCase()
        if (!newSearch) return true;
        if (name.toLowerCase().includes(search) || number.includes(search))  return true;
    })
      .map(person => { 
        return (<Person key={person.name} person={person} />)
    })}
    </div>
    
  )
}

const Person = ({person}) => {
  return (
    <li>
      {person.name} {person.number}
    </li>
  )  
}

export default App
