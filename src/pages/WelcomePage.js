import React, { Component } from 'react';
import palkki from '../img/PNG/palkki.png'

class WelcomePage extends Component {

    render() {
        return (
            <div className="surveyContainer">

                <h1>ASIANTUNTIJAN KOMPETENSSITYÖKALU</h1>

                <div className="welcomePageText">
                    <h3>TERVETULOA KARTOITTAMAAN OMAA OSAAMISTASI JA TUNNISTAMAAN KEHITTYMISTARPEITASI. </h3><br /><br />
                    <div>  <p>
                        Tällä työkalulla voit testata, miten yleiset kompetenssisi ja asiantuntijan osaamisesi asettuvat
                            suhteessa tämän päivän tradenomien osaamisvaatimuksiin.<br /><br />

                        Kyselymuotoisessa työkalussa on kaksi osiota: <br /><br /></p></div>
                    <div className="welcomePageTextDiv">
                        <div><img src={palkki} alt="palkkI" height="120%" width="80%" /></div>
                        <div><p>
                            <b>A. YLEISET KOMPETENSSIT</b>, ja<br />
                            <b>B. ASIANTUNTIJAN OSAAMINEN</b>, joista voit valita yhden tai useamman.<br />
                        </p></div>
                    </div>
                    <br></br><p>Kompetenssityökalu on toteutettu osana Taidot Työhön –hanketta, jota on rahoittanut Strategisen tutkimuksen neuvosto vuosina 2016-2019. Haaga-Helia ammattikorkeakoulu ylläpitää työkalua ja siihen liittyviä nettisivuja.</p>
                </div>

                <button className="buttonBegin" onClick={(e) => this.props.moveForward(e, 1)}>Aloita kysely</button>

            </div>
        )
    }
}

export default WelcomePage;
