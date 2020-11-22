import React, { Fragment } from 'react';
import { StartScene } from './scenes/start';
import { BattleScene } from './scenes/battle';
import MusicPlayer from './musicPlayer';

const Scenes = {
  START: "start",
  BATTLE: "battle"
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lobbyId: "",
      scene: Scenes.START,
      host: false,
      partyName: "",
    }

    MusicPlayer.load().then(() => {
      MusicPlayer.playMusicTitle();
    });
  }

  onStart(lobby, partyName) {
    this.setState({ partyName: partyName, lobbyId: lobby.id, scene: Scenes.BATTLE, host: true });
  }

  onJoin(lobby, partyName) {
    this.setState({ partyName: partyName, lobbyId: lobby.id, scene: Scenes.BATTLE });
  }

  render() {
    return (
      <Fragment>
        {this.state.scene === Scenes.START ?
          <StartScene client={this.props.client} onStart={this.onStart.bind(this)} onJoin={this.onJoin.bind(this)} />
          : null
        }
        {this.state.scene === Scenes.BATTLE ? 
          <BattleScene party={this.state.partyName} host={this.state.host} client={this.props.client} lobbyId={this.state.lobbyId} />
          : null
        }
      </Fragment>
    );
  }
}