import React from 'react'

const QuestionPagination = ({ questionsPerPage, totalQuestions, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalQuestions / questionsPerPage); i++) {
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

export default QuestionPagination;