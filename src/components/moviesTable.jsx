import React, {Component} from 'react';
import Table from "./common/table";
import Like from "./common/like";



class MoviesTable extends Component {

    columns = [
        {path: 'title', label: 'Title'},
        {path: 'genre.name', label: 'Genre'},
        {path: 'numberInStock', label: 'Stock'},
        {path: 'dailyRentalRate', label: 'Rate'},
        {key: 'like',
            content: movie => <Like onClick={()=>this.props.onLike(movie)} movie={movie} />},
        {key: 'delete',
            content: movie => <button className="btn btn-danger"
                              onClick={() => this.props.onDelete(movie)}
                              >Delete</button>
        }
    ];


    render() {
        const {movies, sortColumn, onSort} = this.props;
        return (
            <Table
                columns={this.columns}
                data={movies}
                onSort={onSort}
                sortColumn={sortColumn}
            />
        );
    }
}


export default MoviesTable;
