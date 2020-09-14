import React, {Component} from 'react';
import { Table } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText,Col } from 'reactstrap';

class ShoeThirdB extends Component{

    constructor(props) {
        super(props);
        this.state = {
          noitem:false,
          items: [],
          isLoaded: false,
          allstate:[],
          type:[],
        //  States:['A & N Islands','Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chandigarh','Chhattisgarh','Dadra and Nagar Haveli and Daman and Diu','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh','Jammu and Kashmir','Jharkhand','Karnataka','Kerala','Ladakh','Lakshadweep','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Puducherry','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal']

        }
        }
         alterState(val) {
            var data=[]
            this.state.allstate.map(item=>{
                if (item.state==val){
                    data.push(item)
                }
            })  
            if(data.length==0){
                this.setState({
                    items:this.state.allstate
                })
            }
            else{
                this.setState({
                    items:data
                })
            }
            
            }

            alterType(val) {
                var data=[]
                var other=['Govt','Society']
                if((val=="Govt")||(val=="Govt.")){
                    this.state.allstate.map(item=>{
                        if ((item.ownership=="Govt")||(item.ownership=="Govt.")){
                            data.push(item)
                        }
                    })  
                }
                if(val=="Society"){
                    this.state.allstate.map(item=>{
                        if ((item.ownership=="Society")||(item.ownership=="society")){
                            data.push(item)
                        }
                    })  
                }
                if(!(other.includes(val))){
                    this.state.allstate.map(item=>{
                        if (item.ownership==val){
                            data.push(item)
                        }
                    })  
                }
                if(data.length==0){
                    this.setState({
                        items:this.state.allstate
                    })
                }
                else{
                    this.setState({
                        items:data
                    })
                }
                
                }
    
    
    componentDidMount() {
        var Types=[]
        var AllState=[]
            fetch('https://api.rootnet.in/covid19-in/hospitals/medical-colleges')
            .then(res => res.json())
            .then(dataNew => {
                dataNew.data.medicalColleges.map(item=>{
                    if(!(Types.includes(item.ownership))){
                        Types.push(item.ownership)
                    }
                    if(!(AllState.includes(item.state))){
                        AllState.push(item.state)
                    }

                })
                var a=Types.indexOf('Govt.')
                Types.splice(a, 1);
                a=Types.indexOf('society')
                Types.splice(a,1)

            this.setState({
                isLoaded: true,
                allstate:dataNew.data.medicalColleges,
                items:dataNew.data.medicalColleges,
                state1:AllState,
                type:Types,
                noitem:true
            })
            });
        }
        
        renderTableData(){
           
            return this.state.items.map((item) =>{
                return(
                    <tr>
                        <td>{item.state}</td>
                        <td>{item.name}</td>
                        <td>{item.city}</td>
                        <td>{item.ownership}</td>
                        <td>{item.admissionCapacity}</td>
                        <td>{item.hospitalBeds}</td>
                    </tr>
                )
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
             <FormGroup row>
                <Col sm={{size:4, offset:1}} style={{justifyContent: "center",textAlign: "center"}}>
                    <Label for="exampleSelect" >Select State</Label>
                    <Input type="select" name="select" id="exampleSelect" placeholder="Select State" defaultValue="India"
                    onChange={(e)=>{
                        this.alterState(e.target.value)
                    }}
                    >
                        <option>India</option>
                        {
                            this.state.state1.map(item=>{
                                return(
                                <option  value={item} key={item} 
                            >
                                    {item}
                                    </option>
                                    )
                            })

                        }
                   
                    </Input>
                </Col> 
                <Col sm={{size:4}} style={{justifyContent: "center",textAlign: "center"}}>
                    <Label for="exampleSelect" >Select State</Label>
                    <Input type="select" name="select" id="exampleSelect" placeholder="Select State" 
                    onChange={(e)=>{
                        this.alterType(e.target.value)
                    }}
                    >
                        <option>None</option>
                        {
                            this.state.type.map(item=>{
                                return(
                                <option  value={item} key={item} 
                            >
                                    {item}
                                    </option>
                                    )
                            })

                        }
                   
                    </Input>
                </Col> 

            </FormGroup>    
          
                      
  <div className="container" >
                        <div className="row">
                            
                    <div className="col-12 col-md-5 m-1">
                            <Table bordered hover size="sm" id="thirdTask">
                                <thead>
                                <tr>
                                <th>State Name</th>
                                <th>Institute name</th>
                                <th>City</th>
                                <th>Type</th>
                                <th>Admission Capacity</th>
                                <th>Hospital Beds</th>
                                </tr>
                                </thead>
                                <tbody>
                                    
                                    {this.renderTableData()}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
                </div>
            );
            }
        }
    }

    export default ShoeThirdB;