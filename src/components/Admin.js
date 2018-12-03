import React, { Component } from 'react';
import topicService from '../services/topics';
import axios from 'axios'
import AdminList from './AdminList';
import fire from '../fire';
import Notification from './Notification'

class Admin extends Component {
    constructor(props){
        super(props)
        this.state = {
            topics : [],
            newProf : "",
            profArray : "",
            questions: [],
            option1: "",
            option3: "",
            option5: "",
            text: "",
            quesnmb: "",
            topicnmb: "",
            message: null,
            selectedProf: ''
        }
    }

async componentDidMount() {
    this.setState({topics : await topicService.getAll()});
}

uusAmmatti = (event) => {
    this.setState({newProf : event.target.value})
}

newProfToDB = async(event) => {
    event.preventDefault();
   let i = this.state.topics.length + 1;
   let topicnmbr = 'T0' + i;
   let jsondata = {
            category : "ammatti",
            ST01 : {
                text: this.state.newProf
            },
            text : this.state.newProf
    }
    if (jsondata.text === ""){
        window.alert("Kompetenssi ei voi olla tyhjä!")
        return;
    }
    //console.log("Kohti kantaa ja sen yli..." + jsondata);
    await topicService.newTopic(jsondata, topicnmbr)
    this.setState({topics: await topicService.getAll(), message: "profession " + jsondata.text +" saved"});
      //console.log(JSON.stringify(this.state.topics));
        setTimeout(() => {
            this.setState({ message: null })
    }, 5000)
}

deleteProf = async (event) => {
    const index = event.target.id;
    let delArray = this.state.topics.filter(t => t.text !== index);
    let tobeDEL = JSON.stringify(delArray);
    await topicService.removeTopic(tobeDEL)
    this.setState({topics: await topicService.getAll(), message: "profession " + index +" deleted", selectedProf: ''});
    setTimeout(() => {
        this.setState({ message: null })
    }, 5000)
}

editQuestions = async (event) => {
    this.setState({text: event.target.dataset.topic});
    let vaihtoehto = event.target.dataset.options.split(":");
    let subsubtopic = parseInt(event.target.dataset.iteration, 10) + 1;
    if (subsubtopic < 10) {
        await this.setState({quesnmb: "SST0" + parseInt(subsubtopic, 10) });
    }
    else {
        await this.setState({quesnmb: "SST" + parseInt(subsubtopic, 10) });
    }
    if (parseInt(vaihtoehto[1], 10) === 0){
        this.setState({option1 : vaihtoehto[0]})
    }
    if (parseInt(vaihtoehto[3], 10) === 1){
        this.setState({option3 : vaihtoehto[2].substring(1)})
    }
    if (parseInt(vaihtoehto[5], 10) === 2){
        this.setState({option5 : vaihtoehto[4].substring(1)})
    }

    //alkuperänen plääni tehä tällä kerralla kaikki toi mitä tapahtuu changeValuessa,
    //ei saanu datasettiä skulaa koska ylläri ku on inputissa kiinni ni ei oikee liiku enempää dataa esim kaikista kerral
}

changeValue = (event) => {
    //console.log(event.target.dataset.bame);
    var vaihtoehto = event.target.dataset.options.split(":");
    var splitText = event.target.dataset.bame.split(":")
    var subsubtopic = parseInt(event.target.dataset.iteration, 10) + 1;
    if (subsubtopic < 10) {
        this.setState({quesnmb: "SST0" + parseInt(subsubtopic, 10) });
    }
    else {
        this.setState({quesnmb: "SST" + parseInt(subsubtopic, 10) });
    }

    //console.log("Question number is: "+ this.state.quesnmb)
    this.setState({text: splitText[0]})
    if (parseInt(vaihtoehto[1], 10) === 0){
    this.setState({option1 : vaihtoehto[0]})
    }
    if (parseInt(vaihtoehto[1], 10) === 1){
        this.setState({option3 : vaihtoehto[0]})
    }
    if (parseInt(vaihtoehto[1], 10) === 2){
        this.setState({option5 : vaihtoehto[0]})
    }
}
showQuestions = async (event) => {
    let key = ''
    let quesKey = ''
    let subtopicnumber = ''
    let splitSST = ''
    let indexNumber = ''
    const index = event.target.id;
    let profArray = this.state.topics.filter(t => t.text === index);
    let questions = Object.values(profArray[0].ST01).map(option => option).filter(o => typeof o === 'object')
    await fire.database().ref('/topics/').orderByChild('text').equalTo(index).once('value', function(snapshot) {
        key =  Object.keys(snapshot.val()); //haetaan key firestä
        return key;

     })

     this.setState({topicnmb : key});
    if (questions.length === 0 ){
        subtopicnumber = "SST01";
       this.setState({quesnmb : subtopicnumber});
    }//tää on iha infernaalinen ifelsetys... ei pysty sellittää
        else if (questions.length > 0 || questions.length < 10) {

            await fire.database().ref('/topics/' + this.state.topicnmb + '/ST01/').orderByChild('text').once('value', function(snapshot) {
                quesKey = Object.keys(snapshot.val()); //haetaan key firestä
                return quesKey;
            })
            let i = ''
            if (quesKey.length === 2) {
                 i = quesKey.length - 2;
            } else {
                 i = quesKey.length - 2;
            }
             splitSST = quesKey[i].split("T");
             indexNumber = Number(splitSST[1]) + 1;
             subtopicnumber = "SST0" + indexNumber;
            this.setState({quesnmb : subtopicnumber});
            }
            else {
                await fire.database().ref('/topics/' + this.state.topicnmb + '/ST01/').orderByChild('text').once('value', function(snapshot) {
                        quesKey = Object.keys(snapshot.val()); //haetaan key firestä
                        return quesKey;
                })
                let i = quesKey.length - 2;
                 splitSST = quesKey[i].split("T");
                 indexNumber = Number(splitSST[1]) + 1;
                 subtopicnumber = "SST" + indexNumber;
                this.setState({quesnmb : subtopicnumber});
            }
    if(this.state.selectedProf !== ''){
        this.setState({ questions: [], selectedProf: ''})
    }       else {
                this.setState({ questions, selectedProf: index })
    }

}

inputChanged = (event) => {
    this.setState({[event.target.name]: event.target.value });
};


deleteQuestion = async (event) => {
    const url = fire.options.databaseURL;
    let quesKey = "";
    let subsubtopicIteration = event.target.dataset.iteration.split(":");

   await fire.database().ref('/topics/' + this.state.topicnmb + '/ST01/').orderByChild('text').equalTo(subsubtopicIteration[0]).once('value', function(snapshot) {
            quesKey = Object.keys(snapshot.val()); //haetaan key firestä
            return quesKey;
    })
    this.setState({quesnmb : quesKey});

    await axios.delete(url + '/topics/' + this.state.topicnmb+ '/ST01/' +this.state.quesnmb + '/.json');
    this.setState({topics: await topicService.getAll(), message: "question " + this.state.topicnmb + " deleted", questions: []});
    setTimeout(() => {
        this.setState({ message: null })
    }, 5000)
};


newQuestiontoDB = async (event) => {
    const url = fire.options.databaseURL
    event.preventDefault();
    let topicnmb = this.state.topicnmb;
    let quesnmb = this.state.quesnmb;
    let option1 = this.state.option1;
    let option3 = this.state.option3;
    let option5 = this.state.option5;
    let text = this.state.text;
    if (option1 === "" || option3 === "" || option5 === "" || text === ""){
        window.alert("Vastausvaihtoehto ei voi olla tyhjä!")
        return;
    }
    let tobeUpdated = {
        option1 : {"text": option1, "value": 1},
        option3 : {"text": option3, "value": 3},
        option5 : {"text": option5, "value": 5},
        text : text,
        type : "radio"
    }
    await axios.patch(url + '/topics/' + topicnmb + '/ST01/' + quesnmb + '/.json', tobeUpdated);
    const topics = await topicService.getAll()
    this.setState({ topics, questions: [], message: "question " + tobeUpdated.text + " saved ", option1: '', option3: '', option5: '', text: ''});
    setTimeout(() => {
        this.setState({ message: null })
    }, 5000)
}

