import React from 'react';
import { BiImage } from 'react-icons/bi';
import { AiOutlineSend } from 'react-icons/ai';
import { BsEmojiSmile } from 'react-icons/bs';
import { MdAttachFile } from 'react-icons/md';

function SendMessage() {
  return (
    <div className='flex items-center justify-between w-full h-32 px-8 border-t-2 border-b-2 bg-primaryDark border-secondaryDarkLight '>
      <input
        type='search'
        className='text-fontLightGrey form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal  bg-secondaryDarkLight bg-white bg-clip-padding  rounded-r-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  h-12'
        placeholder='Enter New Message'
        aria-label='Search'
        aria-describedby='button-addon2'
      />
      <BsEmojiSmile className='w-8 cursor-pointer text-purple md:w-12' />
      <MdAttachFile className='w-8 cursor-pointer text-purple md:w-12' />
      <BiImage className='w-8 cursor-pointer text-purple md:w-12' />
      <div className='p-4 rounded-md cursor-pointer bg-purple text-primaryWhite '>
        <AiOutlineSend />
      </div>
    </div>
  );
}

export default SendMessage;
