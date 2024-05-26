import {Route, Routes} from "react-router-dom";
import TechHome from './pages/labTech/Tech-Home';



function App() {
  return (
    <>
            <Routes>
              <Route exact path='/*' element={<TechHome />}></Route>
              <Route exact path="*" Component={errorRouteHandling}></Route>
            </Routes>
    </>
  );
}

export default App;

const errorRouteHandling = () =>{
  return (<h1>404 ERROR Routing APP</h1>)
}

