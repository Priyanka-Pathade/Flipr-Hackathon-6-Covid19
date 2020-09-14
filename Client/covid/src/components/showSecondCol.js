import React, {Component} from 'react';
import { Table } from 'reactstrap';
import {Link} from 'react-router-dom'

class ShowSecondCol extends Component{

    constructor(props) {
        super(props);
        this.state = {
          items: [],
          titles:[],
          isLoaded: false,
        }
        }
    componentDidMount() {
            fetch('https://api.rootnet.in/covid19-in/notifications')
            .then(res => res.json())
            .then(dataNew => {
                this.setState({
                    isLoaded: true,
                    items:dataNew.data.notifications,
                    titles:dataNew.data.notifications.title
                })
                console.log(dataNew);
            });
        }
     renderSplitData(){
    return this.state.items.map((item) =>{
        const date11 =item.title.slice(0,10)
        const [date1, titlee] = item.title.split(/\s+(.*)/);
        // if(date1 === /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/){
        
        return(
            <tr>
                <td>{date11}</td>
                <td>{titlee}</td>
                <td><a>{item.link}</a></td>
            </tr>
        )
        // }
        // else{
            return(
                <tr>
                    <td>{date11}</td>
                    <td>{titlee}</td>
                    <td><Link>{item.link}</Link></td>
                </tr>
            )
        //}
    })
}   
 render(){
            var { isLoaded, items} =this.state;
            if(!isLoaded){
                return <div>Loading...</div>
            }
            else{
            return(
                <div>
                    <Table bordered hover size="sm" id="secondTask">
                        <thead>
                        <tr>
                        <th>Date</th>
                        <th>Notification Title</th>
                        <th>Link</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.renderSplitData()}
                        </tbody>
                    </Table>
                </div>
            );
            }
        }
    }

    export default ShowSecondCol;