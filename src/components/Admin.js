import React, { Component } from 'react';
import topicService from '../services/topics';
import axios from 'axios'
import topics from '../services/topics';
import Topic from './Topic';
import AdminList from './AdminList';
import fire from '../fire';
import { func } from 'prop-types';

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
        }
    }

async componentDidMount() {
    this.setState({topics : await topicService.getAll()});
    //console.log(topics);
    //console.log(JSON.stringify(this.state.topics)); 
}
uusAmmatti = (event) => {
    this.setState({newProf : event.target.value})
}

newProfToDB = async(event) => {
    event.preventDefault();
   var i = this.state.topics.length + 1;
   //console.log("tpoics pituus" + i)
   var topicnmbr = 'T0' + i;
   var jsondata = {
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
   this.setState({topics: await topicService.getAll()});
      //console.log(JSON.stringify(this.state.topics));
}

deleteProf = async (event) => {
    const index = event.target.id;
    var delArray = this.state.topics.filter(t => t.text !== index);
    var topicnmbr = "T0"+index;
    var tobeDEL = JSON.stringify(delArray);
    await topicService.removeTopic(tobeDEL)
    this.setState({topics: await topicService.getAll()});
}
editQuestions = async (event) => {
    this.setState({text: event.target.dataset.topic});
    var vaihtoehto = event.target.dataset.options.split(":");
    var subsubtopic = parseInt(event.target.dataset.iteration) + 1;
    if (subsubtopic < 10) {
        await this.setState({quesnmb: "SST0" + parseInt(subsubtopic) });
    }
    else {
        await this.setState({quesnmb: "SST" + parseInt(subsubtopic) });
    }
    if (vaihtoehto[1] == 0){
        this.setState({option1 : vaihtoehto[0]})
    }
    if (vaihtoehto[3] == 1){
        this.setState({option3 : vaihtoehto[2].substring(1)})
    }
    if (vaihtoehto[5] == 2){
        this.setState({option5 : vaihtoehto[4].substring(1)})
    }
    
    //alkuperänen plääni tehä tällä kerralla kaikki toi mitä tapahtuu changeValuessa,
    //ei saanu datasettiä skulaa koska ylläri ku on inputissa kiinni ni ei oikee liiku enempää dataa esim kaikista kerral
}

changeValue = (event) => {
    //console.log(event.target.dataset.bame);
    var vaihtoehto = event.target.dataset.options.split(":");
    var splitText = event.target.dataset.bame.split(":")
    var subsubtopic = parseInt(event.target.dataset.iteration) + 1;
    if (subsubtopic < 10) {
        this.setState({quesnmb: "SST0" + parseInt(subsubtopic) });
    }
    else {
        this.setState({quesnmb: "SST" + parseInt(subsubtopic) });
    }

    //console.log("Question number is: "+ this.state.quesnmb)
    this.setState({text: splitText[0]})
    if (vaihtoehto[1] == 0){
    this.setState({option1 : vaihtoehto[0]})
    }
    if (vaihtoehto[1] == 1){
        this.setState({option3 : vaihtoehto[0]})
    }
    if (vaihtoehto[1] == 2){
        this.setState({option5 : vaihtoehto[0]})
    }
}
showQuestions = async (event) => {
    var key = "";
    var quesKey = "";
    const index = event.target.id;
    var profArray = this.state.topics.filter(t => t.text == index);
    var questions = Object.values(profArray[0].ST01).map(option => option).filter(o => typeof o === 'object')
    await fire.database().ref('/topics/').orderByChild('text').equalTo(index).once('value', function(snapshot) {
        console.log("Mitä löytyy: "+ JSON.stringify(snapshot.val()));
         key =  Object.keys(snapshot.val()); //haetaan key firestä
         console.log(key);
         return key;
 
     })
 
     this.setState({topicnmb : key});
    if (questions.length === 0 ){
       var subtopicnumber = "SST01";
       this.setState({quesnmb : subtopicnumber});
    }//tää on iha infernaalinen ifelsetys... ei pysty sellittää
        else if (questions.length > 0 || questions.length < 10) {   
        
            await fire.database().ref('/topics/' + this.state.topicnmb + '/ST01/').orderByChild('text').once('value', function(snapshot) {
                console.log("Question Keys: "+ JSON.stringify(snapshot.val()));
                    quesKey = Object.keys(snapshot.val()); //haetaan key firestä
                    console.log(quesKey.length);
                    return quesKey;
            })
            if (quesKey.length === 2) {
                var i = quesKey.length - 2;
            } else {
                var i = quesKey.length - 2;
            }
            console.log(i)
            var splitSST = quesKey[i].split("T");
            var indexNumber = parseInt(splitSST[1]) + 1; 
            var subtopicnumber = "SST0" + indexNumber;
            this.setState({quesnmb : subtopicnumber});
            }
            else {
                await fire.database().ref('/topics/' + this.state.topicnmb + '/ST01/').orderByChild('text').once('value', function(snapshot) {
                    console.log("Question Keys: "+ JSON.stringify(snapshot.val()));
                        quesKey = Object.keys(snapshot.val()); //haetaan key firestä
                        console.log(quesKey);
                        return quesKey;
                })
                var i = quesKey.length - 2;
                console.log(i)
                var splitSST = quesKey[i].split("T");
                var indexNumber = parseInt(splitSST[1]) + 1; 
                var subtopicnumber = "SST" + indexNumber;
                console.log("SST"+subtopicnumber)
                this.setState({quesnmb : subtopicnumber});
            }
    if(this.state.questions.length > 0){
        this.setState({ questions: []})
    }       else {
                this.setState({ questions })
    }
    
}

inputChanged = (event) => {
    this.setState({[event.target.name]: event.target.value });
};


deleteQuestion = async (event) => {
    const url = fire.options.databaseURL;
    var quesKey = "";
    var subsubtopicIteration = event.target.dataset.iteration.split(":");
    
   await fire.database().ref('/topics/' + this.state.topicnmb + '/ST01/').orderByChild('text').equalTo(subsubtopicIteration[0]).once('value', function(snapshot) {
        console.log("Mitä löytyy: "+ JSON.stringify(snapshot.val()));
            quesKey = Object.keys(snapshot.val()); //haetaan key firestä
            return quesKey;
    })
    this.setState({quesnmb : quesKey});
    
    console.log("Lähtee topicnumerolla: " + this.state.topicnmb + " ja SST: " + this.state.quesnmb);
    axios.delete(url + '/topics/' + this.state.topicnmb+ '/ST01/' +this.state.quesnmb + '/.json');
    //this.setState({topics: await topicService.getAll()});
};


newQuestiontoDB = async (event) => {
    const url = fire.options.databaseURL
    event.preventDefault();
    var topicnmb = this.state.topicnmb;
    var quesnmb = this.state.quesnmb;
    var option1 = this.state.option1;
    var option3 = this.state.option3;
    var option5 = this.state.option5;
    var text = this.state.text;
    if (option1 === "" || option3 === "" || option5 === "" || text === ""){
        window.alert("Vastausvaihtoehto ei voi olla tyhjä!")
        return;
    }
    var tobeUpdated = {
        option1 : {"text": option1, "value": 1},
        option3 : {"text": option3, "value": 3},
        option5 : {"text": option5, "value": 5},
        text : text,
        type : "radio"
    }
    console.log("Päivittyvä kyssäri: "+topicnmb + quesnmb)
    axios.patch(url + '/topics/' + topicnmb + '/ST01/' + quesnmb + '/.json', tobeUpdated);
    this.setState({topics: await topicService.getAll()});
}

click = (event) => {
  event.preventDefault()
  console.log('item clicked, input name:', event.target.name)
}

    render() {
        return (
            <div className="surveyContainer">

                <h1>AdminTyökalu</h1>
            <div>
                <form className="adminForm">
                    <h3>Lisää uusi kompetenssi tästä</h3>
                    <label>Kompetenssi: </label>
                    <input type="text" id="ammattiRyhma" value={this.state.newProf} onChange={this.uusAmmatti}></input>

                <input type="submit" onClick={this.newProfToDB} value="Lähetä"/>
                </form>

            </div>
            <div>
                <table className="adminTable">
                   <AdminList topics={this.state.topics} changeValue={this.changeValue} click={this.click} saveChanges={this.saveChanges}
                   showQuestions={this.showQuestions} questions={this.state.questions} deleteProf={this.deleteProf}
                   editQuestions={this.editQuestions} deleteQuestion={this.deleteQuestion}/>
               </table>
               <form className="adminForm">
                   <h3>Lisää uusi kysymys valittuun kompetenssiin tästä</h3>
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
