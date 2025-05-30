import React, { useContext } from 'react';
import { AppContext } from '../App'; // Import AppContext

const HomePage = () => {
  const { navigate, mockEvents, mockContent } = useContext(AppContext);
  const featuredEvents = mockEvents.filter(e => e.status === 'Upcoming').slice(0, 2);
  const latestContent = mockContent.slice(0, 3);

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome!</h2>

      {/* Featured Events */}
      <section>
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Featured Events</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredEvents.map(event => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105"
              onClick={() => navigate('eventDetail', { id: event.id })}
            >
              <img src={event.imageUrl} alt={event.title} className="w-full h-40 object-cover" onError={(e) => e.target.src = `https://placehold.co/600x300/CCCCCC/000000?text=Event`} />
              <div className="p-4">
                <h4 className="font-semibold text-lg text-gray-900">{event.title}</h4>
                <p className="text-sm text-gray-600">{event.date} - {event.time}</p>
                <p className="text-sm text-gray-600">{event.locationType === 'Online' ? 'Online Webinar' : event.locationDetails}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
          onClick={() => navigate('events')}
        >
          View All Events
        </button>
      </section>

      {/* Latest Content */}
      <section>
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Latest Content</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {latestContent.map(content => (
            <div
              key={content.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105"
              onClick={() => navigate('contentDetail', { id: content.id })}
            >
              <img src={content.thumbnailUrl} alt={content.title} className="w-full h-32 object-cover" onError={(e) => e.target.src = `https://placehold.co/300x200/CCCCCC/000000?text=Content`} />
              <div className="p-4">
                <h4 className="font-semibold text-md text-gray-900">{content.title}</h4>
                <p className="text-sm text-gray-600">{content.type}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
          onClick={() => navigate('content')}
        >
          View All Content
        </button>
      </section>

      {/* Quick Links */}
      <section>
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Quick Links</h3>
        <div className="grid grid-cols-2 gap-4">
          <button
            className="bg-green-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
            onClick={() => navigate('events', { category: 'Webinar' })}
          >
            Webinars
          </button>
          <button
            className="bg-purple-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-purple-600 transition duration-200"
            onClick={() => navigate('events', { category: 'Trade Show' })}
          >
            Trade Shows
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;