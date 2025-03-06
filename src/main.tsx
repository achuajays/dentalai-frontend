
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add hover-scale utility class
document.head.insertAdjacentHTML("beforeend", `
  <style>
    .hover-scale {
      transition: transform 0.2s ease-out;
    }
    .hover-scale:hover {
      transform: scale(1.05);
    }
    .story-link {
      position: relative;
      display: inline-block;
    }
    .story-link::after {
      content: '';
      position: absolute;
      width: 100%;
      transform: scaleX(0);
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: currentColor;
      transform-origin: bottom right;
      transition: transform 0.3s ease-out;
    }
    .story-link:hover::after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
  </style>
`);

createRoot(document.getElementById("root")!).render(<App />);
