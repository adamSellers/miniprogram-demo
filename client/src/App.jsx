import React, { useState, useEffect, createContext, useContext } from 'react';
import { mockEvents, mockContent } from './data/mockData';
import { wx } from './utils/wx'; // Simulated WeChat API
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import ContentPage from './pages/ContentPage';
import ContentDetailPage from './pages/ContentDetailPage';
import ProfilePage from './pages/ProfilePage';
import TabBar from './components/TabBar';
import ErrorMessage from './components/ErrorMessage'; // Global error component

// Context for managing user state and navigation
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentEventId, setCurrentEventId] = useState(null);
  const [currentContentId, setCurrentContentId] = useState(null);
  const [user, setUser] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [savedContent, setSavedContent] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Simulate fetching user info on app load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const loginRes = await wx.login();
        console.log('WeChat login code:', loginRes.code);
        const profileRes = await wx.getUserProfile();
        setUser(profileRes.userInfo);
      } catch (error) {
        console.error('Failed to get user info:', error);
        setErrorMessage('Failed to load user profile. Please try again.');
      }
    };
    fetchUser();
  }, []);

  const navigate = (page, params = {}) => {
    setCurrentPage(page);
    if (page === 'eventDetail') {
      setCurrentEventId(params.id);
    } else if (page === 'contentDetail') {
      setCurrentContentId(params.id);
    } else {
      setCurrentEventId(null);
      setCurrentContentId(null);
    }
    setErrorMessage(''); // Clear error messages on navigation
    wx.navigateTo({ url: `/${page}` }); // Simulate WeChat navigation
  };

  const registerForEvent = (eventId) => {
    if (!user) {
      setErrorMessage('Please log in to register for events.');
      return;
    }
    if (!registeredEvents.includes(eventId)) {
      setRegisteredEvents([...registeredEvents, eventId]);
      setErrorMessage('');
      alert('Registration successful!');
    } else {
      setErrorMessage('You are already registered for this event.');
    }
  };

  const unregisterFromEvent = (eventId) => {
    setRegisteredEvents(registeredEvents.filter(id => id !== eventId));
    setErrorMessage('');
    alert('Registration removed.');
  };

  const saveContent = (contentId) => {
    if (!user) {
      setErrorMessage('Please log in to save content.');
      return;
    }
    if (!savedContent.includes(contentId)) {
      setSavedContent([...savedContent, contentId]);
      setErrorMessage('');
      alert('Content saved!');
    } else {
      setErrorMessage('This content is already saved.');
    }
  };

  const removeSavedContent = (contentId) => {
    setSavedContent(savedContent.filter(id => id !== contentId));
    setErrorMessage('');
    alert('Content removed from saved list.');
  };

  return (
    <AppContext.Provider value={{
      currentPage, navigate, user,
      currentEventId, currentContentId,
      registeredEvents, registerForEvent, unregisterFromEvent,
      savedContent, saveContent, removeSavedContent,
      errorMessage, setErrorMessage,
      mockEvents, mockContent // Make mock data available via context
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Main App Component
const App = () => {
  const { currentPage } = useContext(AppContext);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'events':
        return <EventsPage />;
      case 'eventDetail':
        return <EventDetailPage />;
      case 'content':
        return <ContentPage />;
      case 'contentDetail':
        return <ContentDetailPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="font-sans antialiased bg-gray-100">
      <div className="app-container">
        <ErrorMessage />
        <div className="main-content">
          {renderPage()}
        </div>
        <TabBar />
      </div>
    </div>
  );
};

export default function AppWrapper() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
}