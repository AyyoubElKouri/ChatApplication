import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'

const Home = () => {
    return (
        <div className=' space-x-7 flex sm:h-[450px] md:h-[550px]w-full p-6 rounded-2xl shadow-md backdrop-blur-lg border border-white/30'>
            <Sidebar />
            <MessageContainer />
        </div>
    )
}

export default Home