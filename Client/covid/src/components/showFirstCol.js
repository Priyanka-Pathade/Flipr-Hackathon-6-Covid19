import React, {Component} from 'react';
import { Table } from 'reactstrap';

class ShowFirstCol extends Component{

    constructor(props) {
        super(props);
        this.state = {
          items: [],
          isLoaded: false,
        }
        }
    componentDidMount() {
            fetch('https://api.rootnet.in/covid19-in/contacts')
            .then(res => res.json())
            .then(dataNew => {
                this.setState({
                    isLoaded: true,
                    items:dataNew.data.contacts.regional,
                })
                console.log(dataNew);
            });
        }
renderTableData(){
    return this.state.items.map((item)=>{
        return(
            <tr>
                <td>{item.loc}</td>
                <td>{item.number}</td>
            </tr>
        )
    })
}
// renderTableHeader(){
//     return(
//         <tr>
//         <th>State Name</th>
//         <th>Helpline Number</th>
//         </tr>
//     )
// }
 render(){
            var { isLoaded, items} =this.state;
            if(!isLoaded){
                return <div>Loading...</div>
            }
            else{
            return(
                <div>
                    <Table bordered hover size="sm" id="firstTask">
                        <thead>
                        <tr>
                        <th>State Name</th>
                        <th>Helpline Number</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.renderTableData()}
                        </tbody>
                    </Table>
                </div>
            );
            }
        }
    }

    export default ShowFirstCol;