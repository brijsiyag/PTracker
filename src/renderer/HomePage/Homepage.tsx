import { ReactElement, useState, useEffect } from 'react';
import getFolder from '../Functions/getFolder';
import Sidebar from '../Sidebar/Sidebar';
import Readme from '../Readme/Readme';
import './Homepage.css';
interface TState {
  module: string;
  readmeData: string;
}
export default function Homepage(): ReactElement {
  const [readmeData, setReadmeData] = useState<TState>({
    module: 'Module Name',
    readmeData: '<h1>Please Select A Project......</h1>',
  });
  return (
    <div className="Homepage-main-container">
      <div className="Homepage-sidebar-container">
        <Sidebar setReadmeData={setReadmeData} />
      </div>
      <div className="Homepage-readme-container">
        <Readme readmeData={readmeData} />
      </div>
    </div>
  );
}
