import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function FetchNews() {
  let link =
    "https://newsapi.org/v2/top-headlines?country=in&apiKey=daf0114e99ed4bed867666ad6ded9d41";

  var realTime = new Date().toLocaleTimeString();

  const [news, setNews] = useState([]);
  const [ctime, setCtime] = useState(realTime);

  const getNewsData = () => {
    axios.get(link)
      .then((res) => {
        setNews(res.data.articles);
      });
  };

  useEffect(() => {
    getNewsData();
  }, []);

  const updateTime = () => {
    let ct = new Date().toLocaleString();
    setCtime(ct);
  };
  setInterval(updateTime, 1000);

  return (
    <>
      <div className="container my-5">
        <h1 className="header">
          Live Breaking News <span>{ctime}</span></h1>
        <div className="row ms-4 ">
          {news.map((val, index) => {
            return (
              <div className="col-lg-4 col-md-6 col-xs-12">
                <div className="card box" style={{ width: "18rem" }}>
                  <img
                    src={val.urlToImage}
                    className="card-img-top"
                    alt="link broken"
                    onError="src='https://cdn.pixabay.com/photo/2018/07/29/23/05/woman-3571298_960_720.jpg'"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{val.source.name}</h5>
                    <p className="card-text text">{val.title}</p>
                    <a
                      href={val.url}
                      className="btn btn-primary"
                      target="_blank">
                      Read Details
                    </a>
                    <span className="">{val.publishedAt.slice(12,-1)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default FetchNews;
