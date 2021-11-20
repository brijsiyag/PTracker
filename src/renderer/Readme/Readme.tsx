import React, { ReactElement, useEffect } from 'react';
import './Readme.css';
interface TState {
  module: string;
  readmeData: string;
}
interface Props {
  readmeData: TState;
}
export default function Readme(props: Props): ReactElement {
  const { readmeData } = props;
  useEffect(() => {
    const readmeDiv = document.getElementById('readme-main')! as HTMLDivElement;
    readmeDiv.innerHTML = readmeData.readmeData;
    const anchors = document.querySelectorAll('a')!;
    anchors.forEach((element) => {
      element.setAttribute('target', '_blank');
    });
  }, [readmeData]);
  return (
    <div className="readme-container">
      <div className="readme-heading-container">
        <h1 className="readme-heading">{readmeData.module}</h1>
      </div>
      <div id="readme-main"></div>
    </div>
  );
}
