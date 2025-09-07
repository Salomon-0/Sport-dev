import { faker } from '@faker-js/faker';

// Generate mock data
const generateMockMatches = (count, status = 'Live') => {
  const sports = ['Football', 'Basketball', 'Soccer', 'Tennis', 'Baseball'];
  const leagues = ['Premier League', 'NBA', 'Champions League', 'ATP Tour', 'MLB'];
  
  return Array.from({ length: count }, (_, index) => {
    const sport = sports[index % sports.length];
    const homeScore = faker.number.int({ min: 0, max: 150 });
    const awayScore = faker.number.int({ min: 0, max: 150 });
    
    return {
      id: faker.string.uuid(),
      sport,
      league: leagues[index % leagues.length],
      homeTeam: faker.company.name().split(' ')[0] + ' ' + faker.animal.type(),
      awayTeam: faker.company.name().split(' ')[0] + ' ' + faker.animal.type(),
      homeScore,
      awayScore,
      time: status === 'Live' ? `${faker.number.int({ min: 1, max: 90 })}'` : 
            status === 'Finished' ? 'FT' :
            faker.date.future().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      venue: faker.location.city() + ' Stadium',
      status
    };
  });
};

const generateMockTeams = (count) => {
  const sports = ['Football', 'Basketball', 'Soccer', 'Tennis', 'Baseball'];
  const leagues = ['Premier League', 'NBA', 'Champions League', 'ATP Tour', 'MLB'];
  
  return Array.from({ length: count }, (_, index) => {
    const wins = faker.number.int({ min: 5, max: 25 });
    const losses = faker.number.int({ min: 2, max: 15 });
    
    return {
      id: faker.string.uuid(),
      name: faker.company.name().split(' ')[0] + ' ' + faker.animal.type(),
      sport: sports[index % sports.length],
      league: leagues[index % leagues.length],
      ranking: index + 1,
      wins,
      losses,
      players: faker.number.int({ min: 20, max: 35 }),
      founded: faker.date.past({ years: 50 }).getFullYear(),
      description: faker.lorem.paragraph()
    };
  });
};

const generateMockPlayers = (count) => {
  const sports = ['Football', 'Basketball', 'Soccer', 'Tennis', 'Baseball'];
  const positions = ['Forward', 'Defender', 'Midfielder', 'Goalkeeper', 'Guard', 'Center'];
  
  return Array.from({ length: count }, (_, index) => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    team: faker.company.name().split(' ')[0] + ' ' + faker.animal.type(),
    sport: sports[index % sports.length],
    position: positions[index % positions.length],
    age: faker.number.int({ min: 18, max: 40 }),
    goals: faker.number.int({ min: 0, max: 50 }),
    assists: faker.number.int({ min: 0, max: 30 }),
    matches: faker.number.int({ min: 10, max: 50 }),
    rating: faker.number.float({ min: 6.0, max: 10.0, multipleOf: 0.1 }),
    nationality: faker.location.country(),
    height: faker.number.int({ min: 160, max: 220 }) + ' cm',
    weight: faker.number.int({ min: 60, max: 120 }) + ' kg'
  }));
};

const generateMockNews = (count) => {
  const categories = ['Football', 'Basketball', 'Soccer', 'Tennis', 'Baseball', 'Transfers', 'Results'];
  
  return Array.from({ length: count }, (_, index) => ({
    id: faker.string.uuid(),
    title: faker.lorem.sentence({ min: 8, max: 15 }),
    summary: faker.lorem.paragraph({ min: 2, max: 4 }),
    content: faker.lorem.paragraphs(5),
    author: faker.person.fullName(),
    category: categories[index % categories.length],
    publishedAt: faker.date.recent({ days: 7 }).toISOString(),
    readTime: faker.number.int({ min: 2, max: 10 }) + ' min read',
    views: faker.number.int({ min: 100, max: 10000 }),
    featured: index < 3
  }));
};

// Create mock data
export const mockData = {
  liveMatches: generateMockMatches(6, 'Live'),
  allMatches: [
    ...generateMockMatches(8, 'Live'),
    ...generateMockMatches(6, 'Finished'),
    ...generateMockMatches(4, 'Upcoming')
  ],
  teams: generateMockTeams(24),
  players: generateMockPlayers(32),
  news: generateMockNews(20)
};
