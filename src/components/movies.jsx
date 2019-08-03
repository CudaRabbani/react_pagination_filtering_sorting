import React, {Component, Fragment} from 'react';

import Like from "./common/like";

import {getMovies} from "../data/fakeMovieService";

class Movies extends Component {
    state={
        movies: []
    };

    componentDidMount() {
        const movies = getMovies();
        this.setState({movies});
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

    render() {
        const {movies} = this.state;
        return (
            <Fragment>
                <p> Total Movies: {movies.length} </p>
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
                    {movies.map(movie => (
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
            </Fragment>
        );
    }
}


export default Movies;
