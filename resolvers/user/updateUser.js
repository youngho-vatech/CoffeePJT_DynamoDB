'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports =  (id,createdAt,username) => {
    
    const params = {
        TableName: process.env.TABLE_NAME, 
        Key: {id, createdAt},
        UpdateExpression: "set username = :username", // 어떤 걸 수정할지 정해줘야합니다.
            
        ExpressionAttributeValues: {  // 수정할 것의 값을 정해줘야합니다.
            ":username": username
        }
    };
    dynamoDb.update(params).promise().then(result => params.Item)
    return "이름이 변경되었습니다."
};