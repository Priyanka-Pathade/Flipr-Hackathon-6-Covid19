import React from 'react';
// import {Navbar, NavbarBrand} from 'reactstrap';

// import ShowFirstCol from './components/showFirstCol';
// import TaskthirdB from './components/filter';    //samira
// import ShowSecondCol from './components/showSecondCol';
import ShowSecondCol3 from './components/showSecondCol3';
import ShowThirdCol from './components/showThirdColA4';
import ShowThirdB from './components/shoeThirdB';
import ShowFirstCol4 from './components/showFirstCol4';  //rupali
import Summary from './components/summary-card';
import Task4 from './components/task4';
import Samira from './components/Filter';
import Rupali from './components/RupaliThirdB';
import './App.css';
import {BrowserRouter, Route,Switch} from 'react-router-dom'
import Navbar from './Navbar';
function App() {
  return (
    <div >
       <BrowserRouter>
      <Navbar /> 
      <Switch>   
      {/* <Route exact path="/"><Graph /></Route> */}
      <Route exact path="/" ><Task4 /></Route>
      <Route path="/graph"><Task4 /></Route>
      <Route path="/first"><ShowFirstCol4 /></Route>
      <Route path="/second"><ShowSecondCol3 /></Route>
      <Route path="/thirdB"><Rupali /></Route>
       <Route path="/thirdA"><ShowThirdCol /></Route>
       <Route path="/summaryCard"><Summary /></Route>
    </Switch>

    </BrowserRouter>

    {/* <Navbar dark color="danger">
      <div className="container">
        <NavbarBrand style={{color:"white"}}>Covid 19</NavbarBrand>
      </div>
    </Navbar>  */}
    {/* <ShowFirst /> */}
    {/* <ShowFirstCol /> */}
    {/* <ShowSecond />    */}
      {/* <ShowSecondCol /> */}
    {/* <ShowThird />    */}
    {/* <ShowThirdCol /> */}
    {/* <FirstPagi  /> */}
    {/* <thirdB /> */}

</div>
  );
}

export default App;
