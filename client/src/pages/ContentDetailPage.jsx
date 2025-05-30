import React, { useContext } from 'react';
import { AppContext } from '../App'; // Import AppContext
import { wx } from '../utils/wx'; // Simulated WeChat API

const ContentDetailPage = () => {
  const { currentContentId, navigate, saveContent, savedContent, removeSavedContent, setErrorMessage, mockContent, mockEvents } = useContext(AppContext);
  const content = mockContent.find(c => c.id === currentContentId);

  if (!content) {
    return (
      <div className="p-4 text-center text-gray-500">
        <h2 className="text-xl font-semibold mb-4">Content Not Found</h2>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
          onClick={() => navigate('content')}
        >
          Back to Content
        </button>
      </div>
    );
  }

  const isSaved = savedContent.includes(content.id);
  const associatedEvent = mockEvents.find(e => e.id === content.associatedEventId);

  const handleDownload = async () => {
    try {
      if (content.fileUrl) {
        const res = await wx.downloadFile({ url: content.fileUrl });
        if (res && res.tempFilePath) {
          wx.openDocument({ filePath: res.tempFilePath });
        } else {
          setErrorMessage('Failed to download file.');
        }
      } else {
        setErrorMessage('File URL not available.');
      }
    } catch (error) {
      console.error('Download error:', error);
      setErrorMessage('Error during download. Please try again.');
    }
  };

  const handleShare = () => {
    wx.shareAppMessage({
      title: content.title,
      path: `/pages/contentDetail/contentDetail?id=${content.id}`, // Example path for sharing
      imageUrl: content.thumbnailUrl,
    });
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {content.type === 'Video Recording' && content.fileUrl ? (
          <video
            src={content.fileUrl}
            controls
            className="w-full h-auto max-h-96 object-contain bg-black"
            poster={content.thumbnailUrl}
            onError={() => setErrorMessage('Video failed to load. Please check your network connection.')}
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <img src={content.thumbnailUrl} alt={content.title} className="w-full h-56 object-cover" onError={(e) => e.target.src = `https://placehold.co/600x300/CCCCCC/000000?text=Content`} />
        )}
        <div className="p-6 space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">{content.title}</h2>
          <p className="text-lg text-gray-700">Type: {content.type}</p>
          {associatedEvent && (
            <p className="text-md text-gray-600">
              <span className="font-semibold">From Event:</span>{' '}
              <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => navigate('eventDetail', { id: associatedEvent.id })}>
                {associatedEvent.title}
              </span>
            </p>
          )}

          <hr className="border-gray-200" />

          <h3 className="text-xl font-semibold text-gray-800">Description</h3>
          <p className="text-gray-700 leading-relaxed">{content.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {content.tags.map(tag => (
              <span key={tag} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>

          <div className="mt-6 flex flex-col space-y-3">
            {content.type === 'Presentation Slides' && content.fileUrl && (
              <button
                className="w-full bg-indigo-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-indigo-600 transition duration-200 flex items-center justify-center"
                onClick={handleDownload}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download Slides
              </button>
            )}
            {isSaved ? (
              <button
                className="w-full bg-red-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-red-600 transition duration-200 flex items-center justify-center"
                onClick={() => removeSavedContent(content.id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Remove from Saved
              </button>
            ) : (
              <button
                className="w-full bg-purple-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-purple-600 transition duration-200 flex items-center justify-center"
                onClick={() => saveContent(content.id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
                Save for Later
              </button>
            )}
            <button
              className="w-full bg-yellow-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-yellow-600 transition duration-200 flex items-center justify-center"
              onClick={handleShare}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.314l4.94 2.47a3 3 0 10.893-1.788L13 11a3.001 3.001 0 00-2-3z" />
              </svg>
              Share
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6 text-center">
        <button
          className="bg-gray-700 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-800 transition duration-200"
          onClick={() => navigate('content')}
        >
          Back to Content List
        </button>
      </div>
    </div>
  );
};

export default ContentDetailPage;