import React from 'react';
import './App.css';
import List from './components/List';
import SelectProfession from './components/SelectProfession';
import BarChart from './components/BarChart';
import Header from './components/Header';
import Footer from './components/Footer';
import WelcomePage from './pages/WelcomePage';
import GeneralList from './components/GeneralList';
import topicService from './services/topics';
import answerService from './services/answers';
import feedbackService from './services/feedback'
import RadarChart from './components/RadarChart';
import Summary from './components/Summary';
import Improvement from './components/Improvement';

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            canSubmit: false,
            topics: [],
            genTopics: [],
            genGenTopics: [],
            profTopics: [],
            feedback: [],
            answers: [],
            surveyState: 4,
            states: {
                WelcomePage: 0,
                General: 1,
                General2: 2,
                Radar: 3,
                SELECTPROF: 4,
                PROFESSION: 5,
                PROFANSW: 6,
                SUMMARY: 7,
                IMPROV: 8,
            },
            professionAnswers: [],
            selectedTopics: [],
            calculated: false,
            profAverages: {
                values: [],
                answers: []
            }
        }
    }

    async componentDidMount() {
        const topics = await topicService.getAll() //haetaan tietokannan tiedot rest-urlista asynkronisesti ja asetetaan tilaan
        const professionAnswersAll = await answerService.getAll()

        const professionAnswers = professionAnswersAll.filter(t => typeof t === 'object')
        const filterGeneral = topics.filter(t => t.category === 'yleinen' && typeof t === 'object')
        const genTopics = Object.values(filterGeneral[0]).map(t => t).filter(t => typeof t === 'object' && t.text !== 'Vastaajan taustatiedot')
        const genGenTopics = Object.values(filterGeneral[0]).map(t => t).filter(t => typeof t === 'object' && t.text === 'Vastaajan taustatiedot')
        const profTopics = topics.filter(t => typeof t === 'object')

        this.setState({ professionAnswers, genTopics, genGenTopics, profTopics, topics, feedback: await feedbackService.getAll() })
    }

    changeOption = (event) => {

        const name = event.target.name.split("*")

        const answerObj = {
            answer: name[0],
            value: event.target.dataset.aval,
            topic: event.target.dataset.parent,
            text: event.target.dataset.atext,
            category: event.target.dataset.acat
        }
        let updatedAnswers = this.state.answers.filter(answer => answerObj.answer !== answer.answer)
        const duplicateAnswersOnDifferentTopics = this.state.answers.filter(answer => answerObj.answer === answer.answer && answerObj.topic !== answer.topic)
        if (duplicateAnswersOnDifferentTopics.length > 0) {
            if (duplicateAnswersOnDifferentTopics[0].topic !== answerObj.topic) {
                const duplicateAnswers = duplicateAnswersOnDifferentTopics.concat(answerObj)
                this.setState({ answers: updatedAnswers.concat(duplicateAnswers) })
            }
        } else {
            this.setState({ answers: updatedAnswers.concat(answerObj) })
        }

    }

    getChecked = (x, item, parent) => {
        console.log(x, item, parent)
        let name = ''
        if (x.includes("*")) {
            name = x.split("*")
        }
        const result = name === '' ? x : name[0]
        const filterAnswers = this.state.answers.filter(a => a.answer === result && a.topic === parent)
        const found = filterAnswers.filter(a => parseInt(a.value) === item)
        return found.length === 1
    }

    getSelected = (x) => {
        const found = this.state.selectedTopics.filter(a => a.topic === x)
        return found.length === 1
    }

    sendAnswers = async (event) => {
        event.preventDefault()
        const dateSet = new Date().toLocaleDateString('fi-FI')
        const answers = this.state.answers.map(a => a = { answer: a.answer, value: a.value, topic: a.topic, category: a.category })
        const dataObject = { Answers: answers, date: dateSet }
        await answerService.sendAnswers(dataObject)
        this.moveForwardProf()
    }

    changeProfessions = (item) => {
        const topicObject = { topic: item.text, subs: item.ST01 }
        const selectedTopics = this.state.selectedTopics.map(topic => topic.topic)
        if (selectedTopics.includes(topicObject.topic)) {   // filteröidään pois topicit, jotka on jo valittu =>
            const updatedTopics = this.state.selectedTopics.filter(topic => topic.topic !== topicObject.topic) // kuń painetaan uudestaan - se lähtee pois statesta!!!
            this.setState({ selectedTopics: updatedTopics })
        } else {  // muussa tapauksessa lisätään topic listaan
            this.setState({ selectedTopics: [...this.state.selectedTopics, topicObject] })
        }
    }

    handleProfessionAnswers = (event) => {
        event.preventDefault()
        const professions = this.state.selectedTopics.map(t => t.topic)
        const answerArray = []
        this.state.professionAnswers.forEach((answers) => { //jokainen alkio sisältää vastauslistan
            professions.forEach((profession, i) => {
                const topicAnswers = answers.Answers.filter(answer => answer.topic === profession)
                answerArray.push(topicAnswers)
            })
        })
        if (answerArray.length === 0) {
            const profAverages = { values: [], answers: [] }
            this.setState({ profAverages })
            this.moveForwardProf()
        } else {
            const onlyAnswers = answerArray.reduce((a, b) => [...a, ...b]) // kaikki vastaukset valittuihin kompetensseihin
            const uniqueAnswers = [...new Set(onlyAnswers.map(a => a.answer))] //uniikit vastausnimet
            const answerAverages = []
            uniqueAnswers.forEach((element) => {
                const tempArr = onlyAnswers.filter((answer) =>
                    element === answer.answer)
                const valueArr = tempArr.map((a) => parseInt(a.value));
                var avg = (valueArr.reduce((previous, current) => current + previous, 0) / valueArr.length).toFixed(2)
                answerAverages.push(avg);
                return answerAverages;
            });
            const profAverages = { values: answerAverages, answers: uniqueAnswers }
            this.setState({ profAverages, calculated: true })
            this.moveForwardProf()
        }
    }

    move = (e, x) => {
        e.preventDefault()
        window.scrollTo(0, 0)
        this.setState({ surveyState: this.state.surveyState + x })
    }

    moveForwardProf = () => {
        window.scrollTo(0, 0)
        this.setState({ surveyState: this.state.surveyState + 1 })
    }

    selectProfessions = (event) => {
        event.preventDefault()
        this.handleProfessionAnswers()
    }

    getGenTopics = () => {
        return this.state.genTopics.map(a => a.text);
    }

    render() {

        switch (this.state.surveyState) {
            default: {
                return (
                    <div className="App">
                        <h2> default </h2>
                    </div>
                )
            }

            case this.state.states.WelcomePage: {
                return (
                    <div className="App">
                        <Header surveyState={this.state.surveyState} states={this.state.states} />
                        <WelcomePage moveForward={this.move} />
                        <Footer />
                    </div>
                )
            }

            case this.state.states.General: {
                return (
                    <div className="App">
                        <Header surveyState={this.state.surveyState} states={this.state.states} />
                        <GeneralList getChecked={this.getChecked} topics={this.state.genGenTopics} move={this.move} changeOption={this.changeOption} />
                        <Footer />
                    </div>
                )
            }

            case this.state.states.General2: {
                return (
                    <div className="App">
                        <Header surveyState={this.state.surveyState} states={this.state.states} />
                        <GeneralList topics={this.state.genTopics} getChecked={this.getChecked} move={this.move} changeOption={this.changeOption} />
                        <Footer />
                    </div>
                )
            }

            case this.state.states.Radar: {
                return (
                    <div className="App">
                        <Header surveyState={this.state.surveyState} states={this.state.states} />
                        <RadarChart selectedTopics={this.state.selectedTopics} answers={this.state.answers} move={this.move} getGenTopics={this.getGenTopics} feedback={this.state.feedback}></RadarChart>
                        <Footer />
                    </div>
                )
            }

            case this.state.states.SELECTPROF: {
                return (
                    <div className="App">
                        <Header surveyState={this.state.surveyState} states={this.state.states} />
                        <SelectProfession topics={this.state.profTopics} handleProfessionsAndMove={this.handleProfessionAnswers}
                            selectedTopics={this.state.selectedTopics} changeProfessions={this.changeProfessions} getChecked={this.getSelected} move={this.move} />
                        <Footer />
                    </div>
                )
            }

            case this.state.states.PROFESSION: {
                return (
                    <div className="App">
                        <Header surveyState={this.state.surveyState} states={this.state.states} />
                        <List topics={this.state.selectedTopics} getChecked={this.getChecked}
                            changeOption={this.changeOption} sendAnswers={this.sendAnswers} move={this.move} />
                        <Footer />
                    </div>
                )
            }

            case this.state.states.PROFANSW: {
                return (
                    <div className="App">
                        <Header surveyState={this.state.surveyState} states={this.state.states} />
                        {!this.state.calculated ? null : <BarChart answers={this.state.answers} profAverages={this.state.profAverages}
                            selectedTopics={this.state.selectedTopics} move={this.move}></BarChart>}
                        <Footer />
                    </div>
                )
            }

            case this.state.states.SUMMARY: {
                return (
                    <div className="App">
                        <Header surveyState={this.state.surveyState} states={this.state.states} />
                        <div className="summaryPageCharts">
                            <RadarChart answers={this.state.answers} moveForward={this.moveForward} selectedTopics={this.state.selectedTopics} surveyState={this.state.surveyState}
                                getGenTopics={this.getGenTopics} feedback={this.state.feedback} />
                            <BarChart answers={this.state.answers} profAverages={this.state.profAverages} selectedTopics={this.state.selectedTopics} move={this.state.move}
                                surveyState={this.state.surveyState} getGenTopics={this.getGenTopics} /></div>
                        <Summary moveForward={this.moveForwardProf} feedback={this.state.feedback} />
                        <Footer />
                    </div>
                )
            }
            case this.state.states.IMPROV: {
                return (
                    <div className="App">
                        <Header surveyState={this.state.surveyState} states={this.state.states} />
                        <Improvement answers={this.state.answers} />
                        <Footer />
                    </div>
                )
            }
        }
    }
}
export default App;
