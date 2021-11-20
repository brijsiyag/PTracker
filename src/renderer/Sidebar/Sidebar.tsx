import { Button } from '@mui/material';
import React, { ReactElement, useState } from 'react';
import getFolder from '../Functions/getFolder';
const fs = window.require('fs');
const marked = window.require('marked');
import './Sidebar.css';

interface FolderData {
  canceled: boolean;
  filePaths: any[];
}
interface DepArrSch {
  name: string;
  version: string;
}
interface Props {
  setReadmeData: any;
}

export default function Sidebar(props: Props): ReactElement {
  const [projectName, setProjectName] = useState<string>('=-=-=-=-=-=-=-=-=');
  const [depArray, setDepArray] = useState<DepArrSch[]>([]);
  const [projectPath, setProjectPath] = useState('');
  const [btnText, setBtnText] = useState('Open');
  const { setReadmeData } = props;
  const openDir = async () => {
    const dirPath: FolderData = await getFolder();

    if (dirPath.canceled) {
      return;
    }
    setReadmeData({
      module: 'Module Name',
      readmeData: '<h1>Please Select A Module......</h1>',
    });
    setBtnText('Open New');
    const tempProjectPath = dirPath.filePaths[0];
    setProjectPath(tempProjectPath);
    const dirArr = dirPath.filePaths[0].split('/');
    setProjectName(dirArr[dirArr.length - 1] || dirArr[dirArr.length - 2]);
    const pkgJsonPath = `${tempProjectPath}/package.json`;
    const pkgJson = window.require(pkgJsonPath);
    const tempDepArray: DepArrSch[] = [];
    Object.keys(pkgJson.dependencies).forEach((element: string) => {
      tempDepArray.push({
        name: element,
        version: pkgJson.dependencies[element],
      });
    });
    setDepArray(tempDepArray);
  };
  const readmeClicked = (module: any) => {
    fs.readFile(
      `${projectPath}/node_modules/${module.target.id}/README.md`,
      'utf-8',
      (err: string, readmeData: string): void => {
        if (err) {
          console.log(err);
          setReadmeData({
            module: module.target.id,
            readmeData: err,
          });
        } else {
          setReadmeData({
            module: module.target.id,
            readmeData: marked.parse(readmeData),
          });
        }
      }
    );
  };
  return (
    <div className="sidebar-container">
      <div className="sidebar-app-heading-container">
        <h1 className="sidebar-app-heading">PTracker</h1>
        <div className="sidebar-project-open-btn-container">
          <Button
            variant="outlined"
            className="sidebar-project-open-btn"
            onClick={openDir}
            style={{ fontSize: 'small' }}
          >
            {btnText}
          </Button>
        </div>
      </div>
      <div className="sidebar-header">
        <div className="sidebar-project-name">{projectName}</div>
      </div>
      <div className="sidebar-modules-container">
        <h2 style={{ margin: '5px auto', color: 'white' }}>Modules</h2>
        {depArray.map((element: DepArrSch) => {
          return (
            <Button
              color="success"
              variant="outlined"
              id={element.name}
              key={element.name}
              onClick={readmeClicked}
              style={{ justifyContent: 'flex-start' }}
            >
              {element.name}-{element.version}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
