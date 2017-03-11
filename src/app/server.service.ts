import {Component, Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {DynamoDB} from 'aws-sdk';

@Injectable()
@Component({})
export class GitHubService {
  url = 'https://um7sfkonal.execute-api.us-west-2.amazonaws.com/hack';
  tableName = 'swhack';
  dynamo = new DynamoDB();

  constructor(private http: Http) {
    console.log("Dynamo connection is functioning...");
  }

  select(id: string) {
    let dynamoQueryObj = {
      "TableName": this.tableName,
      "Key": {
        "id": {
          "S": id
        }
      }
    };
    this.dynamo.getItem(dynamoQueryObj, (err, data) => {
      if (err) {
        console.log("Error: " + err);
      } else {
        console.log("Success: " + data);
      }
    });
  }

  insert(obj: any) {
    let dynamoInsertObj = {
      "TableName": this.tableName,
      "Item": {}
    };

    Object.keys(obj).forEach((key) => {
      if (key === 'username') {
        dynamoInsertObj.Item["id"] = {"S": obj[key]};
      } else {
        dynamoInsertObj.Item[key] = {"S": obj[key]};
      }
    });

    this.dynamo.putItem(dynamoInsertObj, (err, data) => {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log('Success: ' + data);
      }
    });
  }

}
