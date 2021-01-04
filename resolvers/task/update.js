'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports = (data, id) => {
    const params = {
        TableName: process.env.TABLE_NAME, 
        Key: {id},
        UpdateExpression: "set title = :menu", // 어떤 걸 수정할지 정해줘야합니다.
        ExpressionAttributeValues: {  // 수정할 것의 값을 정해줘야합니다.
            ":title": data.menu
        }
    };
    return dynamoDb.update(params).promise()
        .then(result => params.Item)
};