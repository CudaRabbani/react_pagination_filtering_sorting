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

    handleSort = (sortColumn) => {
        this.setState({sortColumn});
    };

    getPagedData = () => {
        const {movies: allMovies, genres, pageSize, currentPage, selectedGenre, sortColumn} = this.state;
        //first filtering
        //second sorting
        //lastly display
        const filteredMovies = selectedGenre && selectedGenre._id
            ? allMovies.filter(movie=> movie.genre._id === selectedGenre._id)
            : allMovies;

        const sortedMovies = _.orderBy(filteredMovies, [sortColumn.path], [sortColumn.order])
        const paginatedFilteredMovies = paginate(sortedMovies, currentPage, pageSize);

        return {totalCount: filteredMovies.length, data: paginatedFilteredMovies};
    };

    render() {
        const {genres, selectedGenre, sortColumn, pageSize, currentPage} = this.state;

        const {totalCount, data} = this.getPagedData();
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
                        <p> Total Movies: {totalCount}</p>
                        <MoviesTable
                            movies={data}
                            onLike={this.handleLike}
                            onDelete={this.handleDelete}
                            onSort={this.handleSort}
                            sortColumn={sortColumn}
                        />
                        <Pagination
                            onPageChange={this.handlePagination}
                            totalItem={totalCount}
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
