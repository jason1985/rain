import { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import "./App.css";

const URL_ONECALL = "https://api.openweathermap.org/data/2.5/onecall?";

function UnixTime(number) {
  if (!number) {
    return "";
  }
  return new Date(number * 1000).toLocaleTimeString("en-US");
}

function UnixDate(number) {
  if (!number) {
    return "";
  }
  return new Date(number * 1000).toLocaleDateString("en-US");
}

let jPop;
let jTime;

function App() {
  const [hourly, setHourly] = useState([]);
  const [jPop, setJpop] = useState([]);
  const [jTime, setJtime] = useState([]);

  useEffect(() => {
    const getWeather = async () => {
      const res = await axios.get(URL_ONECALL, {
        params: {
          // q: "ho chi minh",
          lat: 10.8231,
          lon: 106.6297,
          units: "imperial",
          exclude: "minutely",
          appid: process.env.REACT_APP_APIKEY,
        },
      });

      setHourly(res.data.hourly);
      console.log(hourly);
    };
    getWeather();
  }, []);

  useEffect(() => {
    setJtime(hourly.map((hour) => hour.dt * 1000 + 24000000));

    setJpop(hourly.map((hour) => Math.round(hour.pop * 100)));
    console.log(jTime);
    console.log(jPop);
  }, [hourly]);

  const series = [
    {
      name: "chance to rain",
      data: jPop,
    },
  ];

  const options = {
    chart: {
      // id: ["time"],
    },
    xaxis: {
      type: "datetime",
      categories: jTime,
      labels: {
        format: "htt",
      },
    },
  };

  var options1 = {
    chart: {
      id: "chart2",
      type: "area",
      height: 230,
      foreColor: "#ccc",
      toolbar: {
        autoSelected: "pan",
        show: false,
      },
    },
    colors: ["#00BAEC"],
    stroke: {
      width: 3,
    },
    grid: {
      borderColor: "#555",
      clipMarkers: false,
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      gradient: {
        enabled: true,
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    markers: {
      size: 5,
      colors: ["#000524"],
      strokeColor: "#00BAEC",
      strokeWidth: 3,
    },
    tooltip: {
      theme: "dark",
    },
    xaxis: {
      type: "datetime",
      categories: jTime,
    },
    yaxis: {
      min: 0,
      tickAmount: 4,
    },
  };

  var joptions = {
    chart: {
      foreColor: "#ccc",
      height: 300,
      type: "area",
      zoom: {
        enabled: false,
      },
    },
    fill: {
      gradient: {
        enabled: true,
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    tooltip: {
      theme: "dark",
    },
    title: {
      text: "Chance of Rain",
      align: "center",
    },
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    xaxis: {
      type: "datetime",
      categories: jTime,
      labels: {
        format: "htt",
      },
    },
    yaxis: {
      min: 0,
      max: 100,
    },
  };

  return (
    <>
      <h1>Chance of Rain in Saigon</h1>
      <div className="wrapper">
        <Chart series={series} options={joptions} type="area" />
      </div>
    </>
  );
}

export default App;
