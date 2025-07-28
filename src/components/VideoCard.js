import React, { useState, useEffect } from 'react';

const VideoCard = ({ info }) => {
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;

  const [viewsNotation, setViewsNotation] = useState('');
  const [viewDivide, setViewDivide] = useState(1);

  useEffect(() => {
    if (statistics?.viewCount >= 1000000) {
      setViewsNotation('M');
      setViewDivide(1000000);
    } else {
      setViewsNotation('K');
      setViewDivide(1000);
    }
  }, [statistics?.viewCount]);

  return (
    <div className="mx-2 my-2 w-[300px] h-[300px]">
      <img
        className="rounded-lg w-full h-48 object-cover"
        src={thumbnails?.medium?.url}
        alt={title || 'Video Thumbnail'}
      />
      <h1 className="w-80 font-bold px-1 truncate">{title}</h1>
      <p className="px-1 text-sm text-gray-600">{channelTitle}</p>
      <ul>
        <li className="px-1 text-sm text-gray-500">
          {(statistics?.viewCount / viewDivide).toFixed(1)}
          {viewsNotation} Views
        </li>
      </ul>
    </div>
  );
};

export default VideoCard;
