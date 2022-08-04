// rce
import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
// impt
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=> {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    

    const capitalize = (string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    const updateNews= async ()=>{
        props.setProgress(10);
        setLoading(true);
        const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        // let data = " ";
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles);
        setLoading(false);
        setTotalPages(parsedData.totalResults/props.pageSize);
        setTotalResults(parsedData.totalResults)
        // console.log(parsedData);
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `${capitalize(props.category)} - NewsMonkey`;
        setTimeout(()=>{
            document.title="News Monkey - Get your Daily News Free";
        },2000);
        updateNews();
    }, [])
    
    // async function will wait for the response to come. Makes the function async to the other code

    // handlePrevClick = async ()=>{
    //     this.setState({loading: true})
    //     let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=4b886b06e43f4765b528dbad7da389ee&page=${this.state.page -1}&pageSize=${props.pageSize}`;
    //     let data = "";
    //     // let data = await fetch(url);
    //     let parsedData = await data.json();
    //     // console.log(parsedData);
    //     this.setState({loading: false,
    //                     articles: parsedData.articles,
    //                     page: this.state.page-1})
    // }

    // handleNextClick = async ()=>{
    //     // if(this.state.page+1 > Math.ceil(this.state.totalResults/20)){

    //     // }
    //     // else{
            
    //     // }



    //     this.setState({loading: true})
    //     let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=4b886b06e43f4765b528dbad7da389ee&page=${this.state.page +1}&pageSize=${props.pageSize}`;
    //     let data = "";
    //     // let data = await fetch(url);
    //     let parsedData = await data.json();
    //     // console.log(parsedData);
    //     this.setState({loading: false,
    //                     articles: parsedData.articles,
    //                     page: this.state.page+1})
    // }

    // handlePrevClick = ()=>{
    //     setPage(page-1);
    //     this.updateNews();
        
    // }

    // handleNextClick = ()=>{
    //     setPage(page+1);
    //     this.updateNews();
    // }


    const fetchMoreData = async () => {
        const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1);
        // let data = " ";
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles));
        setTotalPages(parsedData.totalResults/props.pageSize);
        setTotalResults(parsedData.totalResults);
    };

        return (
        <div className='container' style={{marginTop: "70px"}}>
            <h1 className="text-center" style={{margin: "35px 0px"}}>NewsMonkey - Top {capitalize(props.category!=="general"?props.category+" ":"")}Headlines</h1>
            {loading && <Spinner/>}
            <InfiniteScroll dataLength={articles.length} next={fetchMoreData} hasMore={articles.length!==totalResults} loader={<Spinner/>}>
                <div className="row text-center container">
                    {articles.map((element)=>{
                        return <div className="col-md-4 text-center" key={element.url}>
                        <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} author={element.author} source={element.source.name}/>
                        </div>
                    })}
                </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}><i className="fa-solid fa-arrow-left"></i> Previous</button>
                <button disabled={this.state.page >=this.state.totalPages} type="button" className="btn btn-dark mx-2" onClick={this.handleNextClick}>Next <i className="fa-solid fa-arrow-right"></i></button>
            </div> */}
        </div>
        )
}

News.defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general"
}

News.propTypes = {
    // pts
    country: PropTypes.string,
    // ptn
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News