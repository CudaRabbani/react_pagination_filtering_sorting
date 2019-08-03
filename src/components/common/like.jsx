import React, {Component} from 'react';

class Like extends Component {
    getLikeClass = (isLike) => {
        let likeClass = "fa fa-heart";
        return likeClass += isLike ? '' : "-o";
    };
    render() {
        const {onClick, movie} = this.props;
        return (
            <i style={{cursor: 'pointer'}}
               onClick={onClick}
               className={this.getLikeClass(movie.liked)}></i>
        );
    }
}


export default Like;
