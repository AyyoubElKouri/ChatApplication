import React from 'react'
import SearchInput from './components/SearchInput'
import Conversations from './components/Conversations'
import LogoutButton from './components/LogoutButton'

const Sidebar = () => {
  return (
    <div>
        <SearchInput />
        <div className='divider px-3'></div>
        <Conversations />
        <LogoutButton />
    </div>
  )
}

export default Sidebar