import React, { useEffect, useState } from 'react'
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react-dom'
import personServices from './services/persons'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [notification, setNotification] = useState('')

  useEffect(() => {

    personServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    console.log('Added person')

    const personObject = {
      name: newName,
      number: newNumber
    }

    const sameEntry = persons.filter(person => person.name === personObject.name)

    if (sameEntry.length === 0) {
      personServices
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))

        })
      
      setNotification(`Added ${personObject.name}`)
      setTimeout(() => {setNotification('')}, 1000)

    } else {

      const person = persons.find(n => n.name === personObject.name)

      if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
        const replacePerson = { ...person, number: newNumber }
        personServices
          .update({ id: replacePerson.id, newObject: replacePerson })
          .then(returnedPerson => {
            setPersons(persons.map(person => person.name !== personObject.name ? person : returnedPerson))
            setNotification(`Modified ${person.name}`)
            setTimeout(() => {setNotification('')}, 1000)
          })
          .catch(error => {
            setNotification(`Information of ${person.name} has already been removed from the server`)
            setTimeout(() => {setNotification('')}, 1000)
          })
      }
    }
    setNewName('')
    setNewNumber('')
  }

  const removePerson = (id) => {

    const person = persons.find(n => n.id === id)

    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      console.log('removed person')
      const remainingPersons = persons.filter(n => n.id !== id)

      personServices
        .remove(id)
        .then(() => {
          setPersons(remainingPersons)
        })
      
        setNotification(`Removed ${person.name}`)
        setTimeout(() => {setNotification('')}, 1000)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <Notification message={notification}/>
      <h2>Phonebook</h2>
      <Input newSearch={newSearch} handleSearchChange={handleSearchChange} addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} newSearch={newSearch} removePerson={removePerson} />
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === ''){
    return null
  }

  const notificationStyle = {
    color: 'green',
    fontSize: 32,
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div className="error" style={notificationStyle}>
      {message}
    </div>
  )
}

const Input = ({ newSearch, handleSearchChange, addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
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

const Persons = ({ persons, newSearch, removePerson }) => {

  const visiblePersons = persons
    .filter(person => {
      const { name, number, id } = person;
      const search = newSearch.toLowerCase()
      if (!newSearch) return true;
      if (name.toLowerCase().includes(search) || number.toLowerCase().includes(search)) return true;
    })

  return (
    <div>
      {visiblePersons.map(person => {
        return (<Person key={person.name} person={person} removePerson={removePerson} />)
      })}
    </div>
  )
}

const Person = ({ person, removePerson }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={() => removePerson(person.id)}>remove</button>
    </li>

  )
}

export default App
