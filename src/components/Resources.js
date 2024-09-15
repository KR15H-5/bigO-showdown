import React from 'react';
import { Link } from 'react-router-dom';
import './Resources.css';

const Resources = () => {
  const resources = [
    {
      title: "Big O Notation Explained",
      url: "https://www.freecodecamp.org/news/big-o-notation-why-it-matters-and-why-it-doesnt-1674cfa8a23c/",
      description: "A comprehensive guide to understanding Big O notation and its importance in programming."
    },
    {
      title: "Visualizing Algorithms",
      url: "https://visualgo.net/en",
      description: "Interactive visualizations of various algorithms and data structures."
    },
    {
      title: "Big O Cheat Sheet",
      url: "https://www.bigocheatsheet.com/",
      description: "A quick reference for common data structures and their time complexities."
    },
    {
      title: "Algorithms in JavaScript",
      url: "https://github.com/trekhleb/javascript-algorithms",
      description: "A GitHub repository with implementations of various algorithms in JavaScript."
    },
    {
        title: "Introduction to Algorithms",
        url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/",
        description: "MIT OpenCourseWare's free course on algorithms, covering time complexity and more."
      },
  ];

  return (
    <div className="resources">
      <h1>Learning Resources</h1>
      <p>Improve your understanding of Big O notation and algorithmic complexity with these resources:</p>
      <ul>
        {resources.map((resource, index) => (
          <li key={index}>
            <h3><a href={resource.url} target="_blank" rel="noopener noreferrer">{resource.title}</a></h3>
            <p>{resource.description}</p>
          </li>
        ))}
      </ul>
      <Link to="/" className="back-button">Back to Main Menu</Link>
    </div>
  );
};

export default Resources;