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
    timer: 1200,
    audio: new Audio('./sounds/bell.wav'),
  }

  changeAppStatusWork = () => {
    this.setState({ appStatus: 'work' });
    this.setState({ timer: 1200 });
  }

  changeAppStatusRest = () => {
    this.setState({ appStatus: 'rest' });
    this.setState({ timer: 20 });
  }

  changeAppStatusOff = () => {
    this.setState({ appStatus: 'off' });
  }

  playAudio = () => {
    this.state.audio.play();
  };

  changeTimerStatus = substraction => {
    const actualMinutes = this.state.timer - substraction;

    this.setState({ timer: actualMinutes });

    if (actualMinutes <= 0 && this.state.appStatus === 'work') {
      this.changeAppStatusRest();
      this.playAudio();
    } else if (actualMinutes <= 0 && this.state.appStatus === 'rest') {
      this.changeAppStatusWork();
      this.playAudio();
    }
  }

  timeFormat = (timer) => (
  `${Math.floor(timer/60) < 10 ? '0' + Math.floor(timer/60) : Math.floor(timer/60)}
  :
  ${timer%60 < 10 ? '0' + timer%60 : timer%60 === 60 ? '00' : timer%60}`
  );

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

        {this.state.appStatus !== 'off' ? <div className="timer">{this.timeFormat(this.state.timer)}</div> : null}
        
        {this.state.appStatus === 'off' ? <button className="btn" onClick={() => this.changeAppStatusWork()}>Start</button> : null}
        {this.state.appStatus !== 'off' ? <button className="btn" onClick={() => this.changeAppStatusOff()}>Stop</button> : null}
        <button className="btn btn-close" onClick={() => window.close()}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
