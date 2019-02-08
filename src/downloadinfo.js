import { Platform } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';

const pathForAndroid = `${RNFetchBlob.fs.dirs.SDCardApplicationDir}/build_change_philippines.zip`;
const pathForIOS = `${RNFetchBlob.fs.dirs.DocumentDir}/build_change_philippines.zip`;
const path = Platform.OS === 'ios' ? pathForIOS : pathForAndroid;

export const filePaths = {
  pathForZip: path,
  pathForExtracted: path.replace('.zip', '')
};

export const platformSpecificConfigForDownload = Platform.OS === 'android' ? {
    addAndroidDownloads: {
        useDownloadManager: true,
        //changes here
        path,
        description: 'Images Zip',
        mediaScannable: true,
    }
} : {
  path
};
