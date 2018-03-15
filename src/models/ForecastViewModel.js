export default class ForecastViewModel {
    constructor(response) {
        const item = response.query.results.channel;
        this.location = item.location.city;
        this.country = item.location.country;
        this.condition = item.item.forecast[0].text;        
        this.windCurrent = item.wind.speed;
        this.humidityCurrent = item.atmosphere.humidity;
        this.pressureCurrent = item.atmosphere.pressure;
        this.maxToday = this.toCelsius(item.item.forecast[0].high);
        this.minToday = this.toCelsius(item.item.forecast[0].low);
        this.maxTommorrow = this.toCelsius(item.item.forecast[1].high);
        this.minTommorrow = this.toCelsius(item.item.forecast[1].low);
        this.maxAfterTommorrow = this.toCelsius(item.item.forecast[2].high);
        this.minAfterTommorrow = this.toCelsius(item.item.forecast[2].low);
        
console.log(response)
    }

    toCelsius(temperature) {
        return Math.round(((parseFloat(temperature) - 32) * 5) / 9);
    }
}