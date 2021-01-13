'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports =  (ids,createdAts) => {
    for (let i = 0; i < ids.length; i++) {
        const id = ids[i]
        const createdAt = createdAts[i]
        const params = {
            TableName: process.env.TABLE_NAME, 
            Key: {id, createdAt},
            UpdateExpression: "set posit = :posit", // 어떤 걸 수정할지 정해줘야합니다.
            
            ExpressionAttributeValues: {  // 수정할 것의 값을 정해줘야합니다.
                ":posit": "주문자"
            }
        };
         dynamoDb.update(params).promise().then(result => params.Item)
        
    }
    
    return "해당 인원은 주문자로 다시 바뀌었습니다."
};