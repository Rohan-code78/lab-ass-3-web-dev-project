import React, { useState } from 'react';
import './App.css';

// 1. Header Component
const Header = () => (
  <header className="header">
    <h1>Student Scoreboard</h1>
  </header>
);

// 2. Form Component
const AddStudentForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [score, setScore] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && score) {
      onAdd(name, score);
      setName('');
      setScore('');
    }
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input 
        placeholder="Student Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required 
      />
      <input 
        type="number" 
        placeholder="Score" 
        value={score} 
        onChange={(e) => setScore(e.target.value)} 
        required 
      />
      <button type="submit">Add Student</button>
    </form>
  );
};

// 3. Main App Component
export default function App() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Rohan', score: 95 },
    { id: 2, name: 'Rahul', score: 35 }
  ]);

  const addStudent = (name, score) => {
    setStudents([...students, { id: Date.now(), name, score: parseInt(score) }]);
  };

  const updateScore = (id, newScore) => {
    setStudents(students.map(s => 
      s.id === id ? { ...s, score: parseInt(newScore) || 0 } : s
    ));
  };

  return (
    <div className="main-wrapper">
      <Header />
      <AddStudentForm onAdd={addStudent} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>
                <input 
                  type="number" 
                  className="score-input"
                  value={s.score} 
                  onChange={(e) => updateScore(s.id, e.target.value)} 
                />
              </td>
              <td className={s.score >= 40 ? 'pass-text' : 'fail-text'}>
                {s.score >= 40 ? 'Pass' : 'Fail'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}