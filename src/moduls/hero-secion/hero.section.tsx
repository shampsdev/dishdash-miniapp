import { HeroCard } from './hero.card'

const HeroSection = () => {
  return (
    <section className='grid grid-cols-4 grid-rows-4 gap-4'>
      <HeroCard className="col-span-2">1</HeroCard>
      <HeroCard className="col-start-3">2</HeroCard>
      <HeroCard className="col-start-4">3</HeroCard>
      <HeroCard className="row-start-2">4</HeroCard>
      <HeroCard className="row-start-2">5</HeroCard>
      <HeroCard className="row-start-2">6</HeroCard>
      <HeroCard className="row-start-2">7</HeroCard>
      <HeroCard className=''>8</HeroCard>
      <HeroCard className="row-start-3">9</HeroCard>
      <HeroCard className="col-span-2">10</HeroCard>
      <HeroCard className="row-start-4">11</HeroCard>
      <HeroCard className="row-start-4">12</HeroCard>
      <HeroCard className="row-start-4">13</HeroCard>
    </section>
  )
}

export default HeroSection