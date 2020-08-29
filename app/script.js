import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  constructor() {
    super();
    
    setInterval(() => {
      if(this.state.appStatus !== 'off') this.changeTimerStatus(1);
    }, 1000);
  }

  state ={
    appStatus: 'off',
    minutes: 1200,
    seconds: 60,
    audio: new Audio('./sounds/bell.wav'),
  }

  changeAppStatusWork = () => {
    this.setState({ appStatus: 'work' });
    this.setState({ minutes: 1200, seconds: 60 });
  }

  changeAppStatusRest = () => {
    this.setState({ appStatus: 'rest' });
    this.setState({ minutes: 20, seconds: 20 });
  }

  changeAppStatusOff = () => {
    this.setState({ appStatus: 'off' });
  }

  playAudio = () => {
    this.state.audio.play();
  };

  changeTimerStatus = substraction => {
    const actualMinutes = this.state.minutes - substraction;
    const actualSeconds = this.state.seconds - substraction;

    this.setState({ minutes: actualMinutes });

    if (actualMinutes <= 0 && actualSeconds <= 0 && this.state.appStatus === 'work') {
      this.changeAppStatusRest();
      this.playAudio();
    } else if (actualMinutes <= 0 && actualSeconds <= 0 && this.state.appStatus === 'rest') {
      this.changeAppStatusWork();
      this.playAudio();
    } else if(actualSeconds <= 0) {
      this.setState({ seconds: 60 });
    } else {
      this.setState({ seconds: actualSeconds });
    }
  }

  timeFormat = (minutes, seconds) => `${Math.floor(minutes/60) < 10 ? '0' + Math.floor(minutes/60) : Math.floor(minutes/60)}:${seconds < 10 ? '0' + seconds : seconds === 60 ? '00' : seconds}`;

  render() {

    return (
      <div>
        <h1>Protect your eyes</h1>
        {this.state.appStatus === 'off'
        ?
          <div>
            <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
            <p>This app will help you track your time and inform you when it's time to rest.</p>
          </div>
        :
          null
        }
        {this.state.appStatus === 'work' ? <img src="./images/work.png" /> : null}
        {this.state.appStatus === 'rest' ? <img src="./images/rest.png" /> : null}

        {this.state.appStatus !== 'off' ? <div className="timer">{this.timeFormat(this.state.minutes, this.state.seconds)}</div> : null}
        
        {this.state.appStatus === 'off' ? <button className="btn" onClick={() => this.changeAppStatusWork()}>Start</button> : null}
        {this.state.appStatus !== 'off' ? <button className="btn" onClick={() => this.changeAppStatusOff()}>Stop</button> : null}
        <button className="btn btn-close" onClick={() => window.close()}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
