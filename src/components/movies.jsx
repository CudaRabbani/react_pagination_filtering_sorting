import React, {Component, Fragment} from 'react';

import Like from "./common/like";
import Pagination from "./common/pagination";

import {paginate} from "../util/paginate";

import {getMovies} from "../data/fakeMovieService";
import ListGroup from "./common/listGroup";
import {getGenres} from "../data/fakeGenreService";

class Movies extends Component {
    state={
        movies: [],
        genres:[],
        pageSize: 4,
        currentPage: 1
    };

    componentDidMount() {
        const movies = getMovies();
        const genres = getGenres();
        this.setState({movies, genres});
    };

    handleDelete = (movie) => {
        const {movies} = this.state;
        let movieList = movies.filter (m => m._id !== movie._id);
        this.setState({movies: movieList});
    };

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]}; //clone the object that will be changed
        movies[index].liked = !movies[index].liked;
        this.setState({movies});
    };

    handlePagination = (page) => {
        this.setState({currentPage: page})
    };

    render() {
        const {movies, genres, pageSize, currentPage} = this.state;
        const paginatedMovies = paginate(movies, currentPage, pageSize);
        return (
            <Fragment>
                <div className="row">
                    <div className="col-sm-3">
                        <ListGroup genres={genres}/>
                    </div>
                    <div className="col">
                        <p> Total Movies: {movies.length}</p>
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">Movie</th>
                                <th scope="col">Genre</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Rate</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {paginatedMovies.map(movie => (
                                <tr key={movie._id}>
                                    <td>{movie.title}</td>
                                    <td>{movie.genre.name}</td>
                                    <td>{movie.numberInStock}</td>
                                    <td>{movie.dailyRentalRate}</td>
                                    <td>
                                        <Like
                                            onClick={() => this.handleLike(movie)}
                                            movie={movie}
                                        />
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => this.handleDelete(movie)}
                                        >Delete</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <Pagination
                            onPageChange={this.handlePagination}
                            totalItem={movies.length}
                            pageSize={pageSize}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
            </Fragment>
        );
    }
}


export default Movies;
