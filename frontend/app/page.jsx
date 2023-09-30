import Image from 'next/image'
import Board from './Board'
import Scores from './Scores'

export default function Home() {
  return (
    <main className="p-12 grid grid-cols-3 gap-4">
      <div className='col-span-2'>
        <Board />
      </div>
      <div>
        <Scores />
      </div>
    </main>
  )
}
