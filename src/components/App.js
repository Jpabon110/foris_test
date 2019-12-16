import React, { Component } from 'react';
import '../../src/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Navbar,
  NavbarBrand,
  Card, CardBody,
} from 'reactstrap';
import img  from '../img/descarga.png'
import TableInfo from './table'

class App extends Component {
  constructor() {
    super();
    this.state = {
      studens: [],
      title: 'Porfavor selecciona un archivo .txt',
    };
  }

  findElement = (name, studens) => {
    let findIt = 0;
    if (studens.length === 0) {
      return false;
    }
    for (let index = 0; index < studens.length; index += 1) {
      const search = studens[index];
      if (search.name === name) {

        findIt += 1;
      }
      if (findIt >= 1) {
        return true;
      }
      findIt = 0;
    }
    return false;
  }

  findIndex = (name, studens) => {
    if (studens.length === 0) {
      return false;
    }
    for (let index = 0; index < studens.length; index += 1) {
      const search = studens[index];
      if (search.name === name) {
        return index;
      }
    }
    return false;
  }

  convertTime = (hhmm) => {
    const a = hhmm.split(':');
    let minutes = ((+a[0]) * 60) + (+a[1]);
    return minutes;
  }

  showFile = () => (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    let studens = [];
    const textFile = /text.*/;

    if ((file) && (file.type.match(textFile))) {
      this.setState({ title: 'Información cargada con exito' });
      reader.onload = (event) => {
        event.target.result.split('\n').map(entry => {

          const splitValidate = entry.trim().split(' ');

          if (splitValidate[0] === 'Student') {
            if (!this.findElement(splitValidate[1], studens)) {
              studens.push({
                name: splitValidate[1],
                minutes: 0,
                days: 0
              });
            }
          } else if (splitValidate[0] === 'Presence') {
            if (splitValidate[2]) {
              studens[this.findIndex(splitValidate[1], studens)]['days'] += 1;
            }
            if ((splitValidate[3]) && (splitValidate[4])) {
              studens[this.findIndex(splitValidate[1], studens)]['minutes'] += (this.convertTime(splitValidate[4]) - this.convertTime(splitValidate[3]));
            }
          }
        });
        this.setState({ studens });
      }
    } else {
      this.setState({ title: 'Porfavor el archivo debe ser en formato .txt' });
      return;
    }
    reader.readAsText(file);
  }

  compare = (a, b) => {
    let comparison = 0;
    if (b.minutes > a.minutes) {
      comparison = 1;
    } else if (b.minutes < a.minutes) {
      comparison = -1;
    }
    return comparison;
  }

  render() {
    const { studens } = this.state;
    return (
      <div className="dashboard container" style={{ padding: '0px' }}>
        <Navbar color="dark" light expand="md">
          <NavbarBrand href="/">
              <img src={img} alt="Logo" className="header__logo" />
          </NavbarBrand>
        </Navbar>
        <Card style={{ paddingBottom: '10px' }}>
          <CardBody className="card_body_flex container" style={{ padding: '5px 8%', height: '30rem' }}>
            <div style={{ height: '20%' }}>
              <div>
                <h3>{this.state.title}</h3>
                <br />
              </div>
                <input
                type="file"
                onChange={this.showFile()}
              />
              <br />
            </div>
             <TableInfo
              studens={studens}
              compare={this.compare}
             />
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default App;