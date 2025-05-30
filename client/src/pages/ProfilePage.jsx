import React, { useContext } from 'react';
import { AppContext } from '../App'; // Import AppContext

const ProfilePage = () => {
  const { user, registeredEvents, savedContent, navigate, unregisterFromEvent, removeSavedContent, mockEvents, mockContent } = useContext(AppContext);

  const userRegisteredEvents = registeredEvents.map(id => mockEvents.find(e => e.id === id)).filter(Boolean);
  const userSavedContent = savedContent.map(id => mockContent.find(c => c.id === id)).filter(Boolean);

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">My Profile</h2>

      {user ? (
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
          <img src={user.avatarUrl} alt="User Avatar" className="w-20 h-20 rounded-full object-cover border-2 border-blue-400" />
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{user.nickName}</h3>
            <p className="text-gray-600">Welcome to your personal hub!</p>
          </div>
        </div>
      ) : (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg" role="alert">
          <p className="font-bold">Not Logged In</p>
          <p>Please allow WeChat login to access personalized features.</p>
        </div>
      )}

      <section>
        <h3 className="text-xl font-semibold text-gray-700 mb-3">My Registered Events</h3>
        {userRegisteredEvents.length > 0 ? (
          <div className="space-y-3">
            {userRegisteredEvents.map(event => (
              <div key={event.id} className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-lg text-gray-900 cursor-pointer hover:underline" onClick={() => navigate('eventDetail', { id: event.id })}>{event.title}</h4>
                  <p className="text-sm text-gray-600">{event.date}</p>
                </div>
                <button
                  className="bg-red-500 text-white text-sm px-3 py-1 rounded-full hover:bg-red-600 transition duration-200"
                  onClick={() => unregisterFromEvent(event.id)}
                >
                  Unregister
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You haven't registered for any events yet.</p>
        )}
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-700 mb-3">My Saved Content</h3>
        {userSavedContent.length > 0 ? (
          <div className="space-y-3">
            {userSavedContent.map(content => (
              <div key={content.id} className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-lg text-gray-900 cursor-pointer hover:underline" onClick={() => navigate('contentDetail', { id: content.id })}>{content.title}</h4>
                  <p className="text-sm text-gray-600">{content.type}</p>
                </div>
                <button
                  className="bg-red-500 text-white text-sm px-3 py-1 rounded-full hover:bg-red-600 transition duration-200"
                  onClick={() => removeSavedContent(content.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You haven't saved any content yet.</p>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;