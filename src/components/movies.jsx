import React, {Component, Fragment} from 'react';
import _ from 'lodash';
import MoviesTable from "./moviesTable";
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
        currentPage: 1,
        sortColumn: {path: 'title', order: 'asc'}
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

    handleSort = (path) => {
        const sortColumn = {...this.state.sortColumn};
        if (sortColumn.path === path) {
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
        }
        else {
            sortColumn.path = path;
            sortColumn.order= 'asc';
        }

        this.setState({sortColumn});
    };

    render() {
        //first filtering
        //second sorting
        //lastly display
        const {movies: allMovies, genres, pageSize, currentPage, selectedGenre, sortColumn} = this.state;
        const filteredMovies = selectedGenre && selectedGenre._id
            ? allMovies.filter(movie=> movie.genre._id === selectedGenre._id)
            : allMovies;
        //const paginatedMovies = paginate(movies, currentPage, pageSize);
        const sortedMovies = _.orderBy(filteredMovies, [sortColumn.path], [sortColumn.order])
        const paginatedFilteredMovies = paginate(sortedMovies, currentPage, pageSize);
        return (
            <Fragment>
                <div className="row">
                    <div className="col-sm-3">
                        <ListGroup
                            items={genres}
                            selectedItem={selectedGenre}
                            onItemSelect={this.handleGenreSelect}/>
                    </div>
                    <div className="col">
                        <p> Total Movies: {filteredMovies.length}</p>
                        <MoviesTable
                            movies={paginatedFilteredMovies}
                            onLike={this.handleLike}
                            onDelete={this.handleDelete}
                            onSort={this.handleSort}
                        />
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
