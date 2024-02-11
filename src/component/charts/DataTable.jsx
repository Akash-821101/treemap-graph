

// eslint-disable-next-line react/prop-types
const DataTable = ({data}) => {

    // eslint-disable-next-line react/prop-types
    const rowData = data.map((city, id) => (
       <tr key={id}>
        <td>{id+1}</td>
        <td>{city.name}</td>
        <td>{city.temperature}</td>
        <td>{city.population}</td>
       </tr>
    ))
    
      
  return (
    <table> 
        <thead>
            <tr>
            <th>Sl.</th>
            <th>City</th>
            <th>Temperture</th>
            <th>Population</th>

            </tr>
            
        </thead>

        <tbody>
          {rowData}
        </tbody>
    </table>
  )
}

export default DataTable