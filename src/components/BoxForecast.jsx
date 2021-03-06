import React, { Component } from 'react';
import Utils from '../utils/Utils'

export default class BoxForecast extends Component {
    render() {
        return (
            <div className="white forecast-container">
                <p className="white box-forecast">{this.props.data.dayOne}</p>
                <p
                 className="white temperatures">{ `Máxima: ${this.props.data.maxToday}ºC | Mínima: ${this.props.data.minToday}ºC` }</p>
                <p className="white forecast-title">{ Utils.getCondition(this.props.data.condition.toLowerCase()) }</p>
                <p className="white wind">{`Vento: ${this.props.data.windCurrent}Km/h`}</p>
                <p className="white humidity">{`Humidade: ${this.props.data.humidityCurrent}%`}</p>
                <p className="white pressure">{`Pressão: ${this.props.data.pressureCurrent}PA`}</p>
            </div>
        )
    }
}