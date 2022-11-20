import React from 'react'
import momemnt from 'moment'
import Link from 'next/link'
import { PossibleTypeExtensionsRule } from 'graphql';
import moment from 'moment';

const QuizCard = ({ quiz }) => {
  return (
    <div className='bg-white shadow-lg rounded-lg p-0 pb-1 mb-8 h-90 w-full'>
      <div className='relative overflow-hidden shadow-md pb-80 mb-3'>
        <img
          src={ quiz.featuredImage.url } 
          alt={ quiz.title }
          className='object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg'
        />
      </div>
      <h1 className='transition duration-500 transform hover:-translate-y-1 text-center mb-3 text-white text-xl font-semibold'>
        <Link href={`/quiz/${quiz.slug}`} className={`rounded-full py-1 px-8 cursor:pointer`} style={{ backgroundColor: `${quiz.mainColor.hex}`}}>
          {quiz.title}
        </Link>
      </h1>
      <div className='block flex items-center justify-center mb-3 w-full'>
        <div className='flex items-center justify-between mb-4 lg:mb-0 w-auto mr-8 pl-10'>
          {quiz.authors.map((author) => (
            <p className='inline align-middle text-gray-700 ml-2 text-sm'>{author.name} </p>
          ))} 
        </div>   
      </div>
      {/* <div className='text-center mb-4'>
            <Link href={`/quiz/${quiz.slug}`}>
              <span className='transition duration-500 transform hover:-translate-y-2 inline-block bg-blue-600 text-sm font-medium rounded-full text-white py-3 px-8 cursor-pointer'>
                Take Quiz
              </span>
            </Link>
        </div> */}
    </div>
  )
}

export default QuizCard