import { ChildrenNodeType } from '@/shared/types/children-node.type'


const Layout = ({ children }
  : { children?: ChildrenNodeType }) => {
  return (
    <div className="max-w-[1280px] w-[98%] md:w-[90%] bg-blue-gray-400 mx-auto min-h-screen">
      { children }
    </div>
  )
}

export default Layout