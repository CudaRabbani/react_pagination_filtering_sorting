import React, {Component} from 'react';

import TableHeader from "./common/tableHeader";
import Like from "./common/like";
import TableBody from "./common/tableBody";

class MoviesTable extends Component {

    columns = [
        {path: 'title', label: 'Title'},
        {path: 'genre.name', label: 'Genre'},
        {path: 'numberInStock', label: 'Stock'},
        {path: 'dailyRentalRate', label: 'Rate'},
        {key: 'like',  content: movie => <Like onClick={()=>this.props.onLike(movie)} movie={movie} />},
        {key: 'delete', content: movie => <button className="btn btn-danger"
                                 onClick={() => this.props.onDelete(movie)}
                                 >Delete</button>
        }
    ];


    render() {
        const {movies, sortColumn, onSort} = this.props;
        return (
            <table className="table">
                <TableHeader
                    columns={this.columns}
                    sortColumn={sortColumn}
                    onSort={onSort}
                />
                <TableBody
                    data={movies}
                    columns={this.columns}
                />
            </table>
        );
    }
}


export default MoviesTable;
