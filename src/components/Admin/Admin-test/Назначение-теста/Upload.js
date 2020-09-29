import React, { useState } from 'react';
import axios from 'axios';

import QuestionUpload from "../../../temps/QuestionUpload/index";
import './Upload.css';

const  Upload = (props) => {
    return (
        <div className="App">
            <QuestionUpload />
        </div>
    );
}

export default Upload;