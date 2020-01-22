import React, { Component } from 'react'

import UsernameForm from './components/UsernameForm'
import ChatScreen from './ChatScreen'

class App extends Component {

  constructor() {
    super()
    this.state = {
      currentUsername: '',
      currentScreen: 'WhatIsOurUsernameScreen',
    }
  }

  onUsernameSubmitted = username => {
    
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username }),
    })
    .then(response => {
      this.setState({
        currentUsername: username,
        currentScreen: 'ChatScreen',
      })
    })
    .catch(error => console.error('error', error))
  }

  render() {
    if(this.state.currentScreen === 'WhatIsOurUsernameScreen') {
      return <UsernameForm onSubmit={this.onUsernameSubmitted} />
    } 
    else if (this.state.currentScreen === 'ChatScreen') {
      return <ChatScreen currentUsername={this.state.currentUsername} />
    }
  }
}

export default App
