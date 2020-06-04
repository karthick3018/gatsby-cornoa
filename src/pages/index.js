import React, { useEffect, useState } from "react"
import ReactFlagsSelect from 'react-flags-select';
import {Line} from 'react-chartjs-2';
import { Link } from "gatsby"

import CoronaImg from "../components/getCoronaImg";
import SEO from "../components/seo"
import '../components/mainPg.css';
import 'react-flags-select/css/react-flags-select.css';
const IndexPage = () => {

  const [dashBoardDetails, setDashBoardDetails] = useState(null);
  const [selectedCountryDetails, setSelectedCountryDetails] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('IN');
  const [isDark, setIsDark] = useState(false);

  const windowGlobal = typeof window !== 'undefined' && window



  useEffect(() => {
    
    dashBoardDataFetch();
    countryDetailsFetch('IN');
    chartDataFetch();
  }, [])

  useEffect(()=>{
    setThemeColor();

  },[])

  

  async function dashBoardDataFetch() {
    try {
      const dashBoardData = await fetch(`https://covid19.mathdro.id/api`).then(data => data.json());
      setDashBoardDetails(dashBoardData);
    }
    catch (e) {
      console.log('error occurred on', e)
    }
  }

  async function chartDataFetch() {
    try {
      const chartDataResult = await fetch(`https://covid19.mathdro.id/api/daily`).then(data => data.json());
      let formattedChartValue = {
        labels:[],
        datasets:[{
          label: 'World Wide Total Confirmed Case Report',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data:[]
        }]
      };
      chartDataResult.map(eachValue=>(
          formattedChartValue.labels.push(eachValue.reportDate),
          formattedChartValue.datasets[0].data.push(eachValue.totalConfirmed)
         
      ))
      setChartData(formattedChartValue);
    }
    catch (e) {
      console.log('error occurred on', e)
    }
  }

  async function countryDetailsFetch(countryCode) {
    try {
      const selectedCountryData = await fetch(`https://covid19.mathdro.id/api/countries/${countryCode}`).then(data => data.json());
      setSelectedCountryDetails(selectedCountryData);
    }
    catch (e) {
      console.log('error occurred on', e)
    }
  }

  const handleCountryChange = (value) => {
    countryDetailsFetch(value);
    setSelectedCountry(value);
  }

  const handleThemeChange = () => {
  


    if(isDark){
      windowGlobal.localStorage.setItem('theme','light');
      setIsDark(false);

    }
    else {
      windowGlobal.localStorage.setItem('theme','dark')
      setIsDark(true);
    }
    setThemeColor();
  }

  const setThemeColor = ()=> {
    document
    .getElementsByTagName("HTML")[0]
    .setAttribute("data-theme", windowGlobal.localStorage.getItem("theme"));
  }

  return (


    <div className="main-container">
      <div className="img-wrapper">
        <figure className="corona-img">
          <CoronaImg />
        </figure>
      </div>
     
      <div className="dashBoard-wrapper">
        <p className="theme-text" onClick = { handleThemeChange }>{ isDark?'light':'dark' } </p>
       <h3> Corona World Wide Update !</h3>
        <div className="world-record">
          <div className="details-plate confirmed">
            <p>Confirmed</p>
            <p>{dashBoardDetails && dashBoardDetails.confirmed && dashBoardDetails.confirmed.value} </p>
          </div>
          <div className="details-plate re-covered">
            <p>Re-Covered</p>
            <p>{dashBoardDetails && dashBoardDetails.recovered && dashBoardDetails.recovered.value} </p>
          </div>
          <div className="details-plate death">
            <p>Deaths</p>
            <p>{dashBoardDetails && dashBoardDetails.deaths && dashBoardDetails.deaths.value}</p>
          </div>
          <div className="details-plate last-updated">
            <p>Last Updated on</p>
            <p>{dashBoardDetails && dashBoardDetails.lastUpdate && new Date(dashBoardDetails.lastUpdate).toLocaleString()}</p>
          </div>

         

        </div>
        {chartData &&
         <Line  data={chartData} />
        }

        <div className="country-select">
         <p><b>Selected Country</b></p>
          <ReactFlagsSelect
            searchable={true}
            defaultCountry="IN"
            onSelect={handleCountryChange}
          />

         <h3>Country Specified !</h3>
         
        </div>

        <div className="world-record">


          <div className="details-plate confirmed">
            <p>Confirmed</p>
            <p>{selectedCountryDetails && selectedCountryDetails.confirmed && selectedCountryDetails.confirmed.value} </p>
          </div>
          <div className="details-plate re-covered">
            <p>Re-Covered</p>
            <p>{selectedCountryDetails && selectedCountryDetails.recovered && selectedCountryDetails.recovered.value} </p>
          </div>
          <div className="details-plate death">
            <p>Deaths</p>
            <p>{selectedCountryDetails && selectedCountryDetails.deaths && selectedCountryDetails.deaths.value}</p>
          </div>
          <div className="details-plate last-updated">
            <p>Last Updated on</p>
            <p>{selectedCountryDetails && selectedCountryDetails.lastUpdate && new Date(selectedCountryDetails.lastUpdate).toLocaleString()}</p>
          </div>
        </div>
        <div>
       
        </div>
      </div>

      
    </div>

  )

}

export default IndexPage
