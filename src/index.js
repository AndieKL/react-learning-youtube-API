import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

//YouTube API key
const API_KEY = "AIzaSyAm7Ofk6ZBhzCYhAqB_6cosqrkufjrHYv4";


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			videos: [],
			loading: true,
			selectedVideo: null
		};
		this.videoSearch('bats');
	}

	videoSearch(term) {
		YTSearch({key: API_KEY, term: term}, (videos) => {
			let arr = Object.values(videos);
			this.setState({videos: arr, loading: false, selectedVideo: videos[0]});
		});
	}

	render() {
		//using lodash to limit how often the API is called.
		const videoSearch = _.debounce((term) => {this.videoSearch(term) }, 300);

		//to ensure the initial API call has completed (with default term), the loading property is used to stall the render function
		if (this.state.loading) return <h1>Loading...</h1>;

		else{
			return (
				<div>
					<h1>Using the YouTube API within React.js</h1>
					<SearchBar onSearchTermChange={videoSearch} />
					<VideoDetail
						video={this.state.selectedVideo}
					/>
					<VideoList 
						onVideoSelect={selectedVideo => this.setState({selectedVideo})}
						videos={this.state.videos}
					/>
				</div>
			);
		}	
	}
}

ReactDOM.render(<App />, document.querySelector('.container'));