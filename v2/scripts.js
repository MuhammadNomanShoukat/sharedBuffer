import uitoolkit from './@zoom/videosdk-ui-toolkit/index.js'

var sessionContainer = document.getElementById('sessionContainer')
var authEndpoint = 'https://zoom-video-sdk-f4fj.vercel.app/'

var role = 0

window.getVideoSDKJWT = getVideoSDKJWT

function getVideoSDKJWT(operator) {
    var config = {
        videoSDKJWT: '',
        sessionName: operator == 1 ? "Room1" : "Room2",
        userName: "Visitor 2",
        sessionPasscode: '123',
        features: ['video', 'audio', 'settings', 'users', 'chat', 'share']
    };
    const sessoinName = operator == 1 ? "Room1" : "Room2"
    const userName = "Visitor 2";
    console.log(sessoinName)
    console.log(userName)
    document.getElementById('join-flow').style.display = 'none'

    fetch(authEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            sessionName:  sessoinName,
            role: role,
        })
    }).then((response) => {
        return response.json()
    }).then((data) => {
        if(data.signature) {
            console.log(data.signature)
            config.videoSDKJWT = data.signature

            joinSession(config)
        } else {
            console.log(data)
        }
    }).catch((error) => {
        console.log(error)
    })
}

function joinSession(config) {
    // console.log(config)
    // return;
    uitoolkit.joinSession(sessionContainer, config)

    uitoolkit.onSessionClosed(sessionClosed)
}

var sessionClosed = (() => {
    console.log('session closed')
    uitoolkit.closeSession(sessionContainer)

    document.getElementById('join-flow').style.display = 'block'
})
