import { createRoot } from 'react-dom/client';

import PersonManager from './PersonManager';
// import TestManager from './TestManager';

import './index.css';
import './styles/borders.css';
import './styles/colors.css';
import './styles/fonts.css';
import './styles/heights.css';
import './styles/margins.css';
import './styles/misc.css';
import './styles/paddings.css';
import './styles/text.css';
import './styles/widths.css';

import 'primeflex/primeflex.css';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<PersonManager />);
