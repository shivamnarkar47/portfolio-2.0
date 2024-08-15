import { ArrowLeft } from 'lucide-react'
import BlurFade from './magicui/blur-fade'
import RetroGrid from './magicui/retro-grid'
import { Button } from './ui/button'
import { Link } from "react-router-dom"
const ErrorPage = () => {
  return (
    <div className='flex h-screen items-center w-full justify-center'>
      <BlurFade className='flex items-center justify-center flex-col' delay={0.5}>
        <h1 className="font-display text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem] my-4">You lost the track 🥹</h1>
        <Link to={'/'}>
          <Button variant={'destructive'} className="font-display text-center text-sm font-semibold tracking-[-0.02em] drop-shadow-sm md:text-lg md:leading-[5rem] my-10 bg-slate-200 text-black dark:text-white dark:bg-zinc-600 hover:bg-slate-300 dark:hover:bg-zinc-500">
            <ArrowLeft className='mr-2 w-10' />Go back to HomePage
          </Button>
        </Link>
      </BlurFade>
      <RetroGrid className="shadow-none drop-shadow-none" />
    </div>
  )
}

export default ErrorPage
