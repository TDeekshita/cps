updatedTopicSelector.tsx import React, { useState } from 'react';
import './TopicSelector.css';

export interface Topic {
  id: number;
  name: string;
  category: string;
}
const mlTopics: Topic[] = [
  { id: 1, name: 'Supervised Learning', category: 'ML' },
  { id: 2, name: 'Neural Networks', category: 'ML' },
  { id: 3, name: 'Deep Learning', category: 'ML' },
  { id: 4, name: 'Reinforcement Learning', category: 'ML' }
];

interface TopicSelectorProps {
  onTopicSelect: (topics: Topic[]) => void;
  onGenerateAssessment: (topics: Topic[]) => void;
}

const TopicSelector: React.FC<TopicSelectorProps> = ({ onTopicSelect, onGenerateAssessment }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<Topic[]>([]);

  const filteredTopics = mlTopics.filter(topic =>
    topic.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedTopics.some(selected => selected.id === topic.id)
  );

  const handleTopicSelect = (topic: Topic) => {
    const updatedTopics = [...selectedTopics, topic];
    setSelectedTopics(updatedTopics);
    setSearchTerm('');
    setIsDropdownOpen(false);
    onTopicSelect(updatedTopics);
  };

  const handleRemoveTopic = (topicId: number) => {
    const updatedTopics = selectedTopics.filter(topic => topic.id !== topicId);
    setSelectedTopics(updatedTopics);
    onTopicSelect(updatedTopics);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleInputFocus = () => {
    if (searchTerm.trim() || filteredTopics.length > 0) {
      setIsDropdownOpen(true);
    }
  };

  const handleGenerateClick = () => {
    onGenerateAssessment(selectedTopics); // ✅ This is crucial
  };

  return (
    <div className="topic-selector-container">
      <h2>You've studied</h2>
      <p className="description">
        I'm your learning assessment assistant. Enter the concepts
        or topics you've already studied, and I'll create
        a personalized assessment for you.
      </p>
      
      <div className="input-section">
        <label>Target Topic</label>
        <div className="selected-topics">
          {selectedTopics.map(topic => (
            <div key={topic.id} className="selected-topic-tag">
              {topic.name}
              <span className="remove-topic-btn" onClick={() => handleRemoveTopic(topic.id)}>×</span>
            </div>
          ))}
        </div>

        <div className="dropdown-container">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder="Search for a topic..."
            className="topic-input"
          />
          
          {isDropdownOpen && filteredTopics.length > 0 && (
            <ul className="dropdown-list">
              {filteredTopics.map(topic => (
                <li
                  key={topic.id}
                  onClick={() => handleTopicSelect(topic)}
                  className="dropdown-item"
                >
                  {topic.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="prerequisites-section">
        <h3>Prerequisites</h3>
        <div className="prerequisites-tags">
          <span className="prerequisite-tag">Algorithms</span>
          <span className="prerequisite-tag">Statistics</span>
        </div>
      </div>

      <button className="generate-btn" onClick={handleGenerateClick}>
        Generate Assessment
      </button>
    </div>
  );
};

export default TopicSelector;