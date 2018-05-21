import React, { Component } from 'react';
import './app.css';
import Text from './components/Text';
import ForecastViewModel from './models/ForecastViewModel';
import Utils from './utils/Utils';
import loading from './images/loading.gif';
import BoxForecast from './components/BoxForecast';

export default class App extends Component {

  constructor() {
    super()
    this.state = {
      image: null,
      forecast: null,
      willMount: false,
      isCelsius: true,
      today: null,
      tomorrow: null,
      afterTomorrow: null,
      temperature: null
    }
  }

  componentWillMount() {
    // this.fetchBackgroundPage();

    /*verifiry localization*/
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.successFunction.bind(this));
    } else {
      alert('Parece que a Geolocalização, que é necessária para esta página, não está ativada no seu navegador.');
    }
  }

  componentDidUpdate() {
    if(this.state.willMount) {
      this.app.addEventListener('keydown', (event) => {
        if(event.keyCode === 13) {
          this.fetchForecast()
        }
      })
    }
  }

  /*fetch actually localization*/
  successFunction(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let url = `https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (SELECT woeid FROM geo.places WHERE text="(${lat},${long})")&format=json`;
    fetch(url)
      .then(response => response.json())
      .then(response => {
        const forecast = new ForecastViewModel(response);

        this.setState({
          forecast: forecast,
          willMount: true
        })
      })
  }
  /*fetch background-image before mount*/
  fetchBackgroundPage() {
    const no_cors = 'https://cors-anywhere.herokuapp.com/';
    const url = "https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=pt-BR";
    fetch(`${no_cors}${url}`)
      .then(response => response.json())
      .then(response => {
          const image = `https://www.bing.com${response.images[0].url}`;
          this.setState({
            image: image
          })
      });
  }
  /*fetch localization*/
  fetchForecast() {
    const location_name = this.textInput.value;
    if(!location_name) {
      return
    }

    let url = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${location_name}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;

    fetch(url)
      .then(response => response.json())
      .then(response => {
        if(!response.query.results) {
          return
        }
        const forecast = new ForecastViewModel(response);

        this.setState({
          forecast: forecast,
          isCelsius: true
        })
      })
  }

  convertDayWeek(day) {
    switch(day) {
        case 'Mon':
            return 'Segunda-Feira'
            break
        case 'Tue':
            return 'Terça-Feira'
            break
        case 'Wed':
            return 'Quarta-Feira'
            break
        case 'Thu':
            return 'Quinta-Feira'
            break
        case 'Fri':
            return 'Sexta-Feira'
            break
        case 'Sat':
            return 'Sábado'
            break
        case 'Sun':
            return 'Domingo'
            break
        default:
            return ''
    }
  }

  render() {
    let { forecast } = this.state;
    return (
      this.state.willMount ?

      <div 
        className="app"
        id="app"
        // style={{background: `url(${this.state.image})`}}
        ref={(app) => { this.app = app }}>
        <div className="main-box">
          <div className="search">
            <input 
              type="combobox"
              ref={(input) => { this.textInput = input; }}
              className="text-input"/>
            <button 
              onClick={ this.fetchForecast.bind(this) }
              className="button-search">Buscar</button>
            <Text 
              className="text-location"
              text={ `${forecast.location}, ${forecast.country}` }/>
          </div>

          <div className="forecast">
            <div className={`container box-today ${ Utils.getClassName(forecast.maxOne) }`}>
              <div className="image-forecast">
                <img src={ `${Utils.getUrlImage(forecast.tempOne.toLowerCase())}` } />
              </div>
              <Text
                className="white box-forecast"
                text={this.convertDayWeek(forecast.dayOne)}/>
              <Text 
                className="white temperatures"
                text={ `Máxima: ${forecast.maxOne}ºC | Mínima: ${forecast.minOne}ºC` } />
            </div>
          </div>

          <div className="forecast">
            <div className={`container box-today ${ Utils.getClassName(forecast.maxTwo) }`}>
              <div className="image-forecast">
                <img src={ `${Utils.getUrlImage(forecast.tempTwo.toLowerCase())}` } />
              </div>
              <Text
                className="white box-forecast"
                text={this.convertDayWeek(forecast.dayTwo)}/>
              <Text 
                className="white temperatures"
                text={ `Máxima: ${forecast.maxTwo}ºC | Mínima: ${forecast.minTwo}ºC` } />
            </div>
          </div>
          
          <div className="forecast">
            <div className={`container box-today ${ Utils.getClassName(forecast.maxThree) }`}>
              <div className="image-forecast">
                <img src={ `${Utils.getUrlImage(forecast.tempThree.toLowerCase())}` } />
              </div>
              <Text
                className="white box-forecast"
                text={this.convertDayWeek(forecast.dayThree)}/>
              <Text 
                className="white temperatures"
                text={ `Máxima: ${forecast.maxThree}ºC | Mínima: ${forecast.minThree}ºC` } />
            </div>
          </div>

          <div className="forecast">
            <div className={`container box-today ${ Utils.getClassName(forecast.maxFour) }`}>
              <div className="image-forecast">
                <img src={ `${Utils.getUrlImage(forecast.tempFour.toLowerCase())}` } />
              </div>
              <Text
                className="white box-forecast"
                text={this.convertDayWeek(forecast.dayFour)}/>
              <Text 
                className="white temperatures"
                text={ `Máxima: ${forecast.maxFour}ºC | Mínima: ${forecast.minFour}ºC` } />
            </div>
          </div>

          <div className="forecast">
            <div className={`container box-today ${ Utils.getClassName(forecast.maxFive) }`}>
              <div className="image-forecast">
                <img src={ `${Utils.getUrlImage(forecast.tempFive.toLowerCase())}` } />
              </div>
              <Text
                className="white box-forecast"
                text={this.convertDayWeek(forecast.dayFive)}/>
              <Text 
                className="white temperatures"
                text={ `Máxima: ${forecast.maxFive}ºC | Mínima: ${forecast.minFive}ºC` } />
            </div>
          </div>
          
          <div className="forecast">
            <div className={`container box-today ${ Utils.getClassName(forecast.maxSix) }`}>
              <div className="image-forecast">
                <img src={ `${Utils.getUrlImage(forecast.tempSix.toLowerCase())}` } />
              </div>
              <Text
                className="white box-forecast"
                text={this.convertDayWeek(forecast.daySix)}/>
              <Text 
                className="white temperatures"
                text={ `Máxima: ${forecast.maxSix}ºC | Mínima: ${forecast.minSix}ºC` } />
            </div>
          </div>

          <div className="forecast">
            <div className={`container box-today ${ Utils.getClassName(forecast.maxSeven) }`}>
              <div className="image-forecast">
                <img src={ `${Utils.getUrlImage(forecast.tempSeven.toLowerCase())}` } />
              </div>
              <Text
                className="white box-forecast"
                text={this.convertDayWeek(forecast.daySeven)}/>
              <Text 
                className="white temperatures"
                text={ `Máxima: ${forecast.maxSeven}ºC | Mínima: ${forecast.minSeven}ºC` } />
            </div>
          </div>
          
        </div>
      </div> 
      :  
        <div className="divImage">
          <img src={loading} />
          <p><b>Sua localização precisa estar ativada.</b></p>
        </div>
    );
  }
}
