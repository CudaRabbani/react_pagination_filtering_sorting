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
        const genres = [{_id:'', name:'All Genres'}, ...getGenres()];
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

    handleGenreSelect = (genre) => {
        this.setState({selectedGenre: genre, currentPage: 1});
    };

    render() {
        const {movies: allMovies, genres, pageSize, currentPage, selectedGenre} = this.state;
        const filteredMovies = selectedGenre && selectedGenre._id
            ? allMovies.filter(movie=> movie.genre._id === selectedGenre._id)
            : allMovies;
        //const paginatedMovies = paginate(movies, currentPage, pageSize);
        const paginatedFilteredMovies = paginate(filteredMovies, currentPage, pageSize);
        return (
            <Fragment>
                <div className="row">
                    <div className="col-sm-3">
                        <ListGroup
                            //Since we have added ListGroup.defaultProps we don't have to send them explicity
/*                            textProperty="name"
                            valueProperty="_id"*/
                            items={genres}
                            selectedItem={selectedGenre}
                            onItemSelect={this.handleGenreSelect}/>
                    </div>
                    <div className="col">
                        <p> Total Movies: {filteredMovies.length}</p>
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
                            {paginatedFilteredMovies.map(movie => (
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
                            totalItem={filteredMovies.length}
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
