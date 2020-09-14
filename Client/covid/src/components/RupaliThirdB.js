import React, { PureComponent } from 'react';
import { Table } from 'reactstrap';
import { FormGroup, Label, Input, Col } from 'reactstrap';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

class ShoeThirdB extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            noitem: false,
            items: [],
            isLoaded: false,
            allstate: [],
            type: [],
            state1: [],
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 10,
            currentPage: 0

        }
        this.handlePageClick = this.handlePageClick.bind(this);
    }
    alterState(val) {
        var data = []
        this.state.allstate.map(item => {
            if (item.state == val) {
                data.push(item)
            }
        })
        if (data.length == 0) {
            this.setState({
                tableData: this.state.allstate
            })
        } else {
            this.setState({
                tableData: data
            })
        }

    }

    alterType(val) {
        var data = []
        var other = ['Govt', 'Society']
        if ((val == "Govt") || (val == "Govt.")) {
            this.state.allstate.map(item => {
                if ((item.ownership == "Govt") || (item.ownership == "Govt.")) {
                    data.push(item)
                }
            })
        }
        if (val == "Society") {
            this.state.allstate.map(item => {
                if ((item.ownership == "Society") || (item.ownership == "society")) {
                    data.push(item)
                }
            })
        }
        if (!(other.includes(val))) {
            this.state.allstate.map(item => {
                if (item.ownership == val) {
                    data.push(item)
                }
            })
        }
        if (data.length == 0) {
            this.setState({
                tableData: this.state.allstate
            })
        } else {
            this.setState({
                tableData: data
            })
        }

    }

    componentDidMount() {
        this.getData();
    }
    getData() {
        var Types = []
        var AllState = []
        axios
            .get('https://api.rootnet.in/covid19-in/hospitals/medical-colleges')
            .then(res => {
                // alert(res.data.data.medicalColleges);
                res.data.data.medicalColleges.map(item => {
                    if (!(Types.includes(item.ownership))) {
                        Types.push(item.ownership)
                    }
                    if (!(AllState.includes(item.state))) {
                        AllState.push(item.state)
                    }

                })
                var a = Types.indexOf('Govt.')
                Types.splice(a, 1);
                a = Types.indexOf('society')
                Types.splice(a, 1)
                var tdata = res.data.data.medicalColleges;
                var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
                this.setState({
                    isLoaded: true,
                    allstate: tdata,
                    items: tdata,
                    state1: AllState,
                    type: Types,
                    noitem: true,
                    pageCount: Math.ceil(tdata.length / this.state.perPage),
                    orgtableData: tdata,
                    tableData: slice
                })
            });
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });

    };

    loadMoreData() {
        const data = this.state.orgtableData;

        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            tableData: slice
        })

    }

    renderTableData() {

        return this.state.tableData.map((item) => {
            return ( <
                tr >
                <
                td > { item.state } < /td> <
                td > { item.name } < /td> <
                td > { item.city } < /td> <
                td > { item.ownership } < /td> <
                td > { item.admissionCapacity } < /td> <
                td > { item.hospitalBeds } < /td> < /
                tr >
            )
        })


    }


    render() {
        var { isLoaded } = this.state.isLoaded;
        if (isLoaded) {
            return <div > Loading... < /div>
        } else {
            return ( <
                div >
                <
                div >
                <
                FormGroup row >
                <
                Col sm = {
                    { size: 4, offset: 1 }
                }
                style = {
                    { justifyContent: "center", textAlign: "center" }
                } >
                <
                Label
                for = "exampleSelect" > Select State < /Label> <
                Input type = "select"
                name = "select"
                id = "exampleSelect"
                placeholder = "Select State"
                defaultValue = "India"
                onChange = {
                    (e) => {
                        this.alterState(e.target.value)
                    }
                } >
                <
                option > India < /option> {
                this.state.state1.map(item => {
                    return ( <
                        option value = { item }
                        key = { item } > { item } <
                        /option>
                    )
                })

            }

            <
            /Input> < /
            Col > <
                Col sm = {
                    { size: 4 }
                }
            style = {
                    { justifyContent: "center", textAlign: "center" }
                } >
                <
                Label
            for = "exampleSelect" > Select State < /Label> <
            Input type = "select"
            name = "select"
            id = "exampleSelect"
            placeholder = "Select State"
            onChange = {
                    (e) => {
                        this.alterType(e.target.value)
                    }
                } >
                <
                option > None < /option> {
            this.state.type.map(item => {
                return ( <
                    option value = { item }
                    key = { item } > { item } <
                    /option>
                )
            })

        }

        <
        /Input> < /
        Col >

            <
            /FormGroup>    


        <
        div className = "container" >
            <
            div className = "row" >

            <
            div className = "col-12 col-md-5 m-1" >
            <
            Table bordered hover size = "sm"
        id = "thirdTask" >
            <
            thead >
            <
            tr >
            <
            th > State Name < /th> <
        th > Institute name < /th> <
        th > City < /th> <
        th > Type < /th> <
        th > Admission Capacity < /th> <
        th > Hospital Beds < /th> < /
        tr > <
            /thead> <
        tbody >

            { this.renderTableData() } <
            /tbody> < /
        Table > <
            /div> < /
        div > <
            /div> < /
        div >
            <
            ReactPaginate previousLabel = { "prev" }
        nextLabel = { "next" }
        breakLabel = { "..." }
        breakClassName = { "break-me" }
        pageCount = { this.state.pageCount }
        marginPagesDisplayed = { 2 }
        pageRangeDisplayed = { 5 }
        onPageChange = { this.handlePageClick }
        containerClassName = { "pagination" }
        subContainerClassName = { "pages pagination" }
        activeClassName = { "active" }
        /> < /
        div >
    );
}
}
}

export default ShoeThirdB;