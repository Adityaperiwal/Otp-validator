import axios from 'axios';
import {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import "./Articles.css";

function Articles({accessToken}){
    console.log(accessToken)
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(1);
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        if(minutes > 0 && seconds == 0) {
            setMinutes(minutes - 1);
            setSeconds(60);
        }
        else if(seconds > 0) {
            setTimeout(() => {
               setSeconds(seconds - 1); 
            }, 1000);
        }

        else if(minutes==0 && seconds==0){
            fetchArticles();
            setMinutes(1);
            setSeconds(0);
        }
    })

    const fetchArticles = async()=>{
        const headers = {
            Authorization : `Bearer ${accessToken}`
        }
        const response = axios.post("https://stage-services.truemeds.in/ArticleService/getArticleListing", {}, {
            headers
        }).then(res=>{
            console.log(res.data)
            setArticles(res.data.result.article);
            setCategories(res.data.result.category)
        }).catch(error=>console.log(error));
    }

    const resetCounter = ()=>{
        setMinutes(1);
        setSeconds(0);
    }
    return<>
        <h1>Articles</h1>
        <div>Counter {minutes} Minutes and {seconds} Seconds to refresh</div>
        <button onClick={()=>resetCounter()}>Reset</button>
        <div>
        <div>
  {categories.map(category=><div>
      <div>{category.name}</div>
      {
          articles.filter(article => article.categoryName === category.name).map(article=>{
              return <div class="article">
                  <img src={article.image} height="300px" width="300px"/>
                  <div>{article.name}</div>
                  <div>{article.author}</div>
                  <div>{article.category}</div>
              </div>
          })
      }
      </div>)}
      </div>
        </div>

    </>
}

const mapStateToProps = (state)=>{
    console.log(state);
    return({accessToken:state.accessTokenReducer.accessToken});
}
const mapDispatchToProps = {
}
export default connect(mapStateToProps, mapDispatchToProps)(Articles);