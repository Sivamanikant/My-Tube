import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { toggleMenu } from '../utils/appSlice';
import { SEARCH_API } from '../utils/constants';

const Head = () => {
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState('');
  const [suggestionData, setSuggestionData] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(true);

  const toggleHandler = () => {
    dispatch(toggleMenu());
  };

  // useCallback prevents unnecessary re-creations
  const getSearchSuggestion = useCallback(async () => {
    if (!searchData) {
      setSuggestionData([]);
      return;
    }
    try {
      const response = await fetch(SEARCH_API + encodeURIComponent(searchData));
      const json = await response.json();
      setSuggestionData(json[1] || []);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestionData([]);
    }
  }, [searchData]);

  useEffect(() => {
    const timer = setTimeout(() => getSearchSuggestion(), 200);
    return () => clearTimeout(timer);
  }, [searchData, getSearchSuggestion]);

  return (
    <div className="grid grid-flow-col p-4 shadow-lg">
      {/* Left: Hamburger + Logo */}
      <div className="flex col-span-2 items-center">
        <img
          className="h-10 cursor-pointer"
          alt="menu"
          src="https://icons.veryicon.com/png/o/miscellaneous/linear-icon-45/hamburger-menu-4.png"
          onClick={toggleHandler}
        />
        <a href="/">
          <img
            className="h-7 mx-2"
            alt="YouTube Logo"
            src="https://upload.wikimedia.org/wikipedia/commons/3/34/YouTube_logo_%282017%29.png"
          />
        </a>
      </div>

      {/* Middle: Search bar */}
      <div className="flex flex-col col-span-8">
        <div className="flex mx-0 items-center">
          <input
            className="border border-gray-500 w-3/4 px-4 rounded-l-full h-12 hover:border-gray-500"
            type="text"
            placeholder="Search"
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
            onFocus={() => setShowSuggestion(true)}
            onBlur={() => setShowSuggestion(false)}
          />
          <button className="bg-gray-100 px-6 h-12 rounded-r-full border border-gray-500">
            <i className="fa-solid fa-magnifying-glass" style={{ color: '#000000' }}></i>
          </button>
        </div>

        {/* Suggestions dropdown */}
        {showSuggestion && suggestionData.length > 0 && (
          <div className="absolute my-14 bg-white w-[43rem] items-center border border-gray-300 rounded-lg shadow-md">
            <ul>
              {suggestionData.map((suggestion, index) => (
                <li
                  onMouseDown={() => setSearchData(suggestion)}
                  className="px-5 py-2 hover:bg-gray-100 cursor-pointer"
                  key={index}
                >
                  <i
                    className="fa-solid fa-magnifying-glass"
                    style={{ color: '#000000', padding: '2px', margin: '2px', fontSize: '12px' }}
                  ></i>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right: Profile */}
      <div className="col-span-2 flex justify-end items-center">
        <img
          className="h-12 rounded-full border-2 border-red-600"
          alt="User Profile"
          src="https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg"
        />
      </div>
    </div>
  );
};

export default Head;
