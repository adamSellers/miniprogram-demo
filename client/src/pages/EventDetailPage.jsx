import React, { useContext } from 'react';
import { AppContext } from '../App'; // Import AppContext
import { wx } from '../utils/wx'; // Simulated WeChat API

const EventDetailPage = () => {
  const { currentEventId, navigate, registerForEvent, registeredEvents, unregisterFromEvent, setErrorMessage, mockEvents, mockContent } = useContext(AppContext);
  const event = mockEvents.find(e => e.id === currentEventId);

  if (!event) {
    return (
      <div className="p-4 text-center text-gray-500">
        <h2 className="text-xl font-semibold mb-4">Event Not Found</h2>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
          onClick={() => navigate('events')}
        >
          Back to Events
        </button>
      </div>
    );
  }

  const isRegistered = registeredEvents.includes(event.id);
  const isPastEvent = new Date(event.date) < new Date();

  // Filter content related to this event
  const relatedContent = mockContent.filter(content => content.associatedEventId === event.id);

  const handleRegistration = () => {
    if (isPastEvent) {
      setErrorMessage('Cannot register for past events.');
      return;
    }
    if (event.registrationLink && event.registrationLink !== '#') {
      alert(`Simulating opening external registration link: ${event.registrationLink}`);
      // In a real Mini Program, you might use wx.navigateToMiniProgram or wx.openWebview
    } else {
      registerForEvent(event.id);
    }
  };

  const handleAddToCalendar = () => {
    alert(`Simulating adding "${event.title}" to calendar.`);
    // In a real Mini Program, you'd use wx.addPhoneCalendar or similar
  };

  const handleShare = () => {
    wx.shareAppMessage({
      title: event.title,
      path: `/pages/eventDetail/eventDetail?id=${event.id}`, // Example path for sharing
      imageUrl: event.imageUrl,
    });
  };

  const handleOpenMap = () => {
    if (event.locationType === 'Offline' && event.locationDetails) {
      wx.openLocation({
        latitude: 0, // Placeholder, ideally get from geocoding
        longitude: 0, // Placeholder
        name: event.title,
        address: event.locationDetails,
      });
    } else {
      setErrorMessage('Map location not available for online events.');
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={event.imageUrl} alt={event.title} className="w-full h-56 object-cover" onError={(e) => e.target.src = `https://placehold.co/600x300/CCCCCC/000000?text=Event`} />
        <div className="p-6 space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">{event.title}</h2>
          <p className="text-lg text-gray-700">{event.date} at {event.time}</p>
          <p className="text-md text-gray-600">
            <span className="font-semibold">Location:</span> {event.locationType === 'Online' ? 'Online Webinar' : event.locationDetails}
          </p>

          {event.locationType === 'Offline' && (
            <button
              onClick={handleOpenMap}
              className="w-full bg-blue-400 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-500 transition duration-200 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              View on Map
            </button>
          )}

          <hr className="border-gray-200" />

          <h3 className="text-xl font-semibold text-gray-800">About this Event</h3>
          <p className="text-gray-700 leading-relaxed">{event.description}</p>

          {event.agenda.length > 0 && (
            <>
              <h3 className="text-xl font-semibold text-gray-800 mt-6">Agenda</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {event.agenda.map((item, index) => (
                  <li key={index}>
                    <span className="font-semibold">{item.time}:</span> {item.topic}
                  </li>
                ))}
              </ul>
            </>
          )}

          {event.speakers.length > 0 && (
            <>
              <h3 className="text-xl font-semibold text-gray-800 mt-6">Speakers</h3>
              <div className="space-y-4">
                {event.speakers.map(speaker => (
                  <div key={speaker.name} className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg">
                    <img src={speaker.profilePic} alt={speaker.name} className="w-16 h-16 rounded-full object-cover" onError={(e) => e.target.src = `https://placehold.co/100x100/CCCCCC/000000?text=SP`} />
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">{speaker.name}</h4>
                      <p className="text-sm text-gray-700">{speaker.title}, {speaker.company}</p>
                      <p className="text-xs text-gray-600 mt-1">{speaker.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="mt-6 flex flex-col space-y-3">
            {!isPastEvent && (
              <>
                {isRegistered ? (
                  <button
                    className="w-full bg-red-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-red-600 transition duration-200"
                    onClick={() => unregisterFromEvent(event.id)}
                  >
                    Unregister
                  </button>
                ) : (
                  <button
                    className="w-full bg-green-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
                    onClick={handleRegistration}
                  >
                    Register Now
                  </button>
                )}
                <button
                  className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg shadow-md hover:bg-gray-300 transition duration-200"
                  onClick={handleAddToCalendar}
                >
                  Add to Calendar
                </button>
              </>
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

          {isPastEvent && relatedContent.length > 0 && (
            <>
              <h3 className="text-xl font-semibold text-gray-800 mt-6">Related Content</h3>
              <div className="space-y-3">
                {relatedContent.map(content => (
                  <div
                    key={content.id}
                    className="bg-gray-100 p-3 rounded-lg flex items-center space-x-3 cursor-pointer hover:bg-gray-200 transition duration-200"
                    onClick={() => navigate('contentDetail', { id: content.id })}
                  >
                    {content.type === 'Video Recording' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0113 3.414L16.586 7A2 2 0 0118 8.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h10V8.414L11.586 4H6z" clipRule="evenodd" />
                      </svg>
                    )}
                    <span className="font-medium text-gray-800">{content.title}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="mt-6 text-center">
        <button
          className="bg-gray-700 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-800 transition duration-200"
          onClick={() => navigate('events')}
        >
          Back to Events List
        </button>
      </div>
    </div>
  );
};

export default EventDetailPage;