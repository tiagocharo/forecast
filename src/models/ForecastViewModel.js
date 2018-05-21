export default class ForecastViewModel {
    constructor(response) {
        const item = response.query.results.channel;
        this.location = item.location.city;
        this.country = item.location.country;
        this.condition = item.item.forecast[0].text;        
        this.windCurrent = item.wind.speed;
        this.humidityCurrent = item.atmosphere.humidity;
        this.pressureCurrent = item.atmosphere.pressure;
        
        this.dayOne = item.item.forecast[0].day;
        this.tempOne = item.item.forecast[0].text;
        this.maxOne = this.toCelsius(item.item.forecast[0].high);
        this.minOne = this.toCelsius(item.item.forecast[0].low);

        this.dayTwo = item.item.forecast[1].day;
        this.tempTwo = item.item.forecast[1].text;
        this.maxTwo = this.toCelsius(item.item.forecast[1].high);
        this.minTwo = this.toCelsius(item.item.forecast[1].low);

        this.dayThree = item.item.forecast[2].day;
        this.tempThree = item.item.forecast[2].text;
        this.maxThree = this.toCelsius(item.item.forecast[2].high);
        this.minThree = this.toCelsius(item.item.forecast[2].low);

        this.dayFour = item.item.forecast[3].day;
        this.tempFour = item.item.forecast[3].text;
        this.maxFour = this.toCelsius(item.item.forecast[3].high);
        this.minFour = this.toCelsius(item.item.forecast[3].low);

        this.dayFive = item.item.forecast[4].day;
        this.tempFive = item.item.forecast[4].text;
        this.maxFive = this.toCelsius(item.item.forecast[4].high);
        this.minFive = this.toCelsius(item.item.forecast[4].low);

        this.daySix = item.item.forecast[5].day;
        this.tempSix = item.item.forecast[5].text;
        this.maxSix = this.toCelsius(item.item.forecast[5].high);
        this.minSix = this.toCelsius(item.item.forecast[5].low);

        this.daySeven = item.item.forecast[6].day;
        this.tempSeven = item.item.forecast[6].text;
        this.maxSeven = this.toCelsius(item.item.forecast[6].high);
        this.minSeven = this.toCelsius(item.item.forecast[6].low);
        console.log(response)
    }

    toCelsius(temperature) {
        return Math.round(((parseFloat(temperature) - 32) * 5) / 9);
    }
}