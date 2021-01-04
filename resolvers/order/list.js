'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = () => dynamoDb.query({ TableName: process.env.TABLE_NAME, ScanIndexForward: false })
    .promise()
    .then(r => r.Items);