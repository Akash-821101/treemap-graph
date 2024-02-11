import CityLineChart from "./charts/CityLineChart"
import DataTable from "./charts/DataTable";
import DonutChart from "./charts/DonutChart"

// eslint-disable-next-line react/prop-types
const CityChart = ({ data, onPrev}) => {

// eslint-disable-next-line react/prop-types
const donutChartData = data.map(item => ({name: item.name, value: item.population}))

const handleClick = () => {
  console.log(data)
  onPrev([])
}
  return (
    <div className="chart-box">
      <button onClick={handleClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" data-name="Layer 1" id="back-arrow"><path d="m30.91 39-15-15 15-15 1.17 1.18L18.26 24l13.82 13.82Z"></path></svg>

      </button>
        <div className="chartBox-graph">
        <div style={{width: '250px', height: '100%'}}>
            <DonutChart data={donutChartData}/>
        </div>
        <div style={{flexGrow: 1, height: '100%'}}>
            <CityLineChart data={data} label="name" dataKey="population"/>
        </div>
        </div>
        <div className="chartBox-table">
            <DataTable data={data}/>
        </div>
    </div>
  )
}

export default CityChart