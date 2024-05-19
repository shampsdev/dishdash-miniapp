const SwipeTag = ({ children }
  : { children?: string }) => {
  return (
    <p className='px-4 py-2 text-sm rounded-3xl bg-gray-200'>
      { children }
    </p>
  )
}

export default SwipeTag