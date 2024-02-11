import { useMemo, useRef, useState } from "react";
import * as d3 from "d3";


function temperatureToColor(temperature) {
    // Define the minimum and maximum temperature values
    const minTemp = 0; // Adjust based on your data
    const maxTemp = 40;  // Adjust based on your data
    // Map the temperature value to a hue value between 0 (blue) and 240 (red)
    const hue = 240 - (temperature - minTemp) / (maxTemp - minTemp) * 240;
  
    // Convert the hue value to an HSL color string
    const color = `hsl(${hue}, 100%, 50%)`;
  
    return color;
  }
  

  

 // eslint-disable-next-line react/prop-types
 const Treemap = ({ width, height, data, onClick}) => {
  const svgRef = useRef(null);
  const [tooltipData, setTooltipData] = useState(null);
  const hierarchy = useMemo(() => {
    return d3.hierarchy(data).sum((d) => d.population);
  }, [data]);

  const root = useMemo(() => {
    const treeGenerator = d3.treemap().size([width, height]).padding(4);
    return treeGenerator(hierarchy);
  }, [hierarchy, width, height]);

  const handleClick = (data) => {
    
    // eslint-disable-next-line react/prop-types
    onClick([...data.cities])
  }

  const showTooltip = (e, d) => {
    const pos = svgRef.current?.getBoundingClientRect();
    setTooltipData({
        ...d,
        style: {
            left: `${(e.clientX - pos.left) + 20}px`,
            top: `${(e.clientY  - pos.y) - 30 }px`
        }
    });
  }

  const allShapes = root.leaves().map((leaf) => {
    return (
      <g key={leaf.id}>
        <rect
          x={leaf.x0}
          y={leaf.y0}
          width={leaf.x1 - leaf.x0}
          height={leaf.y1 - leaf.y0}
          stroke="transparent"
          fill={temperatureToColor(leaf.data.temperature)}
          style={{cursor: 'pointer'}}
          onClick={() => handleClick(leaf.data)}
          onMouseMove={(e) => showTooltip(e, leaf.data)}
          onMouseOut={() => setTooltipData(null)}
        />
        <text
          x={leaf.x0 + 3}
          y={leaf.y0 + 3}
          fontSize={12}
          textAnchor="start"
          alignmentBaseline="hanging"
        >
          {leaf.data.name}
        </text>
      </g>
    );
  });

  const tooltip = tooltipData !== null ? (
    <div className="tooltip" id="tooltip" style={tooltipData.style}>
        <div><b>Name:</b> {tooltipData.name}</div>
        <div><b>Temperature :</b> {tooltipData.temperature} </div>
        <div><b>Population:</b> {tooltipData.population}  </div>
    </div>
  ) : '';

  return (
    <div className="tree-container" ref={svgRef} style={{position: 'relative'}}>
      <svg width={width} height={height}>
        {allShapes} 
      </svg>
      {tooltip}
    </div>
  );
};

export default Treemap
