import React, { useState, useEffect } from "react";
import './App.css';
import { useParams } from "react-router-dom"
import uitoolkit from "@zoom/videosdk-ui-toolkit";
import '@zoom/videosdk-ui-toolkit/dist/videosdk-ui-toolkit.css'



var sessionContainer
var authEndpoint = 'https://zoom-video-sdk-f4fj.vercel.app/'

const JoinCall = () => {
    const { session, role, sessionKey, userId } = useParams();
    // console.log(session)

    useEffect(()=>{
        getVideoSDKJWT(session, role, sessionKey, userId)
    }, [])

    function getVideoSDKJWT(session, role, sessionKey, userId) {
        
        const sessoinName = session;
        const userName = "Visitor_" + userId;

        fetch(authEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                sessionName: sessoinName,
                role: role,
            })
        }).then((response) => {
            return response.json()
        }).then((data) => {
            if (data.signature) {
                const config_ = {
                    videoSDKJWT: '',
                    sessionName: sessoinName,
                    userName: userName,
                    sessionPasscode: sessionKey,
                    features: ['video', 'audio', 'settings', 'users', 'chat', 'share']
                };
                config_.videoSDKJWT = data.signature
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
        uitoolkit.joinSession(sessionContainer, config_)
        uitoolkit.onSessionClosed(sessionClosed)
    }
    var sessionClosed = (() => {
        uitoolkit.closeSession(sessionContainer)
    })



    return (
        <div className="join-class-block">
            <h2 className="heading">Session started</h2>
            <div id='sessionContainer'></div>
        </div>

    );
}

export default JoinCall;
