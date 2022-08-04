// rce
// import { getByTitle } from '@testing-library/react'
import React from 'react'

const NewsItem = (props)=> {
        let {title,description,imageUrl, newsUrl,author, date,source} = props;
        return (
        <div className='my-3 d-flex justify-content-center'>
            <div className="card text-center" style={{width: "18rem"}}>
                <img src={imageUrl?imageUrl:"http://www.middleweb.com/wp-content/uploads/2017/08/breaking-news-blue-600.jpg"} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title} ...</h5>
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-warning">{source}</span>
                    <p className="card-text">{description} ...</p>
                    <p className="card-text"><small className="text-muted"><b>{author?author:"Unknown"}</b> on {new Date(date).toDateString()}</small></p>
                    <a rel="noopener noreferrer" href={newsUrl} className="btn btn-sm btn-dark" target="_blank">Read More</a>
                </div>
            </div>
        </div>
        )
}

export default NewsItem