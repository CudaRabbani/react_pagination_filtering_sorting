import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Pagination = (props) => {
    const {totalItem, pageSize, onPageChange, currentPage} = props;
    const totalPage = Math.ceil(totalItem/pageSize);
    const pages = _.range(1, totalPage+1);

    return (
        <nav>
            <ul className="pagination">
                {pages.map(page => (
                    <li
                        key={page}
                        onClick={()=>onPageChange(page)}
                        className={page === currentPage ? "page-item active" : "page-item"}>
                        <a className="page-link">{page}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    totalItem: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired
};

export default Pagination;
