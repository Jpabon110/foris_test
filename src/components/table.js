import React, { Component, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Table,
} from 'reactstrap';

class TableInfo extends Component {


  render() {
    const { studens, compare } = this.props;
    
    return (
        <Table striped bordered hover data-testid="table">
            {
                ((studens) && (studens.length > 0)) && (
                    <Fragment>
                        <thead>
                            <tr>
                                <th>Nombre estudiante</th>
                                <th>Minutos</th>
                                <th>Dias</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                        studens
                            .sort((a, b) => compare(a, b))
                            .map((studen, index) => (
                            <Fragment key ={index}>
                                    <tr>
                                        <td>{studen.name}</td>
                                        <td>{studen.minutes}</td>
                                        <td>{studen.days}</td>
                                    </tr>
                            </Fragment>
                            ))
                        }
                        </tbody>
                    </Fragment>
                )
            }
        </Table>
    );
  }
}
export default TableInfo;
