import React from "react";
import { Link } from "react-router-dom";

function Back() {

    return (
        <Link to="/cart">
            <div className="box-3">
                <div className="btnb btn-three">
                    <span>Back</span>
                </div>
            </div>
        </Link>

    )
}

export default Back;
