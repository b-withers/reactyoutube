import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyAffAaKvynU8GmHkRU_f0Zz1K6Y2plPZ5w';


// create new component
// component should produce html
//const is es6 syntax, declares variable, it is the final value, will never change
class App extends Component{
    constructor(props) {
        super(props);

        this.state = { 
            videos: [],
            selectedVideo: null
        }; 

       this.videoSearch('Star Wars');        
    }

    videoSearch(term) {
        YTSearch ({key: API_KEY, term: term}, (videos) => {
            this.setState({ 
                videos: videos,
            selectedVideo: videos[0] 
        });
            //this.setState({videos: videos});
            console.log(videos);
        }); 

    }

    render(){
        const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);



    return(
         <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList  
        onVideoSelect={selectedVideo => this.setState({selectedVideo})}
        videos={this.state.videos} />
    </div>
    );
    }
}

//take generated HTML and put it on the page
//created an instance of App instead of it being a class
ReactDOM.render(<App />, document.querySelector('.container'));