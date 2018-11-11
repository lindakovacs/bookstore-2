import React from 'react'
import axios from 'axios'

function Search(props) {
    console.log(props.match.params);
    const handleChange = (e) => {
        console.log(e.target.value);
        props.match.params.inputQuery =  e.target.value;
    }
    const getData = () => {
        let url = 'http://localhost:7000/books/search/' + props.match.params.inputQuery;
        axios.get(url)
            .then(response => {
                return response;
            })
            .catch(error => console.log(error) );        
    }
    console.log(getData);
    return (
        <div>
            <form onSubmit={e => getData(e.target.value)}>
                <input onChange={handleChange} />
                <button type="submit">Search...</button>
            </form>
            {props.match.params.getData > 0 && props.match.params.getData.map((item, index) => {
                return (
                    <ul>
                        <li>{item}</li>
                    </ul>
                );
            })
        }
        </div>
    )
}

export default Search;