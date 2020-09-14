import React, {Component} from 'react';
import { Table, ListGroup,ListGroupItem } from 'reactstrap';
import {Card, CardImg, CardBody, CardText, CardTitle, CardSubtitle} from 'reactstrap';

class ShowThirdCol extends Component{

    constructor(props) {
        super(props);
        this.state = {
          items: [],
          summary: null,
          isLoaded: false,
        }
        }
    componentDidMount() {
            fetch('https://api.rootnet.in/covid19-in/hospitals/beds')
            .then(res => res.json())
            .then(dataNew => {
                this.setState({
                    isLoaded: true,
                    items:dataNew.data,
                    summary:dataNew.data.summary
                })
                console.log(dataNew);
            });
        }    
        renderTableData(){
            return this.state.items.regional.map((item) => {
                return(
                    <tr>
                        <td>{item.state}</td>
                        <td>{item.ruralHospitals}</td>
                        <td>{item.ruralBeds}</td>
                        <td>{item.urbanHospitals}</td>
                        <td>{item.urbanBeds}</td>
                        <td>{item.totalHospitals}</td>
                        <td>{item.totalBeds}</td>
                    </tr>
                )
            })
        }
        renderSummaryData(){
                return(
                    <div id="mydiv">
                            <ListGroupItem><b>Rural Hospitals: </b>{this.state.summary['ruralHospitals']}</ListGroupItem>
                            <ListGroupItem><b>Rural Beds: </b>{this.state.summary['ruralBeds']}</ListGroupItem>
                            <ListGroupItem><b>Urban Hospitals: </b>{this.state.summary['urbanHospitals']}</ListGroupItem>
                            <ListGroupItem><b>Urban Beds: </b>{this.state.summary['urbanBeds']}</ListGroupItem>
                            <ListGroupItem><b>Total Hospitals: </b>{this.state.summary['totalHospitals']}</ListGroupItem>
                            <ListGroupItem><b>Total Beds: </b>{this.state.summary['totalBeds']}</ListGroupItem>

                    </div>
                )

        }
 render(){
            var { isLoaded, items} =this.state;
            if(!isLoaded){
                return <div>Loading...</div>
            }
            else{
            return(
                <div>
                    <Table bordered hover size="sm" id="thirdTask">
                        <thead>
                            <tr>
                                <th>State Name</th>
                                <th>Rural Hospitals</th>
                                <th>Rural Beds</th>
                                <th>Urban Hospitals</th>
                                <th>Urban Beds</th>
                                <th>Total Hospitals</th>
                                <th>Total beds(State Wise)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTableData()}
                        </tbody>
                    </Table>
                    <div>
                    <Card className="mycard" style={{ width: '15rem'}} id="cardSummary">
                        <CardTitle><b>Total Summary of India</b></CardTitle>
                        <ListGroup variant="flush" id="listg">
                            {this.renderSummaryData()}
                        </ListGroup>
                    </Card>
                    </div>
                </div>
            );
            }
        }
    }

    export default ShowThirdCol;