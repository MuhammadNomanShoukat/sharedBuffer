import './App.css';
import { useState } from "react";
import uitoolkit from "@zoom/videosdk-ui-toolkit";
import '@zoom/videosdk-ui-toolkit/dist/videosdk-ui-toolkit.css'

function App() {

  var sessionContainer1
  var sessionContainer2
  var joinFlow 
  var authEndpoint = 'https://zoom-video-sdk-f4fj.vercel.app/'
  var config = {
      videoSDKJWT: '',
      sessionName: 'companyCall',
      userName: 'Operator',
      sessionPasscode: '123',
      features: ['video', 'audio', 'settings', 'users', 'chat', 'share']
  };
  var role = 1

  function getVideoSDKJWT1(operator) {
    const sessoinName = operator == 1 ? "Room1" : "Room2";
    const userName = operator == 1 ? "Visitor Room 1" : "Visitor Room 2";
    const sessionContainer_ = operator == 1 ? "sessionContainer1" : "sessionContainer2";
    const joinFlow = operator == 1 ? "join-flow1" : "join-flow2";

    // console.log(sessoinName)
    // console.log(userName)
    // return

    sessionContainer1 = document.getElementById("sessionContainer1")

    document.getElementById("join-flow1").style.display = 'none'

    fetch(authEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionName:  "Room1",
        role: role,
      })
    }).then((response) => {
        return response.json()
    }).then((data) => {
      if(data.signature) {
          var config_ = {
            videoSDKJWT: '',
            sessionName: "Room1",
            userName: "Visitor Room 1",
            sessionPasscode: '123',
            features: ['video', 'audio', 'settings', 'users', 'chat', 'share']
        };
        config_.videoSDKJWT = data.signature
        joinSession1(config_)
      } else {
        console.log(data)
      }
    }).catch((error) => {
        console.log(error)
    })
  }

  function getVideoSDKJWT2(operator) {
    sessionContainer2 = document.getElementById("sessionContainer2")

    document.getElementById("join-flow2").style.display = 'none'

    fetch(authEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionName:  "Room2",
        role: role,
      })
    }).then((response) => {
        return response.json()
    }).then((data) => {
      if(data.signature) {
          var config_ = {
            videoSDKJWT: '',
            sessionName: "Room2",
            userName: "Visitor Room 2",
            sessionPasscode: '123',
            features: ['video', 'audio', 'settings', 'users', 'chat', 'share']
        };
        config_.videoSDKJWT = data.signature
        joinSession2(config_)
      } else {
        console.log(data)
      }
    }).catch((error) => {
        console.log(error)
    })
  }

  function joinSession1(config_) {
    uitoolkit.joinSession(sessionContainer1, config_)

    uitoolkit.onSessionClosed(sessionClosed1)
  }

  function joinSession2(config_) {
    uitoolkit.joinSession(sessionContainer2, config_)

    uitoolkit.onSessionClosed(sessionClosed2)
  }

  var sessionClosed1 = (() => {
    console.log('session closed')
    uitoolkit.closeSession(sessionContainer1)

    document.getElementById("join-flow1").style.display = 'block'
  })

  var sessionClosed2 = (() => {
    console.log('session closed')
    uitoolkit.closeSession(sessionContainer2)

    document.getElementById("join-flow2").style.display = 'block'
  })

  return (
    <div className="App">


      <main>
        <div id="join-flow1">
          <h1>Operator1</h1>

          <button onClick={()=>getVideoSDKJWT1(1)}>Start Operator 1 Call</button>
        </div>
        <div className='call-view'>
          <div id='sessionContainer1'></div>
        </div>
      </main>


      <main>
        <div id="join-flow2">
          <h1>Operator2</h1>
          <button onClick={()=>getVideoSDKJWT2(2)}>Start Operator 2 Call</button>
        </div>
        <div className='call-view'>
          <div id='sessionContainer2'></div>
        </div>
      </main>
    </div>
  );
}

export default App;
