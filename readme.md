# Project Title: Image Compressor Assignment

## Description
This project is an image compression service that allows users to upload CSV files containing image data for processing. The service utilizes a queue system for handling requests and provides status updates for each processing request.

## Installation Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/nullfox-coder/Image-Compressor.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Image-Compressor
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. create a .env file with the following format:

```
MONGODB_URI=xyz
CLOUDINARY_CLOUD_NAME=xyz
CLOUDINARY_API_KEY=xyz
CLOUDINARY_API_SECRET=xyz
PORT=8000
```

## Usage Instructions
To run the application, use the following command:
```bash
npm start
```
For development, you can use:
```bash
npm run dev
```

## API Endpoints
- **POST /upload**: Upload a CSV file for processing.
  - Request Body: 
    - `webhookUrl`: (optional) URL to send notifications upon completion.
  - Response: 
    - `requestId`: Unique identifier for the processing request.

- **GET /status/:requestId**: Check the status of a processing request.
  - Response: 
    - `status`: Current status of the request.
    - `products`: List of processed products (if any).
    - `createdAt`: Timestamp of when the request was created.
    - `completedAt`: Timestamp of when the request was completed (if applicable).

## Dependencies
- **axios**: For making HTTP requests.
- **bull**: For handling job queues.
- **cloudinary**: For image storage and management.
- **csv-parser**: For parsing CSV files.
- **dotenv**: For loading environment variables.
- **express**: The web framework for building the API.
- **mongoose**: For MongoDB object modeling.
- **multer**: For handling multipart/form-data, used for file uploads.
- **sharp**: For image processing.
- **uuid**: For generating unique identifiers.
- **winston**: For logging.


## I have Deployed my backend here(GCP) -

```
http://34.46.28.212:8000
```

# System Architecture
![System Architecture](hld.drawio.svg)

# Component Level Architecture
![Component Level Architecture](lld.drawio.svg)


# CURL -

## I have attached a sample_test_data.csv in my dir to test Just download the file and test with the given curl

 ## Upload
```
curl --location 'http://34.46.28.212:8000/api/upload' \
--form 'csv=@"/C:/Users/User/Downloads/sample_test_data.csv"'
```

## CheckStatus
```
curl --location 'http://34.46.28.212:8000/api/status/89652507-c97a-43d1-8dd1-03a74e15d473'
```
# Detailed System Architecture
![Detailed System Architecture](system.drawio.svg)


# Implmentation
![Implmentation](implementation.drawio.svg)


#### happy coding @nullfox-coder