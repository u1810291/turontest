import React from 'react'
import {connect} from "react-redux";
const AdminResultPagination = ({ usersPerPage, totalUsers, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
             <nav  aria-label="Page navigation example" className="table-responsive mb-2">
                <ul className='pagination pagination-sm' >
                    {pageNumbers.map(number => (
                        <li key={number} className='page-item'>
                            <a onClick={() => paginate(number)} href='#' className='page-link'>
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

const mapStateToProps = ({router,isAdmin}) => ({router,isAdmin});
export default connect(mapStateToProps)(AdminResultPagination);