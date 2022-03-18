import SnakeGame from './component/Snake'


function Demo() {
  const rows = 10
  const cols = Math.min(14, Math.floor(window.innerWidth / 32))

  return (
    <>
      <SnakeGame
        rows={rows}
        cols={cols}
        targetScore={5}
        onComplete={() => console.log('Completed')}
      />
    </>
  )
}

export default Demo
