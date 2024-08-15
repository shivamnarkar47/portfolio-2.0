//@ts-nocheck
import BlurFade from './magicui/blur-fade'
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useLoaderData, useNavigation } from 'react-router-dom'
import AvatarCircles from './magicui/avatar-circles'
import { Github } from 'lucide-react'
import { Link } from "react-router-dom"

const GithubAcc = () => {
  const user = useLoaderData()
  console.log(user)
  return (
    <BlurFade inView >
      <Link to={user?.data?.html_url} target='_blank'>
        <Card className='w-[400px] transition-all hover:bg-slate-800'>
          <CardHeader className="flex flex-row items-center">
            <img src={user?.data?.avatar_url} className='w-12 mr-3 rounded-full' loading='lazy' />
            <div className='flex flex-col gap-1 flex-1'>
              <CardTitle>{user?.data?.name}</CardTitle>
              <p className='text-slate-600 dark:text-slate-400'>@{user?.data?.login}</p>
            </div>
            <Github className='text-slate-400' />
          </CardHeader>
          <CardFooter>
            <p>
              {user?.data?.bio}
            </p>

          </CardFooter>
        </Card>
      </Link>

    </BlurFade>
  )
}

export default GithubAcc
