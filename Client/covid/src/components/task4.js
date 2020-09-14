import React,{useState,useEffect} from 'react'
import {Line} from 'react-chartjs-2'
import { Button, Form, FormGroup, Label, Input, FormText,Col, Row } from 'reactstrap';
function Chart() {

    const [totalSamplesTested,settotalSamplesTested]=useState([]);
    const [date,setDate]=useState([]);
    const [alldata,setAlldata]=useState([]);
    const [confirmed,setConfirmed]=useState([]);
    const [confirmed1,setConfirmed1]=useState([]);
    const [confirmed2,setConfirmed2]=useState([]);
    const [confirmed3,setConfirmed3]=useState([]);
    var statename='';
    var gendername='';

    const [age,setAge]=useState();
    const [sdate,setSdate]=useState();
    const [edate,setEdate]=useState();

    var filterdata=[]

    var States=['Andaman and Nicobar Islands','	Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chandigarh','Chhattisgarh','Dadra and Nagar Haveli and Daman and Diu','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh','Jammu and Kashmir','Jharkhand','Karnataka','Kerala','Ladakh','Lakshadweep','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Puducherry','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal']
    
    var gender=['None','male','female'];

    var agegrp=['None','0-9','10-19','20-29','30-39','40-49','50-59','60-69','70+']

    
        
    useEffect(()=>{
        var deceasedDate=[]
        var count=[]

         fetch('http://localhost:3001/data',{
             method:"get",
         }).then(res=>res.json())
         .then(result=>{
             setAlldata(result)
             result.map(item=>{
            if(deceasedDate.includes(item.reportedOn)){
                 if(item.status=="Deceased")
                {
                var a = deceasedDate.indexOf(item.reportedOn)
                var val=count[a]
                val+=1
                count[a]=val
                }
             }
             else{
                 deceasedDate.push(item.reportedOn)
                 if(item.status=="Deceased")
                {
                    var a = deceasedDate.indexOf(item.reportedOn)
                    count[a]=1
                }
                else{
                    var a = deceasedDate.indexOf(item.reportedOn)
                    count[a]=0
                }
                }
                 
             })
             var n=deceasedDate.length;
             var count1=new Array(n).fill(0);
             var count2=new Array(n).fill(0);

             result.map(item=>{
                if(deceasedDate.includes(item.reportedOn)){
                    if(item.status=="Recovered")
                   {
                   var a = deceasedDate.indexOf(item.reportedOn)
                   var val=count1[a]
                   val+=1
                   count1[a]=val
                   
                   }
                }
                })

                result.map(item=>{
                    if(deceasedDate.includes(item.reportedOn)){
                        if(item.status=="Hospitalized")
                       {
                       var a = deceasedDate.indexOf(item.reportedOn)
                       var val=count2[a]
                       val+=1
                       count2[a]=val
                       
                       }
                    }
                    })
    
             setDate(deceasedDate);
             setConfirmed(count);
             setConfirmed1(count1);
             setConfirmed2(count2);
         })
     },[])  
    

     const alterState=(val)=>{

        var n=alldata.length;
        var confirm=new Array(n).fill(0);
        var confirm1=new Array(n).fill(0);
        var confirm2=new Array(n).fill(0);

        var gen=[];

        alldata.map(item=>{
            if(item.state==val){
                if(item.status=="Deceased"){
                               var a=date.indexOf(item.reportedOn)
                               var c=confirm[a]
                               confirm[a]=c+1
                               gen.push(item)
                           }
                           if(item.status=="Recovered"){
                            var a=date.indexOf(item.reportedOn)
                            var c=confirm1[a]
                            confirm1[a]=c+1
                            // gen.push(item)
                        }   
                        if(item.status=="Hospitalized"){
                            var a=date.indexOf(item.reportedOn)
                            var c=confirm2[a]
                            confirm2[a]=c+1
                            // gen.push(item)
                        }                    
                    }
           })
           setConfirmed(confirm);
           setConfirmed1(confirm1);
           setConfirmed2(confirm2);
        }
    

        


        
    const alterGender1=(val)=>{
        var n=date.length;
        var confirm=new Array(n).fill(0);
        var confirm1=new Array(n).fill(0);
        var confirm2=new Array(n).fill(0);

        alldata.map(item=>{
            if((item.gender==val)&&(item.status=="Deceased")){
                                    var a=date.indexOf(item.reportedOn)
                                    var c=confirm[a]
                                    confirm[a]=c+1
            }
            if((item.gender==val)&&(item.status=="Recovered")){
                var a=date.indexOf(item.reportedOn)
                var c=confirm1[a]
                confirm1[a]=c+1
                // gen.push(item)
            }   
            if((item.gender==val)&&(item.status=="Hospitalized")){
                var a=date.indexOf(item.reportedOn)
                var c=confirm2[a]
                confirm2[a]=c+1
                // gen.push(item)
            }                    
        })
            setConfirmed(confirm);
            setConfirmed1(confirm1);
            setConfirmed2(confirm2);
 
    }

    useEffect(()=>{
        var e;
        var s;

       if(!edate){
        e='26/04/2020'
       }
       if(edate){
           e=edate
       }
       if(!sdate){
        s='30/01/2020'
       }
       if(sdate){
           s=sdate
       }
       var n=date.length;
       var confirm=new Array(n).fill(0);
       var confirm1=new Array(n).fill(0);
       var confirm2=new Array(n).fill(0);
       alldata.map(item=>{

        if(item.status=="Deceased"){
        if((item.reportedOn>=s)&&(item.reportedOn< e)){
                                var a=date.indexOf(item.reportedOn)
                                var c=confirm[a]
                                confirm[a]=c+1
                                console.log(item);
                }
            }
            if(item.status=="Recovered"){
                if((item.reportedOn>=s)&&(item.reportedOn< e)){
                                        var a=date.indexOf(item.reportedOn)
                                        var c=confirm1[a]
                                        confirm1[a]=c+1
                }
            }
            if(item.status=="Hospitalized"){
                if((item.reportedOn>=s)&&(item.reportedOn< e)){
                                        var a=date.indexOf(item.reportedOn)
                                        var c=confirm2[a]
                                        confirm2[a]=c+1
                }
            }
        
        })

        setConfirmed(confirm);
        setConfirmed1(confirm1);
        setConfirmed2(confirm2);


    },[sdate,edate])



    const submitDate=()=>{
        

        console.log("Form Submitted");
    }



    const alterAge=(val)=>{
        var a1,a2;
        a1=val.split("-")
        a2=a1[1]
        a1=a1[0]
        if(!a2){
            a1=val.split("+")
            a1=a1[0]
        }
       
        var n=date.length;
        var confirm=new Array(n).fill(0);
        var confirm1=new Array(n).fill(0);
        var confirm2=new Array(n).fill(0);

        alldata.map(item=>{
            if(item.status=="Deceased"){
            if((item.ageEstimate <a2)&&(item.ageEstimate>a1)&&(item.ageEstimate!='')&&(item.state="Deceased")){
                                    var a=date.indexOf(item.reportedOn)
                                    var c=confirm[a]
                                    confirm[a]=c+1
            }
         }
         if(item.status=="Recovered"){
            if((item.ageEstimate <a2)&&(item.ageEstimate>a1)&&(item.ageEstimate!='')&&(item.state="Deceased")){
                                    var a=date.indexOf(item.reportedOn)
                                    var c=confirm1[a]
                                    confirm1[a]=c+1
            }
         }
         if(item.status=="Hospitalized"){
            if((item.ageEstimate <a2)&&(item.ageEstimate>a1)&&(item.ageEstimate!='')&&(item.state="Deceased")){
                                    var a=date.indexOf(item.reportedOn)
                                    var c=confirm2[a]
                                    confirm2[a]=c+1
            }
         }

         })
         if(!a2){
            alldata.map(item=>{
                if(item.status=="Deceased"){
                if((item.ageEstimate>=70)&&(item.ageEstimate!='')){
                                        var a=date.indexOf(item.reportedOn)
                                        var c=confirm[a]
                                        confirm[a]=c+1
                }
            }
            if(item.status=="Recovered"){
                if((item.ageEstimate>=70)&&(item.ageEstimate!='')){
                                        var a=date.indexOf(item.reportedOn)
                                        var c=confirm1[a]
                                        confirm1[a]=c+1
                }
            }
            if(item.status=="Hospitalized"){
                if((item.ageEstimate>=70)&&(item.ageEstimate!='')){
                                        var a=date.indexOf(item.reportedOn)
                                        var c=confirm2[a]
                                        confirm2[a]=c+1
                }
            }
            })
       }
            setConfirmed(confirm);
            setConfirmed1(confirm1);
            setConfirmed2(confirm2);
    }




    

    const data={
        // x-axis
        labels:date,
        datasets:[
           
            {
                label:'Total Deceased Cases',
                data:confirmed,
                borderColor:['rgba(255,0,0,0.2)'],
                backgroundColor:['rgba(255,0,0,0.2)'],
                pointBackgroundColor:'rgba(54,162,235,0.2)',
                pointBorderColor:'rgba(54,162,235,0.2)'
            }
        ]
    }
    const data2={
        // x-axis
        labels:date,
        datasets:[
           
            {
                label:'Total Recovered Cases',
                data:confirmed1,
                borderColor:['rgba(0,255,0,0.2)'],
                backgroundColor:['rgba(0,255,0,0.2)'],
                pointBackgroundColor:'rgba(54,162,235,0.2)',
                pointBorderColor:'rgba(54,162,235,0.2)'
            }
        ]
    }
    const data3={
        // x-axis
        labels:date,
        datasets:[
           
            {
                label:'Total Hospitialized Cases',
                data:confirmed2,
                borderColor:['rgba(0,0,255,0.2)'],
                backgroundColor:['rgba(0,0,255,0.2)'],
                pointBackgroundColor:'rgba(54,162,235,0.2)',
                pointBorderColor:'rgba(54,162,235,0.2)'
            }
        ]
    }


    const options={
        title:{
            display:true,
            text:'Line Chart',

        },
        responsive:true,
        scales:{
            XAxes:[
                {
                    ticks:{
                        min:"2020-03-12",
                        max:"2020-09-12",
                        stepSize:1
                    }
                }
            ],
            yAxes:[
                {
                    ticks:{
                        beginAtZero: true,
                        stepSize:1
                        
                    }
                }
            ]
        }
    }




    

    return (
        <div>
            <div>
                <Form style={{ml:"20px"}}>

                <FormGroup row>
                <Col sm={{ size: 3,  offset: 1 }} style={{justifyContent: "center",textAlign: "center"}}>
                    <Label for="exampleSelect" >Select State</Label>
                    <Input type="select" name="select" id="exampleSelect" placeholder="Select State" 
                    onChange={(e)=>{
                        // statename=e.target.value
                        alterState(e.target.value)
                    }}
                    >
                        <option>India</option>
                        {
                            States.map(item=>{
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
               
                <Col sm={3} style={{justifyContent: "center",textAlign: "center"}} >
                <Label for="exampleSelect" >Select Gender</Label>
                    <Input type="select" name="select" id="exampleSelect" placeholder="Select Gender"
                    
                    onChange={(e)=>{
                        // gendername=e.target.value
                        alterGender1(e.target.value)}}
                    >
                        {
                            gender.map(item=>{
                                return(
                                <option key={item} value={item}>{item}</option>
                                )
                             })
                        }

                    </Input>   
                 </Col> 

                <Col sm={3} style={{justifyContent: "center",textAlign: "center"}}>
                <Label for="exampleSelect" >Select Age-Group</Label>
                    <Input type="select" name="select" id="exampleSelect" placeholder="Select Age-Group" onChange={(e)=>alterAge(e.target.value)}>
                    {
                            agegrp.map(item=>{
                                return(
                                <option key={item} value={item}>{item}</option>
                                )
                             })
                        }
                    </Input> 
                </Col> 
                

                </FormGroup>
                </Form>
            </div>
            
            <Line data={data} options={options} />

            <Row>
                <Col lg={{size:5 ,offset:1}}>
                <Line data={data2} options={options} />
                </Col>
                <Col lg={{size:5 }}>
                <Line data={data3} options={options} />
                </Col>
            </Row>

            <Form onSubmit={()=>submitDate()}>
                <FormGroup row>
                <Col sm={{ size: 3,  offset: 3 }} style={{justifyContent: "center",textAlign: "center" }}>
                    <Label for="exampleSelect" >Select start date</Label>
                    <Input type="date" name="select" id="exampleSelect" placeholder="Select Date" onChange={(e)=>setSdate(e.target.value)}/>
                </Col>    
                <Col sm={3} style={{justifyContent: "center",textAlign: "center"}}>
                    <Label for="exampleSelect" >Select End Date</Label>
                    <Input type="date" name="select" id="exampleSelect" placeholder="Select Date" onChange={(e)=>setEdate(e.target.value)} />
                </Col>    
                {/* <Col sm={3} style={{justifyContent: "center",textAlign: "center",marginTop:"35px"}}>
                <Button color="secondary" itemType="submit">Set Date</Button>
                </Col> */}

                </FormGroup>
            </Form>


        </div>
    )
    
}

export default Chart
