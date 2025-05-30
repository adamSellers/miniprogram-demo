import React, { useState, useContext } from 'react';
import { AppContext } from '../App'; // Import AppContext

const EventsPage = () => {
  const { navigate, mockEvents } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterDateRange, setFilterDateRange] = useState('All');

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.speakers.some(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'All' || event.category === filterCategory;

    const eventDate = new Date(event.date);
    const now = new Date();
    let matchesDateRange = true;

    if (filterDateRange === 'Upcoming') {
      matchesDateRange = eventDate >= now;
    } else if (filterDateRange === 'Past') {
      matchesDateRange = eventDate < now;
    }

    return matchesSearch && matchesCategory && matchesDateRange;
  }).sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date

  const categories = ['All', ...new Set(mockEvents.map(event => event.category))];
  const dateRanges = ['All', 'Upcoming', 'Past'];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Upcoming & Past Events</h2>

      {/* Search and Filter */}
      <div className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Search events..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex flex-wrap gap-3">
          <select
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterDateRange}
            onChange={(e) => setFilterDateRange(e.target.value)}
          >
            {dateRanges.map(range => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Event List */}
      <div className="space-y-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer flex flex-col md:flex-row transform transition duration-300 hover:scale-[1.02]"
              onClick={() => navigate('eventDetail', { id: event.id })}
            >
              <img src={event.imageUrl} alt={event.title} className="w-full md:w-1/3 h-48 md:h-auto object-cover" onError={(e) => e.target.src = `https://placehold.co/600x300/CCCCCC/000000?text=Event`} />
              <div className="p-4 flex-grow">
                <h3 className="font-bold text-xl text-gray-900 mb-1">{event.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{event.date} - {event.time}</p>
                <p className="text-sm text-gray-700">{event.shortDescription}</p>
                <div className="mt-2 text-xs font-semibold text-blue-600">{event.category}</div>
                <div className={`mt-2 text-xs font-semibold ${event.status === 'Upcoming' ? 'text-green-600' : 'text-red-600'}`}>
                  Status: {event.status}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No events found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default EventsPage;