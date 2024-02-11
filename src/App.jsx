
import { useState } from 'react';
import './App.css'
import Header from './component/Header'
import  Treemap  from './component/treeMap/Treemap'
import { data } from "./data";
import CityChart from './component/CityChart';

function App() {
 const [chartDetails, setChartDetails] = useState([]);
const handleClick = (data) => {
  setChartDetails(data);
}
  return (
    <>
     <Header/>
     {
      chartDetails.length !== 0 ? <CityChart onPrev={handleClick} data={chartDetails}/> : <Treemap width='700' height='400' data={data} onClick={handleClick}/>
     }
     
    </>
  )
}

export default App
