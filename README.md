# udacity-cloud-developer-image-filter

## this is one of the assignment project in the Udacity Cloud Developer nano degree

This project is built on expressjs(node.js), and deployed on AWS Elastic Beanstalk, the purpose of this API is to process an given image url, and render the filtered and resized image.

sample image urls:
`https://upload.wikimedia.org/wikipedia/commons/b/bd/Golden_tabby_and_white_kitten_n01.jpg`

`https://images.unsplash.com/photo-1654590905767-d41fbc609238?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3570&q=80`

### Requirements

- Node installed
- postman installed
- AWS account

### development env set up

```node.js
npm install

npm run dev
```

the local server listens to port 8082 by default

### endpoints

1. a general health check endpoint, return 200 (OK)

```
GET /
```

2. filter image endpoint
   - return 503 (Service Unavailable) when internal error occurs
   - return 400 (Bad Request) when the image_url is invalid
   - return 200 (OK) with filtered image

```
GET /filterimage?image_url={{URL}}
```

3. a generic 404 error handler, return 404 (Not Found) when the request url is not registered in the server e.g. `GET /abc`

### sample requests

1. GET /

![GET /](/deployment_screenshots/dev-health-check.png)

2. GET /abcd

![GET /abcd](/deployment_screenshots/dev-404.png)

3. GET /filteredimage?image_url=abcd

![GET /filteredimage?image_url=abcd](/deployment_screenshots/dev-400.png)

4. GET /filteredimage?image_url=https://upload.wikimedia.org/wikipedia/commons/b/bd/Golden_tabby_and_white_kitten_n01.jpg

![GET /filteredimage?image_url=](/deployment_screenshots/dev-200-1.png)

5. GET /filteredimage?image_url=https://images.unsplash.com/photo-1654590905767-d41fbc609238?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3570&q=80

![GET /](/deployment_screenshots/dev-200-2.png)

### deploy

1. execute `npm run build` in terminal to compile typescript into javascript and generate archive.zip file
2. using elasbeanstalk cli to init, create and deploy the application

```
eb init
eb create
eb deploy
```

3. you can also manually create an application and upload zip file in AWS management console

## deployment screenshots

1. overview
   ![GET /](/deployment_screenshots/deploy-1.png)
   ![GET /](/deployment_screenshots/deploy-2.png)
2. return filtered images
   ![GET /](/deployment_screenshots/deploy-3.png)
   ![GET /](/deployment_screenshots/deploy-4.png)
