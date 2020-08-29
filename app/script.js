import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  state ={
    appStatus: 'off',
    timer: 20,
  }

  changeAppStatusWork = () => {
    this.setState({ appStatus: 'work' });
  }

  changeAppStatusRest = () => {
    this.setState({ appStatus: 'rest' });
  }

  changeAppStatusOff = () => {
    this.setState({ appStatus: 'off' });
  }

  render() {

    setInterval(() => {
      console.log('test');
    }, 1000);
    
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

        {this.state.appStatus !== 'off' ? <div className="timer">18:23</div> : null}
        
        {this.state.appStatus === 'off' ? <button className="btn" onClick={() => this.changeAppStatusWork()}>Start</button> : null}
        {this.state.appStatus !== 'off' ? <button className="btn" onClick={() => this.changeAppStatusOff()}>Stop</button> : null}
        <button className="btn btn-close">X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
