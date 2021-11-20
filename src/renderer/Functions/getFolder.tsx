const { ipcRenderer } = window.require('electron');

interface FolderData {
  canceled: boolean;
  filePaths: [];
}

const getFolder = async (): Promise<FolderData> => {
  ipcRenderer.send('getFile');
  const folderPath: FolderData = await new Promise<FolderData>((resolve) => {
    ipcRenderer.on('setFile', async (event: any, data: FolderData) => {
      return resolve(data);
    });
  });
  return folderPath;
};
export default getFolder;
