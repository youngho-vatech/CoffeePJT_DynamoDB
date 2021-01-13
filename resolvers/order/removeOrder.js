'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (id, createdAt) => {
    const params = {
        TableName: process.env.TABLE_NAME,
        Key: { id , createdAt}
    };
    dynamoDb.delete(params).promise().then(result => true)
    return "주문이 삭제 되었습니다."
};