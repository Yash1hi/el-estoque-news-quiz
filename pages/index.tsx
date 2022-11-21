import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { QuizCard, Layout} from '../components'
import { getQuizzes } from '../services'



const Home: NextPage = ({ quizzes }: any) => {
  return (
    <Layout>
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>El Estoque News Quiz</title>
        <link rel="icon" href="/EElogo.png" />
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {quizzes.map((quiz: any, index: any) => (
          <div className='xl:col-span-4 lg:col-span-6 col-span-1'>
            <QuizCard quiz={quiz.node} key={quiz.title} />
          </div>
        ))}
      </div>
    </div>
    </Layout>  
  )
}

export async function getStaticProps() {
  const quizzes = (await getQuizzes()) || [];

  return {
    props: { quizzes }
  }
}

export default Home
