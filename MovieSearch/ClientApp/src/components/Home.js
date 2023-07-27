import React, { useState } from 'react';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export function Home() {
    const [data, setData] = useState({
        Keyword: ''
    });
    const [movies, setMovies] = useState([]);
    const [recents, setRecents] = useState([]);

    const submit = (sumitData = null) => {
        axios.post('/moviesearch/movies', sumitData ?? data)
            .then(function (response) {
                console.log(response.data);
                setMovies(response.data.search);
                setRecents(response.data.searches);
            })
            .catch(function (error) {
                console.log(error);
                setMovies({ movies: [], keyword: data.Keyword });
            });
    };
    console.log(movies);
    console.log(recents);


    return (
        <>

            <section className="py-5 text-center container">
                <div className="row py-lg-5">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light">Jean Edwards Consulting <br /> Movie Search Assessment</h1>
                        <p className="lead text-body-secondary">Search results powered by: <a href='http://www.omdbapi.com/' target='_blank'>http://www.omdbapi.com</a> service API.</p>
                        
                        <div className="d-flex" role="search">
                            <input className="form-control me-2" onChange={(e) => setData({ Keyword: e.target.value })} value={data.Keyword} type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit" onClick={() => submit()}>Search</button>
                        </div>

                        {(recents.length > 0) && <>
                            <h4 className="fw-light py-3">5 latest search queries</h4>
                            <div className="d-flex gap-2 justify-content-center">
                                {(recents.length > 0) && recents.map((recent, index) =>
                                    <span key={index} onClick={() => { setData({ Keyword: recent.keyword }); submit({ Keyword: recent.keyword }); }} className="fs-5 badge d-flex align-items-center p-1 pe-2 text-success bg-success-subtle border border-success-subtle rounded-pill" style={{ cursor: 'pointer' }} >
                                        <b>{recent.keyword}</b>
                                    </span>
                                )}
                            </div>
                        </>}
                    </div>
                </div>
            </section>

            <div className="album pb-5 bg-body-tertiary">
                <div className="container">

                    {(movies?.movies?.length > 0) && <>
                        <div className="text-center">
                            <h1>{movies?.movies?.length} Movie(s) Found.</h1>
                            <p className="lead">Search results for the movies titled <b>{movies?.keyword}</b>.</p>
                        </div>
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                            {(movies?.movies?.length > 0) && movies?.movies?.map((movie, index) =>
                                <div className="col" key={index}>
                                    <div className="card shadow-sm">
                                        <img className="bd-placeholder-img card-img-top" width="100%" height="225" src={movie.poster} style={{height: '225px', objectFit: 'cover'}} />
                                        <div className="card-body">
                                            <p className="card-text">{movie.title}</p>
                                            <NavLink tag={Link} to={`/moviesearch/movies/${movie.imdbID}`} className="icon-link gap-1 icon-link-hover stretched-link mb-2 text-primary">
                                                Read More...
                                            </NavLink>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group">
                                                    <button type="button" className="btn btn-sm btn-outline-secondary">{movie.type}</button>
                                                </div>
                                                <small className="text-body-secondary">{movie.year}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>}


                    {((movies?.movies?.length === 0) && (data.Keyword)) &&
                        <div className="text-center">
                            <h1>Not Found.</h1>
                            <p className="lead">Sorry, there are no search results for movies titled <b>{movies?.keyword}</b>.</p>
                        </div>
                    }


                    {(movies?.length === 0) &&
                        <div className="text-center">
                            <h1>Search for Movies by Title.</h1>
                            <p className="lead">Use the search bar above to search for movies by title.</p>
                        </div>
                    }

                </div>
            </div>

        </>
    );

}
