import React, { Component } from 'react';
import Chart from 'chart.js';

class BarChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            canvases: [],
        };
    }

    async componentDidMount() {
        let chartConfig = [];
        let canvases = [];
        let answers = this.props.answers;
        let profAverages = this.props.profAverages;
        let selectedTopics = this.props.selectedTopics;
        selectedTopics.forEach(function (topic, y) {
            let onlyProfessionAnswers = answers.filter((answer) => answer.topic === topic.topic)
            let myDataWithAnswers = onlyProfessionAnswers.map((a) => a).sort((a, b) => a.value - b.value).reverse();
            let myData = myDataWithAnswers.map((a) => a.value);
            let answerKeys = myDataWithAnswers.map((a) => a.answer);
            let items = [];
            let answerItems = profAverages.answers;
            let valueItems = profAverages.values;
            for (let i = 0; i < answerItems.length; i++) {
                items[i] = [answerItems[i], [valueItems[i]]];
            }

            let result = [];
            answerKeys.forEach(function (key) {
                let found = false;
                items = items.filter(function (item) {
                    if (!found && item[0] === key) {
                        found = true;
                        result.push(item);
                        return false;
                    } else {
                        return true;
                    }
                })
            })
            let resultMultiD = result.map((a) => a[1]);
            let avgData = resultMultiD.flat();

            let data = {
                labels: answerKeys, //tähän kyssärit db:stä
                datasets: [{
                    "label": "Omat kompetenssini",
                    "yAxisID": "A",
                    "backgroundColor": "rgba(0, 159, 227, 0.2)",
                    "data": myData, //tähän käyttäjän vastaukset db:stä
                    "borderWidth": "1.5",
                    "borderColor": "rgba(0, 159, 227, 1.0)",
                }, {
                    "label": "Vastaajien keskiarvo",
                    "yAxisID": "A",
                    "backgroundColor": "rgba(230, 0, 126, 0.2)",
                    "data": avgData, //tähän keskiarvo db:stä, tietty sama amatiryhma kun vastaajalla
                    "borderWidth": "1.5",
                    "borderColor": "rgba(230, 0, 126, 1.0)",
                }]
            }
            // Chartin asetukset
            let options = {
                title: {
                    display: true,
                    text: topic.topic,
                },
                scales: {
                    yAxes: [{
                        stacked: true,
                        id: 'A',
                        position: 'left',
                        ticks: {
                            beginAtZero: true,
                        },
                        maxBarThickness: 30,
                        categoryPercentage: 0.9,
                        barPercentage: 0.9,
                    }],
                    xAxes: [{
                        display: true,
                        position: 'bottom',
                        ticks: {
                            beginAtZero: true,
                            max: 5.0,
                            min: 0,
                            stepSize: 1.0,
                        }
                    },
                    {
                        type: 'linear',
                        display: true,
                        position: 'top',
                        ticks: {
                            beginAtZero: true,
                            max: 5.0,
                            min: 0,
                            stepSize: 1.0,
                        }
                    }]
                },
            };

            // Luodaan uusi BarChart
            let chartName = "myChart" + y;
            chartConfig.push([chartName, data, options]);
            canvases = [...canvases, chartName];
        }) // End of forEach loop for multi-charts

        await this.setState({ canvases: canvases });
        canvases.forEach(function (canvas, index) {
            const myChart = new Chart(canvas, { type: "horizontalBar", data: chartConfig[index][1], options: chartConfig[index][2] });
        })
    }

    render() {
        let sortedAnswers = this.props.answers.map((a) => a).sort((a, b) => a.value - b.value).reverse();
        let rows = sortedAnswers.map((item, index) => item.category === "ammatti" && (item.value === "1" || item.value === "5") ?
            <p key={index}><b>{item.answer}:</b> {item.value} {item.text}</p>
            : null
        )

        return (
            <div className="surveyContainer">
                <div className="barChartContainer">
                    {this.state.canvases.map((canvas) =>
                        <canvas className="barCanvas" id={canvas} key={canvas}></canvas>)}<p></p>
                </div>
                <div className="palaute">
                    <div className="reviewtext">{rows}</div>
                </div>
                {this.props.surveyState !== 6
                    ? <div>
                        <button className="buttonBackward" onClick={(e) => this.props.move(e, -1)}>Takaisin</button>
                        <button className="buttonForward" onClick={(e) => this.props.move(e, 1)}>Jatka</button>
                    </div>
                    : null

                }


            </div>
        );
    }
}

export default BarChart;
