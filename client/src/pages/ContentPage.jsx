import React, { useState, useContext } from 'react';
import { AppContext } from '../App'; // Import AppContext

const ContentPage = () => {
  const { navigate, mockContent, mockEvents } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterTag, setFilterTag] = useState('All');

  const allTags = ['All', ...new Set(mockContent.flatMap(content => content.tags))];
  const contentTypes = ['All', ...new Set(mockContent.map(content => content.type))];

  const filteredContent = mockContent.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          content.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          content.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'All' || content.type === filterType;
    const matchesTag = filterTag === 'All' || content.tags.includes(filterTag);
    return matchesSearch && matchesType && matchesTag;
  }).sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)); // Newest first

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Content Repository</h2>

      {/* Search and Filter */}
      <div className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Search content..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex flex-wrap gap-3">
          <select
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            {contentTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <select
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
          >
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Content List */}
      <div className="space-y-4">
        {filteredContent.length > 0 ? (
          filteredContent.map(content => (
            <div
              key={content.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer flex flex-col md:flex-row transform transition duration-300 hover:scale-[1.02]"
              onClick={() => navigate('contentDetail', { id: content.id })}
            >
              <img src={content.thumbnailUrl} alt={content.title} className="w-full md:w-1/3 h-48 md:h-auto object-cover" onError={(e) => e.target.src = `https://placehold.co/300x200/CCCCCC/000000?text=Content`} />
              <div className="p-4 flex-grow">
                <h3 className="font-bold text-xl text-gray-900 mb-1">{content.title}</h3>
                <p className="text-sm text-gray-600 mb-2">Type: {content.type}</p>
                {content.associatedEventId && (
                  <p className="text-xs text-gray-500">
                    From: {mockEvents.find(e => e.id === content.associatedEventId)?.title || 'N/A'}
                  </p>
                )}
                <div className="mt-2 flex flex-wrap gap-1">
                  {content.tags.map(tag => (
                    <span key={tag} className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No content found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default ContentPage;