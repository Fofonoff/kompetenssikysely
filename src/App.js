import React from 'react';
import './App.css';
import fire from './fire'
import List from './components/List'
import SelectProfession from './components/SelectProfession'
import BarChart from './components/BarChart';
import Header from './components/Header'
import Footer from './components/Footer'
import WelcomePage from './pages/WelcomePage'
import SelectGeneral from './components/SelectGeneral'
import GeneralList from './components/GeneralList'
import topicService from './services/topics'
import answerService from './services/answers'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            topics: [],
            subtopics: [],
            yleinen: {},
            key: '',
            answers: [],
            surveyState: 0,
            states: {
                WelcomePage: 0,
                General: 1,
                General2: 2,
                SELECTPROF: 3,
                PROFESSION: 4,
                PROFANSW: 5,
            },
            professionAnswers: [],
            selectedTopics: [],
            calculated: false,
            profAverages: { values: [], answers: []}
        }
    }

    async componentDidMount() {
        const topics = await topicService.getAll()
        const professionAnswers = await answerService.getAll()
        this.setState({ topics, professionAnswers })
    }

    changeOption = (event) => {
        const answerObj = {
            answer: event.target.name,
            value: event.target.value,
            topic: event.target.dataset.parent
        }
        const updatedAnswers = this.state.answers.filter(answer => answerObj.answer !== answer.answer)
        console.log(answerObj, "ja sitten array", updatedAnswers)
        this.setState({ answers: updatedAnswers.concat(answerObj) })
    }

    sendAnswers = (event) => {
        event.preventDefault()
        const answers = {}
        const selectedTopics = this.state.selectedTopics.map(topic => topic.topic)
        selectedTopics.forEach((topic) => {
            let answerSet = this.state.answers.filter(answers => answers.topic === topic).map(a =>   a={answer: a.answer, value: a.value})
            const dataObject = {Answers: answerSet, date: '28/9/2018'}
            if (dataObject.Answers.length === 0) {
                window.confirm(`${topic} must have answers!`)
            } else {
                answers[topic] = dataObject
            }
        })
        let key = ''
        if (this.state.key === '') {
            key = fire.database().ref().child('answers').push(answers)
            this.setState({ key: key.key })
        } else {
            key = fire.database().ref('answers').child(this.state.key).set(answers);
        }
        this.moveForward()
    }

    changeProfessions = (item) => {
        //topicObject ottaa arvot checkBoxissa valitun objectin attribuuteista
        const topicObject = {
            topic: item.text,
            subs: item.ST01
        }
        const selectedTopics = this.state.selectedTopics.map(topic => topic.topic)
        // filteröidään pois topicit, jotka on jo valittu => eli checkboxia kuń painetaan uudestaan - se lähtee pois statesta!!!
        if (selectedTopics.includes(topicObject.topic)) {
            const updatedTopics = this.state.selectedTopics.filter(topic => topic.topic !== topicObject.topic)
            this.setState({ selectedTopics: updatedTopics })
        } else {  // muussa tapauksessa lisätään topic listaan
            this.setState({ selectedTopics: [...this.state.selectedTopics, topicObject] })
        }
    }

    show = (event, item) => {
        event.preventDefault()
        const subtopics = Object.values(item).map(topic => topic).filter(o => typeof o === 'object')
        if (this.state.subtopics.length === 0) {
            this.setState({ subtopics })
        } else {
            this.setState({ subtopics: [] })
        }
    }

    handleProfessionAnswers = (event) => {
        event.preventDefault()
        const professions = this.state.selectedTopics.map(t => t.topic)
        const answerArray = []
        this.state.professionAnswers.forEach((answers) => {
            professions.forEach((profession, i) => {
                if(answers[professions[i]]){
                    answerArray.push(answers[professions[i]])
                }
            })
        })
        const onlyAnswers = answerArray.map(l => l.Answers).reduce((a, b) => [...a, ...b])
        const uniqueAnswers = [...new Set(onlyAnswers.map(a => a.answer))]
        console.log('unique',uniqueAnswers)
        const answerAverages = [];
        uniqueAnswers.forEach((element) => {
            const tempArr = onlyAnswers.filter((answer) =>
                element === answer.answer);
            const valueArr = tempArr.map((a) => parseInt(a.value));
            var sum = valueArr.reduce((previous, current) => current + previous);
            var avg = sum / valueArr.length;
            answerAverages.push(avg);
            return answerAverages;
        });
        const profAverages = {values: answerAverages, answers: uniqueAnswers}
        this.setState({ profAverages, calculated: true })
        this.moveForward()
    }

    //kutsutaan kun liikutaan statesta ylöspäin !!
    moveForward = () => {
        this.setState({ surveyState: this.state.surveyState + 1 })
    }

    //tämä siirtää eteenpäin prof-selectistä
    selectProfessions = (event) => {
        event.preventDefault()
        this.handleProfessionAnswers()
        this.moveForward()
    }

    render() {
        switch (this.state.surveyState) {
            default: {
                return (
                    <div className="App">
                        <header className="App-header">
                            <h1 className="App-title">if something went wrong</h1>
                        </header>
                        <h2> you will see this </h2>
                    </div>
                )
            }
            case this.state.states.WelcomePage: {
                return (
                    <div className="App">
                        <Header />
                        <WelcomePage moveForward={this.moveForward} />
                        <Footer />
                    </div>
                )
            }
            case this.state.states.General: {
                return (
                    <div className="App">
                        <Header />
                        <SelectGeneral topics={this.state.topics} moveForward={this.moveForward} changeOption={this.changeOption} />
                        <Footer />
                    </div>
                )
            }
            case this.state.states.General2: {
                return (
                    <div className="App">
                        <Header />
                        <GeneralList topics={this.state.topics} moveForward={this.moveForward} changeOption={this.changeOption}/>
                        <Footer />
                    </div>
                )
            }
            case this.state.states.SELECTPROF: {
                return (
                    <div className="App">
                        <Header />
                        <SelectProfession topics={this.state.topics} handleProfessionsAndMove={this.handleProfessionAnswers}
                                          selectedTopics={this.state.selectedTopics} changeProfessions={this.changeProfessions} />
                        <Footer />
                    </div>
                )
            }
            case this.state.states.PROFESSION: {
                return (
                    <div className="App">
                        <Header />
                        <List topics={this.state.selectedTopics}
                              changeOption={this.changeOption} sendAnswers={this.sendAnswers} />
                        <Footer />
                    </div>
                )
            }
            // FIXME: calculated käyttö renderiin??
            case this.state.states.PROFANSW: {
                return (
                    <div className="Chart">
                        <div className="App">
                            <Header />
                            {!this.state.calculated ? null : <BarChart answers={this.state.answers} profAverages={this.state.profAverages}></BarChart>}
                            <Footer />
                        </div>
                    </div>
                )
            }
        }
    }
}

export default App;
