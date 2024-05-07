const ENV = {
  NODE_ENV: process.env.NODE_ENV,

  PORT: process.env.PORT,

  //   S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
  //   S3_BUCKET_REGION: process.env.S3_BUCKET_REGION,
  //   S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
  //   S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,

  //   DATABASE_HOST: process.env.DATABASE_HOST,
  //   DATABASE_DATABASE: process.env.DATABASE_DATABASE,
  //   DATABASE_USER: process.env.DATABASE_USER,
  //   DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  //   DATABASE_PORT: process.env.DATABASE_PORT,
  CONNECTION_STRING: process.env.CONNECTION_STRING,

  // JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};

export function validateEnv() {
  console.log("ENV", ENV);

  const nulledKeys = [];

  for (const [k, v] of Object.entries(ENV)) {
    if (!v) nulledKeys.push(k);
  }

  if (nulledKeys.length > 0) {
    console.log(nulledKeys);
  }

  return nulledKeys.length === 0;
}

export const CONNECTION_STRING = ENV.CONNECTION_STRING;
export const PORT = ENV.PORT;

// export const S3_BUCKET = {
//     NAME: ENV.S3_BUCKET_NAME,
//     REGION: ENV.S3_BUCKET_REGION,
//     getBaseUrl(bucketName) {
//       return `https://${bucketName || this.NAME}.s3-${this.REGION}.amazonaws.com`;
//     },
//     PROFILE_PICS_FOLDER: 'profile-pics',
//     NFTS_FOLDER: 'nfts',
//     APP: 'app',
//     ACCESS_KEY: ENV.S3_ACCESS_KEY_ID,
//     SECRET_ACCESS_KEY: ENV.S3_SECRET_ACCESS_KEY,
//   };

// export const DATABASE = {
//     HOST: ENV.DATABASE_HOST,
//     DATABASE: ENV.DATABASE_DATABASE,
//     USER: ENV.DATABASE_USER,
//     PASSWORD: ENV.DATABASE_PASSWORD,
//     PORT: parseInt(ENV.DATABASE_PORT),
//   };
