import React, { Component } from 'react';
import Chart from 'chart.js';

class RadarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      rows1: [],
      rows2: [],
    };
  }

  componentDidMount() {
    let filteredAnswers = this.props.answers.filter((answer) => answer.topic !== "Yleisettiedot");
    this.props.selectedTopics.forEach(function (element) {
      filteredAnswers.filter((answer) => answer.topic !== element.topic);
    })

    let genTopics = this.props.getGenTopics();
    filteredAnswers.forEach(element => {
      genTopics.forEach(topic => {
        if (element.topic === topic) {
        }
      })
    })

    let answerArray = [];
    let labelArray = [];
    genTopics.forEach(topic => {
      let topicArray = [];
      filteredAnswers.forEach(element => {
        if (element.topic === topic) {
          topicArray.push(element);
        }
      })
      answerArray.push(topicArray);
      labelArray.push(topic);
    })
    let high = [];
    let low = [];

    filteredAnswers.forEach(element => {
      if (Number(element.value) === 5) {
        high.push(element);
      }
      else if (Number(element.value) === 1) {
        low.push(element);
      }
    })

    let averageArray = [];
    answerArray.forEach(element => {
      let answerValues = element.map((a) => Number(a.value));
      let sum = answerValues.reduce((previous, current) => current + previous);
      let avg = (sum / answerValues.length).toFixed(2);
      averageArray.push(avg);
    })

    let ctx = document.getElementById("radarChart");
    let radarChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labelArray,
        datasets: [{
          label: "Omat kompetenssini",
          data: averageArray,
          "backgroundColor": "rgba(0, 159, 227, 0.5)",
          "borderWidth": "2",
          "borderColor": "rgba(0, 159, 227, 1.0)",
          "lineTension": "-0.1"
        },]
      },
      options: {
        scale: {
          ticks: {
            beginAtZero: true,
            max: 5,
            stepSize: 1.0,
          },
          pointLabels: {
            fontSize: 12
          }
        },
        legend: {
          display: false
        }
      }
    });

    let i = 0;
    let rows1 = [];
    let rows2 = [];
    let helper = ''
    let helpertext = this.props.feedback[0]
    //FIXME: Key should be unique!
    let b = 0;
    let x = 0;
    for (i = 0; i < high.length; i++) {
      let helper = helpertext.High.filter((a) => a.name === high[i].answer)
      for (b = 0; b < helper.length; b++) {
        rows1.push(<p key={b}><span className="bold">{helper[b].name}: </span>{helper[b].text}</p>)
      }
    }
    for (i = 0; i < low.length; i++) {
       helper = helpertext.Low.filter((a) => a.name === low[i].answer)
      for (x = 0; x < helper.length; x++) {
        rows2.push(<p key={x}><span className="bold">{helper[x].name} </span></p>)
      }
    }
    this.setState({ rows1: rows1 })
    this.setState({ rows2: rows2 })
  }
  render() {
    return (
      <div className="surveyContainer">
        <div className="radarChartContainer">
          <canvas id="radarChart" width="100" height="60"></canvas>
        </div>
        <div id="palaute">
          {this.state.rows1.length > 0
            ? <div className="reviewtext">
              <h3 className="reviewtextH3">Itsearviosi perusteella osaamisesi on vahvalla tasolla seuraavissa </h3>
              {this.state.rows1}
            </div>
            : null
          }

          {this.state.rows2.length > 0
            ? <div className="reviewtext">
              <h3 className="reviewtextH3">Kehittääksesi osaamistasi sinun kannattaa huomioida </h3>
              {this.state.rows2}
            </div>
            : null
          }
        </div>
        {this.props.surveyState !== 3
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

export default RadarChart;