    render() {
      const topicsToShow = this.state.topics.filter(t => typeof t === 'object')
        return (
            <div className="surveyContainer">

                <h1>AdminTyökalu</h1>
            <div>
                <form className="adminForm">
                    <h3>Lisää uusi kompetenssi tästä</h3>
                    <label>Kompetenssi: </label>
                    <input type="text" id="ammattiRyhma" value={this.state.newProf} onChange={this.uusAmmatti}></input>

                <input type="submit" onClick={this.newProfToDB} value="Lähetä Kompetenssi"/>
                </form>
                {!this.state.message ? null : <div className="Notification">
                  <Notification message={this.state.message}/>
                  </div>}
            </div>
            <div>
                <table className="adminTable">
                   <AdminList topics={topicsToShow} changeValue={this.changeValue} click={this.click} saveChanges={this.saveChanges}
                   showQuestions={this.showQuestions} questions={this.state.questions} deleteProf={this.deleteProf}
                   editQuestions={this.editQuestions} deleteQuestion={this.deleteQuestion} selectedProf={this.state.selectedProf}/>
               </table>
               <form className="adminForm">
                   <h3>Lisää uusi kysymys {this.state.selectedProf} kompetenssiin tästä</h3>
                   <label>Kysymys: </label> <input type="text" name="text" onChange={this.inputChanged} value={this.state.text} placeholder="Tähän siis kyssäri"></input> <br></br>
                   <label>Vastausvaihtoehto 1: </label>
                   <input type="text" name="option1" onChange={this.inputChanged} value={this.state.option1} placeholder="Tähän vaihtoehto 1."></input><br></br>
                   <label>Vastausvaihtoehto 3: </label>
                   <input type="text" name="option3" onChange={this.inputChanged} value={this.state.option3} placeholder="Tähän vaihtoehto 3."></input><br></br>
                   <label>Vastausvaihtoehto 5: </label>
                   <input type="text" name="option5" onChange={this.inputChanged} value={this.state.option5} placeholder="Tähän vaihtoehto 5."></input><br></br>
                   <button type="submit" onClick={this.newQuestiontoDB}>Lähetä Kyssäri</button>
               </form>
            </div>
            </div>
        )
    }
}

export default Admin;
