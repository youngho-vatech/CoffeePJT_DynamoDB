'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = () => {
    const orders = await dynamoDb.scan({ TableName: process.env.TABLE_NAME }).promise();
    const tasks = await dynamoDb.scan({ TableName: process.env.THIRD_TABLE_NAME }).promise();

    for (let i = 0; i < orders.length; i++) {
        let id = orders[i].id
        let createdAt = orders[i].createdAt
        const params = {
            TableName: process.env.TABLE_NAME,
            Key: { id , createdAt}
        };
        dynamoDb.delete(params).promise().then(result => true)
    }
    for (let i = 0; i < tasks.length; i++) {
        let id = tasks[i].id
        let createdAt = tasks[i].createdAt
        const params = {
            TableName: process.env.THIRD_TABLE_NAME,
            Key: { id , createdAt}
        };
        dynamoDb.delete(params).promise().then(result => true)
        
    }

    return "주문이 완료되었습니다. 맛있게 드세요!"
};