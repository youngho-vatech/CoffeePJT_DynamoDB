'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (data) => {
    let id = data._id
    let createdAt = data.createdAtT
    let params = {
        TableName: process.env.TABLE_NAME,
        Key: { id, createdAt }
    };
    dynamoDb.delete(params).promise()

    id = data.userid
    createdAt = data.createdAtU
    params = {
        TableName: process.env.SUB_TABLE_NAME,
        Key: {id, createdAt},
        UpdateExpression: "set posit = :posit", // 어떤 걸 수정할지 정해줘야합니다.
        ExpressionAttributeValues: {  // 수정할 것의 값을 정해줘야합니다.
            ":posit": "주문자"
        }
    }
    dynamoDb.update(params).promise()


    return "게시글이 삭제 되었습니다."
};