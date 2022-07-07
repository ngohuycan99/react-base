import React from 'react'
import logo from './logo.svg'
import './App.css'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useGetUsersQuery } from './apis'

function App() {
  const { data: userCollection, isFetching: isFetchingUsers } =
    useGetUsersQuery(
      {},
      {
        onError: console.log,
        onSuccess: console.log,
      }
    )

  console.log(userCollection)
  console.log(isFetchingUsers)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <StyledP className="text-red-500">
          Edit <code>src/index.tsx</code> and save to reload.
        </StyledP>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App

const StyledP = styled.p`
  ${tw`text-xs`}
`
