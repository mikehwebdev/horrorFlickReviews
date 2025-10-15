import { Routes, Route } from "react-router-dom"
import HorrorFlicks from "./Components/HorrorFlicks"
import Home from "../src/Components/Home"
import Flick from "../src/Components/Flick"
import Error from "../src/Components/Error"

function App() {
  return (
        
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<HorrorFlicks />} />
        <Route path=":id" element={<Flick />} />
        <Route path="*" element={<Error message="Whoops! There's nothing here!" link="/" />} />
      </Route>
    </Routes>
  )
}

export default App