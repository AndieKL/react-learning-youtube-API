import React from 'react';

const VideoListItem = ({video, onVideoSelect}) => {
	const vid = video.snippet;

	return (
		<li className="list-group-item" onClick={() => onVideoSelect(video)}>
			<div className="video-list media">
				<div className="video-item media-left">
					<img className="media-object" src={vid.thumbnails.default.url} />
				</div>
			
			<div className="media-body">
				<div className="media-heading">{vid.title}</div>
			</div>
			</div>
		</li>
	);
}

export default VideoListItem;