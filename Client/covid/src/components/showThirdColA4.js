import React, { PureComponent } from 'react';
import { Table, ListGroup, ListGroupItem } from 'reactstrap';
import { Card, CardTitle } from 'reactstrap';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import {load} from './LoadingComponent';
class ShowThirdCol extends PureComponent {

    constructor(props) {
            super(props);
            this.state = {
                summary: null,
                isLoaded: false,
                offset: 0,
                tableData: [],
                orgtableData: [],
                perPage: 10,
                currentPage: 0
            }
            this.handlePageClick = this.handlePageClick.bind(this);
        }
        /*componentDidMount() {
            fetch('https://api.rootnet.in/covid19-in/hospitals/beds')
                .then(res => res.json())
                .then(dataNew => {
                    this.setState({
                        isLoaded: true,
                        items: dataNew.data,
                        summary: dataNew.data.summary
                    })
                    console.log(dataNew);
                });
        }*/
    componentDidMount() {
        this.getData();
    }
    getData() {
        axios
            .get('https://api.rootnet.in/covid19-in/hospitals/beds')
            .then(res => {
                var tdata = res.data.data.regional;
                var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
                this.setState({
                    isLoaded: true,
                    pageCount: Math.ceil(tdata.length / this.state.perPage),
                    orgtableData: tdata,
                    tableData: slice,
                    summary: res.data.data.summary,
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
                td > { item.ruralHospitals } < /td> <
                td > { item.ruralBeds } < /td> <
                td > { item.urbanHospitals } < /td> <
                td > { item.urbanBeds } < /td> <
                td > { item.totalHospitals } < /td> <
                td > { item.totalBeds } < /td> < /
                tr >
            )
        })
    }
    renderSummaryData() {
        return ( <
            div id = "mydiv" >
            <
            ListGroupItem > < b > Rural Hospitals: < /b>{this.state.summary['ruralHospitals']}</ListGroupItem >
            <
            ListGroupItem > < b > Rural Beds: < /b>{this.state.summary['ruralBeds']}</ListGroupItem >
            <
            ListGroupItem > < b > Urban Hospitals: < /b>{this.state.summary['urbanHospitals']}</ListGroupItem >
            <
            ListGroupItem > < b > Urban Beds: < /b>{this.state.summary['urbanBeds']}</ListGroupItem >
            <
            ListGroupItem > < b > Total Hospitals: < /b>{this.state.summary['totalHospitals']}</ListGroupItem >
            <
            ListGroupItem > < b > Total Beds: < /b>{this.state.summary['totalBeds']}</ListGroupItem >

            <
            /div>
        )

    }
    render() {
        var isLoaded = this.state.isLoaded;
        if (!isLoaded) {
            return <div > <load /> < /div>
        } else {
            return ( <
                div >
                <
                Table bordered hover size = "sm"
                id = "thirdTask" >
                <
                thead >
                <
                tr >
                <
                th > State Name < /th> <
                th > Rural Hospitals < /th> <
                th > Rural Beds < /th> <
                th > Urban Hospitals < /th> <
                th > Urban Beds < /th> <
                th > Total Hospitals < /th> <
                th > Total beds(State Wise) < /th> < /
                tr > <
                /thead> <
                tbody > { this.renderTableData() } <
                /tbody> < /
                Table >
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
                /> 
                 
                </div >
            );
        }
    }
}

export default ShowThirdCol;