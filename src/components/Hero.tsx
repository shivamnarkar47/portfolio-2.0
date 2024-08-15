import BlurFade from './magicui/blur-fade'

const Hero = () => {
  return (
    <span className="pointer-events-none z-10 whitespace-pre-wrap dark:text-white text-slate-900 text-center text-7xl font-bold leading-none tracking-tighter text-transparent">
      <section id="header">
        <BlurFade delay={0.25} inView>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tighter sm:text-5xl xl:text-6xl/none">
            Making Shit Since 2020 🌟
          </h2>
        </BlurFade>
        <BlurFade delay={0.25 * 2} inView>
          <span className="text-xl text-pretty text-slate-900 dark:text-white tracking-tighter sm:text-3xl xl:text-4xl/none">
            Nice to meet you
          </span>
        </BlurFade>
      </section>
    </span>

  )
}

export default Hero
