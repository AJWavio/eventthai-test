# Project Configuration
Documentation for environment variable configuration for the project.

## Server Configuration
```env
NODE_ENV=DEVELOPMENT #Environment type
SERVER_PORT=3000 #Server port
SERVER_IS_ENABLE_DOCS=true #Enable OpenApi document route
```

## Database Configuration
```env
DB_PROTOCOL=mongodb #Protocol used to connect to mongodb
DB_HOST=localhost #MongoDB host url
DB_PORT=27017 #MongoDB host port
DB_USERNAME=root #MongoDB username
DB_PASSWORD=s0meSecurePwd #MongoDB password
DB_NAME=dev #MongoDB target database
DB_AUTH_SOURCE=admin #MongoDB auth source
```

## API Route Configuration
```env
API_ROOT_COUNTRY=country #Root of country route
API_ROOT_USER=user #Root of user route
```

## Auth Configuration
```env
USER_JWT_SECRET=CkVie492!awW #Jwt secret
USER_JWT_EXPIRE=1d #Jwt token expireIn duration
```
