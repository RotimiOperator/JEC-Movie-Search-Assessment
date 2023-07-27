import React, { useEffect, useState } from 'react';
import { NavLink } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export function Movie(props) {
    const [movie, setMovie] = useState([]);
    const { id } = useParams();

    const getMovie = () => {
        axios.post(`/moviesearch/movies/${id}`, { ImdbID: id })
            .then(function (response) {
                console.log(response.data);
                setMovie(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    console.log(id);

    useEffect(() => {
        getMovie();
    }, []);


    return (
        <>

            <div className="album pb-5 bg-body-tertiary">
                <div className="container mt-5 pt-5">

                    <div className="row">
                        <div className="col-md-4">
                            <img className="bd-placeholder-img card-img-top" width="100%" height="400" src={movie?.poster} style={{ height: '400px', objectFit: 'contain' }} />
                        </div>
                        <div className="col-md-8">
                            <span className="text-muted">Title</span>
                            <h1 class="text-body-emphasis">{movie.title}</h1>
                            <br/>
                            <span className="text-muted">Title</span>
                            <p class="fs-5">{movie.plot}</p>
                            <br />
                            <span className="text-muted">IMDB Score</span>
                            <p class="fs-5">{movie.imdbRating} / 10</p>
                            <br />
                            <div className="d-flex gap-4">
                                <div>
                                    <span className="text-muted">Year</span>
                                    <p class="fs-5">{movie.year}</p>
                                </div>
                                <div>
                                    <span className="text-muted">Type</span>
                                    <p class="fs-5">{movie.type}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    );

}
