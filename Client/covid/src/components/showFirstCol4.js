import React, { PureComponent } from 'react'
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { Table } from 'reactstrap';
import {load} from './LoadingComponent';
class ShowFirstCol extends PureComponent {

    constructor(props) {
            super(props);
            this.state = {
                isLoaded: false,
                items: [],
                offset: 0,
                tableData: [],
                orgtableData: [],
                perPage: 10,
                currentPage: 0
            }
            this.handlePageClick = this.handlePageClick.bind(this);
        }
        /*  componentDidMount() {
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
*/
    componentDidMount() {
        this.getData();
    }
    getData() {
        axios
            .get('https://api.rootnet.in/covid19-in/contacts')
            .then(res => {
                var tdata = res.data.data.contacts.regional;
                var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
                this.setState({
                    isLoaded: true,
                    pageCount: Math.ceil(tdata.length / this.state.perPage),
                    orgtableData: tdata,
                    tableData: slice
                })
            });
    }
    
    renderTableData() {
        return this.state.tableData.map((item) => {
            return ( <
                tr >
                <
                td > { item.loc } < /td>  <
                td > { item.number } < /td>  < /
                tr >
            )
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
        // renderTableHeader(){
        //     return(
        //         <tr>
        //         <th>State Name</th>
        //         <th>Helpline Number</th>
        //         </tr>
        //     )
        // }
    render() {
        var isLoaded = this.state.isLoaded;
        if (!isLoaded) {
            return <div > <load /> < /div>
        } else {
            return ( < div >
                <
                div >
                <
                Table bordered hover size = "sm"
                id = "firstTask" >
                <
                thead >
                <
                tr >
                <
                th > State Name < /th> <
                th > Helpline Number < /th>  < /
                tr > < /thead > <
                tbody > { this.renderTableData() } <
                /tbody> < /
                Table > <
                /div> <
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
                /> </div >
            );
        }
    }
}

export default ShowFirstCol;