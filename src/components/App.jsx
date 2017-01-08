class App extends React.Component {
  constructor(props) {
    super(props);

    this.state= {
      currentVideo: window.exampleVideoData[1],
      videos: []
    };
  }
  componentDidMount(){
    this.getYouTubeVideos('kitten videos');
  }
  onListVideoClick(video) {
    this.setState({currentVideo: video});
    // this.setState({videos: video.snippet.title});
  }

  getYouTubeVideos(query) {
    var options = {
      key: this.props.API_KEY,
      query: query
    };
    // pass in the input key and query
    this.props.searchYouTube(options, (videos) =>
      this.setState({
        videos: videos,
        currentVideo: videos[0]
      })
    );
    // call searchYouTube function
    // collects the videos output
  }


  render() {
    return (
      <div>
        <Nav handleSearchInputChange={this.getYouTubeVideos.bind(this)}/>
        <div className="col-md-7">
          <VideoPlayer video={this.state.currentVideo}/>
        </div>
        <div className="col-md-5">
          <VideoList
            callback={this.onListVideoClick.bind(this)}
            videos={this.state.videos}/>
        </div>
      </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;
