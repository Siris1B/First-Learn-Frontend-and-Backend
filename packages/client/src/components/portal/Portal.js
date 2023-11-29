import { createPortal } from 'react-dom';
import './portal.css';

export default function Portal({ children }) {
  const node = document.createElement('div');
  node.classList.add('absolute', 'left-[-100%]', 'bottom-16', 'dragFromLeft');
  document.body.appendChild(node);
  return createPortal(children, node);
}
