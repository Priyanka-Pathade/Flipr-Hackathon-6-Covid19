import React, { PureComponent } from 'react'
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { Table } from 'reactstrap';
import {load} from './LoadingComponent';

class ShowSecondCol extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            titles: [],
            isLoaded: false,
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 10,
            currentPage: 0
        }
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        this.getData();
    }
    getData() {
        axios
            .get('https://api.rootnet.in/covid19-in/notifications')
            .then(res => {
                var tdata = res.data.data.notifications;
                var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
                this.setState({
                    isLoaded: true,
                    pageCount: Math.ceil(tdata.length / this.state.perPage),
                    orgtableData: tdata,
                    tableData: slice,
                    titles: tdata.title
                })
            });
    }
    renderSplitData() {
        return this.state.tableData.map((item) => {
            const date11 = item.title.slice(0, 10)
            const [date1, titlee] = item.title.split(/\s+(.*)/);

            return ( <
                    tr >
                    <
                    td > { date11 } < /td> <
                    td > { titlee } < /td> <
                    td > < a > { item.link } < /a></td >
                    <
                    /tr>
                )
                // }
                // else{
            return ( <
                    tr >
                    <
                    td > { date11 } < /td> <
                    td > { titlee } < /td> <
                    td > < a > { item.link } < /a></td >
                    <
                    /tr>
                )
                //}
        })
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
    render() {
        var isLoaded = this.state.isLoaded;
        if (!isLoaded) {
            return <div > <load /> < /div>
        } else {
            return ( <
                div >
                <
                Table bordered hover size = "sm"
                id = "secondTask" >
                <
                thead >
                <
                tr >
                <
                th > Date < /th> <
                th > Notification Title < /th> <
                th > Link < /th> < /
                tr > <
                /thead> <
                tbody > { this.renderSplitData() } <
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
                /> < /
                div >
            );
        }
    }
}

export default ShowSecondCol;