// Loads in the AWS SDK
const AWS = require('aws-sdk');

// Creates the document client specifing the region 
// The tutorial's table is 'in us-east-1'
const ddb = new AWS.DynamoDB.DocumentClient({region: 'us-east-2'});

exports.handler = async (event, context, callback) => {
    // Captures the requestId from the context message
    const requestId = context.awsRequestId;
    
    var data="";
    if(event.number) {
        // Handle promise fulfilled/rejected states
        
       for (let aux = 0; aux < event.number; aux++) {
           
           let i = aux+1;
            if(isMultriplo(i,3)){
                if(isMultriplo(i,5)){
                    if(isMultriplo(i,7)){
                        data=data+" BigBangTheory";
                    }else{
                        data=data+" BigBang";
                    }
                }else if (isMultriplo(i,7)){
                     data=data+" BigTheory";
                }else{
                     data=data+" big";
                }
            }else if(isMultriplo(i,5)){
                if(isMultriplo(i,7)){
                        data=data+" BangTheory";
                    }else{
                        data=data+" bang";
                    }
            }else if(isMultriplo(i,7)){
                data=data+" theory";
            }else{
                data=data+" "+i;
            }
    }
        
        await saveRegistry(requestId, event, data).then(() => {
            callback(null, {
                statusCode: 200,
                body: 'Saved on database!!!',
                headers: {
                    'Access-Control-Allow-Origin' : '*'
                }
            });
        }).catch((err) => {
            console.error(err)
        })
    } else {
        callback(null, {
            statusCode: 400,
            body: 'Bad Request',
            headers: {
                'Access-Control-Allow-Origin' : '*'
            }
        });
    }
};

function isMultriplo(number1,number2){
    if(number1%number2==0){
        return true;
    }else{
        return false;
    }
}

// Function createMessage
// Writes message to DynamoDb table Message 
function saveRegistry(requestId, event, data) {
    
    const params = {
        TableName: 'LOGS',
        Item: {
            'entry' : requestId,
            'result' : data
        }
    }

    return ddb.put(params).promise();
}