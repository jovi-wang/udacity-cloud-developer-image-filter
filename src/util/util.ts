import fs from 'fs';
import axios from 'axios';
import Jimp from 'jimp';
// const Jimp = require('jimp');

const isImageURL = require('image-url-validator').default;

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'get',
        url: inputURL,
        responseType: 'arraybuffer',
      });
      const photo = await Jimp.read(response.data);
      const outpath =
        '/tmp/filtered.' + Math.floor(Math.random() * 2000) + '.jpg';
      await photo
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(__dirname + outpath, () => {
          resolve(__dirname + outpath);
        });
    } catch (error) {
      reject(error);
    }
  });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files: Array<string>) {
  for (let file of files) {
    fs.unlinkSync(file);
  }
}

export const validateImageUrl = async (imageUrl: string): Promise<boolean> => {
  const value1 = await isImageURL(imageUrl);
  const value2 =
    imageUrl.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim) !==
    null;
  return value1 || value2;
};
