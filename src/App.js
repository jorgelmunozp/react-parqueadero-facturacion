import logo from './logo.png';
import './App.css';

import React from 'react';

// get our fontawesome imports
import { faHome, faClock, faDollarSign, faCar, faPlay, faPause, faStop, faParking} from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { horas:0, minutos: 0, segundos: 0, hor: 0, min: 0, seg:0, hora: new Date(), horallegada: new Date(0,0), placa: '', estado: '', valorapagar:0 };
    this.campoPlaca = this.campoPlaca.bind(this);
    this.botonStart = this.botonStart.bind(this);
    this.botonStop = this.botonStop.bind(this);
    this.botonReset = this.botonReset.bind(this);
  }

  tick() {
    this.setState(state => ({
      hora: new Date(),
    }));
    if(this.state.estado === 'start'){
      if(this.state.segundos === 59){                  //Calcula los minutos de parqueo
        this.state.segundos = 0;
        this.state.minutos = this.state.minutos + 1;
      }
      if(this.state.minutos === 59){                  //Calcula las horas de parqueo
        this.state.minutos = 0;
        this.state.segundos = 0;
        this.state.horas = this.state.horas + 1;
      }
      this.setState(state => ({
        placa: this.state.placa,
        segundos: state.segundos + 1,
        hor: ("0" + state.horas).slice(-2),
        min: ("0" + state.minutos).slice(-2),
        seg: ("0" + state.segundos).slice(-2),
        valorapagar: state.horas*1800 + state.minutos*30,
        estado: this.state.estado
      }));
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1><FontAwesomeIcon icon={faParking} /> Parqueadero</h1>
        </header>
        <body>
          <div>
            <p>Hora: {this.state.hora.toLocaleTimeString()}</p>
            <h3>Facturación</h3>
            <p>Tarifa: <b>$ 1.800</b> hora</p>
            <table>
              <tr>
                <td colSpan={2}><input type="text" id="placa" onChange={this.campoPlaca} value={this.state.placa} maxlength="6" placeholder='Placa' autoComplete='off'/></td>
              </tr>
              <tr>
                <td><FontAwesomeIcon icon={faCar} /></td> 
                <td><b>{this.state.placa}</b></td>
              </tr>
              <tr>
                <td><FontAwesomeIcon icon={faHome} /></td> 
                <td> {this.state.horallegada.toLocaleTimeString()}</td>                
              </tr>
              <tr>
                <td><FontAwesomeIcon icon={faClock} /></td> 
                <td> {this.state.hor}:{this.state.min}:{this.state.seg}</td>
              </tr>
              <tr>
                <td><FontAwesomeIcon icon={faDollarSign} /></td> 
                <td> {this.state.valorapagar}</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <button type='button' value={'start'} onClick={this.botonStart}><FontAwesomeIcon icon={faPlay} /></button>
                  <button type='button' value={'stop'} onClick={this.botonStop}><FontAwesomeIcon icon={faPause} /></button>
                  <button type='button' value={'reset'} onClick={this.botonReset}><FontAwesomeIcon icon={faStop} /></button>
                </td>
              </tr>
            </table>
          </div>
        </body>
      </div>
    );
  }
  campoPlaca(e) {
    e.preventDefault();
    this.setState({ placa: e.target.value });
  }

  botonStart(e){
    e.preventDefault();
    this.state.estado = 'start';
    if(this.state.segundos === 0){
      this.state.horallegada = new Date();
    }
    this.setState({ estado: e.target.value });
  }
  
  botonStop(e) {
    e.preventDefault();
    this.state.estado = 'stop';
    this.setState(state => ({estado: e.target.value}));
  }

  botonReset(e){
    e.preventDefault();
    this.state.estado = 'reset';
    this.state.placa = "";
    this.state.horallegada = new Date(0,0);
    this.state.horas = 0;
    this.state.minutos = 0;
    this.state.segundos = 0;
    this.state.hor = ("0" + 0).slice(-2);
    this.state.min = ("0" + 0).slice(-2);
    this.state.seg = ("0" + 0).slice(-2);
    this.state.valorapagar = 0;
    this.setState({ estado: e.target.value });
  }
}


export default App;
