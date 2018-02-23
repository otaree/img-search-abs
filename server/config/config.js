let env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    process.env.MONGODB_URI = 'mongodb://localhost/search-img';
} else if (env === 'test') {
    process.env.MONGODB_URI = 'mongodb://localhost/search-img-test';
}