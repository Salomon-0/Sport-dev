import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Trophy, Filter } from 'lucide-react';
import { mockData } from '../utils/mockData';

const LiveScores = () => {
  const [selectedSport, setSelectedSport] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const sports = ['All', 'Football', 'Basketball', 'Soccer', 'Tennis', 'Baseball'];
  const statuses = ['All', 'Live', 'Finished', 'Upcoming'];

  const filteredMatches = mockData.allMatches.filter(match => {
    const sportMatch = selectedSport === 'All' || match.sport === selectedSport;
    const statusMatch = selectedStatus === 'All' || match.status === selectedStatus;
    return sportMatch && statusMatch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Live':
        return 'text-red-500 bg-red-50';
      case 'Finished':
        return 'text-green-500 bg-green-50';
      case 'Upcoming':
        return 'text-blue-500 bg-blue-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Live':
        return <div className="w-2 h-2 bg-red-500 rounded-full live-indicator mr-1"></div>;
      case 'Finished':
        return <Trophy className="h-4 w-4 mr-1" />;
      case 'Upcoming':
        return <Calendar className="h-4 w-4 mr-1" />;
      default:
        return <Clock className="h-4 w-4 mr-1" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Live Scores</h1>
          
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center space-x-4 mb-4">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="font-medium text-gray-900">Filters</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sport
                </label>
                <select
                  value={selectedSport}
                  onChange={(e) => setSelectedSport(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  {sports.map(sport => (
                    <option key={sport} value={sport}>{sport}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Matches Grid */}
        <div className="space-y-4">
          {filteredMatches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-lg shadow-md p-6 card-hover"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-600">
                        {match.sport} • {match.league}
                      </span>
                    </div>
                    <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(match.status)}`}>
                      {getStatusIcon(match.status)}
                      {match.status}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <div className="text-center">
                      <p className="font-semibold text-gray-900 mb-1">{match.homeTeam}</p>
                      <p className="text-3xl font-bold text-blue-600">{match.homeScore}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-1">VS</p>
                      <p className="text-sm text-gray-600">{match.time}</p>
                      {match.venue && (
                        <p className="text-xs text-gray-500 mt-1">{match.venue}</p>
                      )}
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-gray-900 mb-1">{match.awayTeam}</p>
                      <p className="text-3xl font-bold text-blue-600">{match.awayScore}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredMatches.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No matches found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more results.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LiveScores;
