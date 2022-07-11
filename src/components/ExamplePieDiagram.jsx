import React, { useState, memo } from "react";
import { PieChart } from "react-minimal-pie-chart";
import "./styles.css";

const labels = [
  ["2G", "#505050"],
  ["3G", "#ff0000"],
  ["4G", "#07b9a2"],
  ["5G", "#18cc12"]
];

// https://www.gsma.com/mobileeconomy/#trends
const data = [
  {
    name: "Global",
    numbers: [23, 25, 52]
  },
  {
    name: "North America",
    numbers: [6, 12, 82]
  },
  {
    name: "Russia",
    numbers: [25, 42, 33]
  },
  {
    name: "Latin America",
    numbers: [17, 35, 47]
  },
  {
    name: "Sub Saharan Africa",
    numbers: [45, 46, 10]
  },
  {
    name: "Europe",
    numbers: [14, 28, 58]
  },
  {
    name: "Middle East & North Africa",
    numbers: [31, 40, 29]
  },
  {
    name: "Asia Pacific",
    numbers: [27, 25, 48]
  },
  {
    name: "Greater China",
    numbers: [13, 5, 83]
  }
];

const dataByName = new Map(
  Object.entries(
    data.reduce((o, c) => {
      o[c.name] = c.numbers;
      return o;
    }, {})
  )
);

const Select = memo(({ data, onSelect }) => (
  <select onChange={e => onSelect(e.target.value)}>
    {data.map(({ name }) => (
      <option key={name} value={name}>
        {name}
      </option>
    ))}
  </select>
));

const Chart = memo(({ data }) => {
  const pieChartData = data.map((value, index) => ({
    "title": labels[index][0],
    value,
    "color": labels[index][1]
  }));

  return (
    <div className="Chart">
      <PieChart
        paddingAngle={10}
        labelStyle={{
          fontSize: "5px",
          fill: "#000"
        }}
        labelPosition={63}
        lineWidth={20}
        label={({ dataEntry }) =>
          `${dataEntry."title"} ${Math.round(dataEntry.percentage)}%`
        }
        data={pieChartData}
      />
    </div>
  );
});

export default function App() {
  const [selected, setSelected] = useState(data[0].name);

  const onSelect = name => {
    console.log(name);
    setSelected(name);
  };

  return (
    <div className="App">
      <Select data={data} onSelect={onSelect} />
      <Chart data={dataByName.has(selected) ? dataByName.get(selected) : []} />
    </div>
  );
}
