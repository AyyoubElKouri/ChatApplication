import React from 'react'

const Message = () => {
  return (
    <div className='chat chat-end '>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img src="https://avatar.iran.liara.run/public/boy?username=fls" alt="Avatar" />
            </div>

        </div>
        <div className='chat-bubble text-white bg-blue-500'>Hi! What is upp?</div>
        <div className='chat-bubble text-white bg-blue-500'>Hi! What is upp?</div>
    </div>
  )
}

export default Message