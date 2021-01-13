'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports = (data) => {
    let id = data._id
    let createdAt = data.createdAt
    let title = data.title
    const params = {
        TableName: process.env.TABLE_NAME, 
        Key: {id, createdAt},
        UpdateExpression: "set title = :title", // 어떤 걸 수정할지 정해줘야합니다.
        ExpressionAttributeValues: {  // 수정할 것의 값을 정해줘야합니다.
            ":title": title
        }
    };
    return dynamoDb.update(params).promise()
        .then(result => params.Item)
};