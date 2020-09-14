import React, {Component,useEffect,useState} from 'react';
import { Table } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText,Col } from 'reactstrap';

const ShoeThirdB =()=> {

        const [noitem,setNoitem]=useState(false)
        const [items,setItems]=useState([])
        const [isLoaded,setIsLoaded]=useState(false)
        const [allstate,setAallstate]=useState([])
        const [type,setType]=useState([])
        const [state1,setState1]=useState([])
        const [State,setState]=useState([])
        const [statename,setStatename]=useState('')
        const [typename,setTypename]=useState('')

       const  alterState=(val)=>{
            var data=[]
            allstate.map(item=>{
                if (item.state==val){
                    data.push(item)
                }
            })  
            if(data.length==0){
                setState(allstate)
            }
            else{
                setItems(data)
            }
            }

       const   alterType=(val)=> {
                var data=[]
                var other=['Govt','Society']
                if((val=="Govt")||(val=="Govt.")){
                    allstate.map(item=>{
                        if ((item.ownership=="Govt")||(item.ownership=="Govt.")){
                            data.push(item)
                        }
                    })  
                }
                if(val=="Society"){
                    allstate.map(item=>{
                        if ((item.ownership=="Society")||(item.ownership=="society")){
                            data.push(item)
                        }
                    })  
                }
                if(!(other.includes(val))){
                    allstate.map(item=>{
                        if (item.ownership==val){
                            data.push(item)
                        }
                    })  
                }
                if(data.length==0){
                    setItems(allstate)
                }
                else{
                    setItems(data)
                }
                
                }
    
    
    useEffect(()=> {
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

                setIsLoaded(true)
                setAallstate(dataNew.data.medicalColleges)
                setItems(dataNew.data.medicalColleges)
                setState1(AllState)
                setType(Types)
                setNoitem(true)
            });

        },[])
        

       useEffect(()=>{
       if((!statename)&&(typename)){
           alterType(typename)
       }
       else if((statename)&&(!typename)){
       var dat= alterState(statename)
      }
        else if((statename)&&(typename)){
            var data=[]
            allstate.map(item=>{
                if (item.state==statename ){
                    if(typename=='Govt'){
                        if(item.ownership=="Govt"||item.ownership=="Govt."){

                            data.push(item)
                            }
                        }
                    else if(typename=="Society"){
                            if ((item.ownership=="Society")||(item.ownership=="society")){
                                data.push(item)
                            }
                    }
                    else{
                        data.push(item)
                    }
    
                }
            })  
            // if(data.length==0){
            //     setState(allstate)
            // }
            // else{
                setItems(data)
            // }            


        }



       },[statename,typename])
        
     const  renderTableData=()=>{
           
            return items.map((item) =>{
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
                    setStatename(e.target.value)
                    //    alterState(e.target.value)
                    }}
                    >
                        <option>India</option>
                        {
                           state1.map(item=>{
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
                    <Input type="select" name="select" id="exampleSelect" placeholder="Select Type" 
                    onChange={(e)=>{
                        setTypename(e.target.value)
                        // alterType(e.target.value)
                    }}
                    >
                        <option>None</option>
                        {
                            type.map(item=>{
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
                                    
                                    {renderTableData()}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
                </div>
            );
            }
    }

    export default ShoeThirdB;