import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Trophy, Target, TrendingUp, Search, Star } from 'lucide-react';
import { mockData } from '../utils/mockData';

const Players = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('All');
  const [selectedPosition, setSelectedPosition] = useState('All');

  const sports = ['All', 'Football', 'Basketball', 'Soccer', 'Tennis', 'Baseball'];
  const positions = ['All', 'Forward', 'Defender', 'Midfielder', 'Goalkeeper', 'Guard', 'Center'];

  const filteredPlayers = mockData.players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = selectedSport === 'All' || player.sport === selectedSport;
    const matchesPosition = selectedPosition === 'All' || player.position === selectedPosition;
    return matchesSearch && matchesSport && matchesPosition;
  });

  const getPositionColor = (position) => {
    const colors = {
      'Forward': 'bg-red-100 text-red-800',
      'Defender': 'bg-blue-100 text-blue-800',
      'Midfielder': 'bg-green-100 text-green-800',
      'Goalkeeper': 'bg-yellow-100 text-yellow-800',
      'Guard': 'bg-purple-100 text-purple-800',
      'Center': 'bg-indigo-100 text-indigo-800',
    };
    return colors[position] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Players</h1>
          
          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search players..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
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
                <select
                  value={selectedPosition}
                  onChange={(e) => setSelectedPosition(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  {positions.map(position => (
                    <option key={position} value={position}>{position}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Players Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlayers.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-lg shadow-md overflow-hidden card-hover"
            >
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-blue-600" />
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="flex items-center bg-white rounded-full px-2 py-1">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{player.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{player.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{player.team}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getPositionColor(player.position)}`}>
                    {player.position}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Trophy className="h-4 w-4 text-yellow-500 mr-2" />
                      <span className="text-sm text-gray-600">Goals</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{player.goals}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Target className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="text-sm text-gray-600">Assists</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{player.assists}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">Matches</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{player.matches}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Performance</p>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(player.rating / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPlayers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No players found</h3>
            <p className="text-gray-600">Try adjusting your search or filters.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Players;
