import React from "react";


function BookDetails(props) {
    //const movieKey = props.match.params.title;
    //const movie = movies[movieKey];
    return (
        <div>
            <h1>Book Details</h1>
            <div>
                <img
                    src=""
                    alt=""
                    width="240"
                    height="360"
                    className="mb-3"
                />
            </div>
            <p>Description</p>
            <p>
                <strong>Release Date</strong> foobar
            </p>
            <div>
                <strong>Show Times</strong>
                <ul>
                    {/* {movie.times.map((time, index) => {
                        const timeKey = `${movieKey}-time-${index}`;
                        return <li key={timeKey}>{time}</li>;
                    })} */}
                </ul>
            </div>
        </div>
    );
}

export default BookDetails;
