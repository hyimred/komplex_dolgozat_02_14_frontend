import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

let message = "";
 interface State {
    Cars: Car[];
    regGyarto: string;
    regTipus: string;
    regMotor: string;
    regHengerUr: string;
    regMaxTeljesitmeny: string;
    regMaxSebesseg: string;
    regFutottVerseny: string;
    regGyozelem: string
  }
  
  interface Car {
    id: number
    gyarto: string;
    tipus: string;
    motor: string;
    hengerUr: number;
    maxTeljesitmeny: number;
    maxSebesseg: number;
    futottVerseny: number;
    gyozelem: number
  }
  
  interface CarListResponse {
    Cars: Car[];
  }
    class App extends Component<{}, State> {

      constructor(props: {}) {
        super(props);
    
        this.state = {
          regGyarto: '',
          regTipus: '',
          regMotor: '',
          regHengerUr: '',
          regMaxTeljesitmeny: '',
          regMaxSebesseg: '',
          regFutottVerseny: '',
          regGyozelem: '',
          Cars: [],
        }
      }
    
      async loadCars() {
        let response = await fetch('http://localhost:3000/car');
        let data = await response.json() as CarListResponse;
        this.setState({
          Cars: data.Cars,
        })
      }
    
      componentDidMount() {
        this.loadCars();
      }

      handleNew = async () => {

        const { regGyarto,
                regTipus,
                regMotor,
                regHengerUr,
                regMaxTeljesitmeny,
                regMaxSebesseg,
                regFutottVerseny,
                regGyozelem
              } = this.state;

        if (regTipus.trim() === '' &&
            regGyarto.trim() === '' &&
            regMotor.trim() === '' &&
            regHengerUr.trim() === '' &&
            regMaxTeljesitmeny.trim() === '' &&
            regMaxSebesseg.trim() === '' &&
            regFutottVerseny.trim() === '' &&
            regGyozelem.trim() === '' ) {
          message = 'K??telez?? megadni';
          return;
        }

        if (
          parseInt(regHengerUr) < 0 &&
          parseInt(regMaxTeljesitmeny) < 0 &&
          parseInt(regMaxSebesseg) < 0 &&
          parseInt(regFutottVerseny) < 0 &&
          parseInt(regGyozelem) < 0 ){
          message = 'Nem lehet kisebb 0-n??l';
          return;
        }
    
        const adat = {
          gyarto: regGyarto,
          tipus: regTipus,
          motor: regMotor,
          hengerUr: regHengerUr,
          maxTeljesitmeny: regMaxTeljesitmeny,
          maxSebesseg: regMaxSebesseg,
          futottVerseny: regFutottVerseny,
          gyozelem: regGyozelem
        };
    
        let response = await fetch('http://localhost:3000/car', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(adat),
        });
    
        this.setState({
          regGyarto: '',
          regTipus: '',
          regMotor: '',
          regHengerUr: '',
          regMaxTeljesitmeny: '',
          regMaxSebesseg: '',
          regFutottVerseny: '',
          regGyozelem: '',
        })
    
        await this.loadCars();
        window.location.reload();
    
      }
    
      async handleDelete(id: number) {
            let response = await fetch('http://localhost:3000/car/' + id, {
              method: 'DELETE'
            });
            await this.loadCars();
            window.location.reload();
    
      };
    
      render() {
        const { regGyarto,
                regTipus,
                regMotor,
                regHengerUr,
                regMaxTeljesitmeny,
                regMaxSebesseg,
                regFutottVerseny,
                regGyozelem } = this.state;
          return <div className="container-fluid App text-white bg-dark">
                  <h2>Versenyaut?? Adatb??zis</h2>
                  <h2>{message}</h2>
                  <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#myModal">
                    ??j felv??tele
                  </button>     
                  <table className="table table-dark table-hover">
                    <thead>
                      <tr>
                        <th>Gy??rt??</th>
                        <th>T??pus</th>
                        <th>Motor</th>
                        <th>Henger??rtartalom</th>
                        <th>Max Teljes??tm??ny</th>
                        <th>Max Sebess??g</th>
                        <th>Futott Versenyek</th>
                        <th>Gy??zelmek</th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.state.Cars.map(Cars => <tr>
                                                      <td>{Cars.gyarto}</td>
                                                      <td>{Cars.tipus}</td>
                                                      <td>{Cars.motor}</td>
                                                      <td>{Cars.hengerUr} cm</td>
                                                      <td>{Cars.maxTeljesitmeny} LE</td>
                                                      <td>{Cars.maxSebesseg} km/h</td>
                                                      <td>{Cars.futottVerseny}</td>
                                                      <td>{Cars.gyozelem}</td>
                                                      <td width={1}>
                                                        <button className='btn btn-danger btn-sm' onClick={() => this.handleDelete(Cars.id)}><FontAwesomeIcon icon={faTrash} /></button>
                                                      </td>
                                                    </tr>)}  
                      
                    </tbody>
                  </table>

                  <div className="modal" id="myModal">
                    <div className="modal-dialog">
                      <div className="modal-content bg-dark">

                        <div className="modal-header">
                          <h4 className="modal-title">??j felv??tele</h4>
                          <button type="button" className="btn-close bg-danger" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                        <form>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text">Gy??rt??ja:</span>
                            </div>
                            <input type="text" className="form-control" value={regGyarto} onChange={e => this.setState({ regGyarto: e.currentTarget.value })}></input>
                          </div>

                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text">T??pusa:</span>
                            </div>
                            <input type="text" className="form-control" value={regTipus} onChange={e => this.setState({ regTipus: e.currentTarget.value })}></input>
                          </div>

                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text">Motor:</span>
                            </div>
                            <input type="text" className="form-control" value={regMotor} onChange={e => this.setState({ regMotor: e.currentTarget.value })}></input>
                          </div>

                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text">Henger??rtartalom (cm):</span>
                            </div>
                            <input type="number" className="form-control" value={regHengerUr} onChange={e => this.setState({ regHengerUr: e.currentTarget.value })}></input>
                          </div>

                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text">Max Teljes??tm??ny (LE):</span>
                            </div>
                            <input type="number" className="form-control" value={regMaxTeljesitmeny} onChange={e => this.setState({ regMaxTeljesitmeny: e.currentTarget.value })}></input>
                          </div>

                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text">Max Sebess??g (km/h):</span>
                            </div>
                            <input type="number" className="form-control" value={regMaxSebesseg} onChange={e => this.setState({ regMaxSebesseg: e.currentTarget.value })}></input>
                          </div>

                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text">Futott Versenyek:</span>
                            </div>
                            <input type="number" className="form-control" value={regFutottVerseny} onChange={e => this.setState({ regFutottVerseny: e.currentTarget.value })}></input>
                          </div>

                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text">Gy??zelmek:</span>
                            </div>
                            <input type="number" className="form-control" value={regGyozelem} onChange={e => this.setState({ regGyozelem: e.currentTarget.value })}></input>
                          </div>

                          <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={this.handleNew}>??j</button>

                          </form>
                          
                        </div>

                      </div>
                    </div>
                  </div>

                </div>
              
        ;
      }
    }
    
  
    export default App;
