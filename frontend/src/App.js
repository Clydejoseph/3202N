import {Route, Routes} from "react-router-dom";
import Home from "./Homepage";

import Login from "./Login";



function App() {
  return (
    <>
            <Routes>
              <Route exact path='/*' element={<Home />}></Route>
              <Route exact path='/login' element={<Login />}></Route>
              <Route exact path="*" Component={errorRouteHandling}></Route>
            </Routes>
    </>
  );
}

export default App;

const errorRouteHandling = () =>{
  return (<h1>404 ERROR Routing APP</h1>)
}

