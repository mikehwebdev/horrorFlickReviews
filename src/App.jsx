import { Routes, Route } from "react-router-dom"
import HorrorFlicks from "./Components/HorrorFlicks"
import Home from "../src/Components/Home"
import Flick from "../src/Components/Flick"
import Error from "../src/Components/Error"

function App() {

  {/* My main app component*/}

  return (
        
    <Routes>
      {/* Root with Home layout */}
      <Route path="/" element={<Home />}>
      {/* Default page for all search results and journeys */}
        <Route index element={<HorrorFlicks />} />
        {/* Selected flick page */}
        <Route path=":id" element={<Flick />} />
        {/* Splat route for all general errors */}
        <Route path="*" element={<Error message="Whoops! There's nothing here!" link="/" />} />
      </Route>
    </Routes>
  )
}

export default App