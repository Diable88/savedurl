
import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [urlInput, setUrlInput] = useState('');
  const [links, setLinks] = useState(() => {
    // Load saved links from local storage on initial render
    const savedLinks = localStorage.getItem('savedLinks');
    return savedLinks ? JSON.parse(savedLinks) : [];
  });

  useEffect(() => {
    // Save links to local storage whenever the links state changes
    localStorage.setItem('savedLinks', JSON.stringify(links));
  }, [links]);

  function saveUrl() {
    if (!urlInput) return; // Prevent saving empty URLs
    const newLink = {
      url: urlInput,
      // Placeholder image, replace or modify as needed
      imageUrl: 'https://via.placeholder.com/200',
      title: 'Link Title', // Placeholder title, replace or modify as needed
      description: 'Link description goes here', // Placeholder description, replace or modify as needed
    };
    setLinks([...links, newLink]);
    setUrlInput(''); // Clear input field after saving
  }

  return (

    <div className="container mx-auto p-4 bg-gray-800">
      <h1 className="text-2xl font-bold text-center my-4 text-white">My Link Saver</h1>
      <form className="my-4" onSubmit={(e) => e.preventDefault()}>
        <div className="flex items-center justify-between">
          <input
            type="text"
            placeholder="Enter URL"
            className="w-full py-2 px-4 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:border-purple-500 text-black"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
          />
          <button
            type="button"
            onClick={saveUrl}
            className="ml-2 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg"
          >
            Save
          </button>
        </div>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link, index) => (
         <div key={index} className="shadow-lg rounded-lg link-card bg-[#4B1D3F] text-white">
  <img 
    src={link.imageUrl} 
    alt="Link" 
    className="link-image rounded-t-lg" // Apply the new CSS class
  />
  {/* ... rest of your link card */}
</div>
            <div className="p-4">
              <h2 className="text-lg font-bold">{link.title}</h2>
              <p className="text-gray-300 mt-2">{link.description}</p>
              <a href={link.url} className="text-purple-500 hover:text-purple-600 mt-4 block">
                Open Link
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
