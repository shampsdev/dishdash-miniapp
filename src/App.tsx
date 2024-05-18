import Layout from './components/layout';
import { SwipesPage } from './pages/swipes.page';

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Layout>
        {/* <Button >hello</Button> */}
        {/* <MainPage/> */}
        <SwipesPage/>
      </Layout>
    </div>
  )
}

export default App;
