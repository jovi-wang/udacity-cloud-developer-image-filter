import express, { Request, Response } from 'express';
import {
  filterImageFromURL,
  deleteLocalFiles,
  validateImageUrl,
} from './util/util';

(async () => {
  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the express.json() middleware for post requests
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  app.get('/filteredimage', async (req: Request, res: Response) => {
    try {
      const imageUrl = req.query.image_url as string;
      if (!(await validateImageUrl(imageUrl))) {
        return res.status(400).send({
          message:
            'image url is malformed, please make sure it is a valid image url',
        });
      }
      // console.log(imageUrl);
      const filteredPath = await filterImageFromURL(imageUrl);
      // console.log(filteredPath);
      res.sendFile(filteredPath, () => deleteLocalFiles([filteredPath]));
    } catch (error) {
      console.log(error);
      res.status(503).send({
        message: 'Opps, internal service unavailable, please try again later',
      });
    }
  });

  // Root Endpoint
  // Displays a simple message to the user
  app.get('/', (req: Request, res: Response) => {
    res.send('try GET /filteredimage?image_url={{}}');
  });
  // 404 Not Found
  app.use('/', (req: Request, res: Response) => {
    res.status(404).send({
      message: 'page not found, please try GET /filteredimage?image_url={{}}',
    });
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
