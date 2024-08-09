import React, { useState } from "react";
import './App.css';
import uitoolkit from "@zoom/videosdk-ui-toolkit";
import '@zoom/videosdk-ui-toolkit/dist/videosdk-ui-toolkit.css'

function App() {
  const [showView, setShowView] = useState({btn1: true, btn2: true})
  var sessionContainer
  
  var authEndpoint = 'https://zoom-video-sdk-f4fj.vercel.app/'

  function getVideoSDKJWT(operator) {
    if(operator === 1){
      setShowView({...showView, btn1:true, btn2:false})
    }else{
      setShowView({...showView, btn1:false, btn2:true})
    }

    const sessoinName = operator == 1 ? "Room1" : "Room2";
    const userName = operator == 1 ? "Visitor operator 1" : "Visitor operator 2";

    

    fetch(authEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionName:  sessoinName,
        role: 1,
      })
    }).then((response) => {
        return response.json()
    }).then((data) => {
      if(data.signature) {
          const config_ = {
            videoSDKJWT: '',
            sessionName: operator == 1 ? "Room1" : "Room2",
            userName: operator == 1 ? "operator 1" : "operator 2",
            sessionPasscode: '123',
            features: ['video', 'audio', 'settings', 'users', 'chat', 'share']
        };
        config_.videoSDKJWT = data.signature
        // setTimeout(()=>{
        // }, 100)
        joinSession(config_)
      } else {
        console.log(data)
      }
    }).catch((error) => {
        console.log(error)
    })
  }

  function joinSession(config_) {
    sessionContainer = document.getElementById("sessionContainer")
    document.getElementById("join-flow").style.display = 'none'
    
    uitoolkit.joinSession(sessionContainer, config_)
    uitoolkit.onSessionClosed(sessionClosed)
  }
  var sessionClosed = (() => {
    setShowView({...showView, btn1:true, btn2:true})
    console.log('session closed')
    uitoolkit.closeSession(sessionContainer)
    document.getElementById("join-flow").style.display = 'block'
  })

  return (
    <>
      <h2 className="heading">We can start a single video session at a time</h2>
      <div className="App">
      {
        showView.btn1
        ?
        <main>
          <div id="join-flow">
            <h3>Operator 1</h3>

            <button onClick={()=>getVideoSDKJWT(1)}>Start Call</button>
          </div>
          <div className='call-view'>
            
          </div>
          <div id='sessionContainer'></div>
        </main>
        :
        null
      }

      {
        showView.btn2
        ?
        <main>
          <div id="join-flow">
            <h3>Operator 2</h3>

            <button onClick={()=>getVideoSDKJWT(2)}>Start Call</button>
          </div>
          <div className='call-view'>
            
          </div>
          <div id='sessionContainer'></div>
        </main>
        :
        null
      }
      </div>
    </>
    
  );
}

export default App;
