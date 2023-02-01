## GraphQL

- get : query
- mutation : delete, put, post
```
//호출
mutation  {
 postTweet(text: "hello",userId:"1") {
   text
 }
}

//server.js
  type Query {
    allTweets: [Tweet]
    tweet(id: ID): Tweet
  }

  type Mutation {
    postTweet(text: String, userId: ID): Tweet
    deleteTweet(id: ID): Boolean
  }
```
<br/>
<hr/>
<br/>

### !의미 

- 기본으로 Nullable 포함
```
 tweet(id: ID): Tweet
 
 tweet(id: ID): Tweet|null
 
```

- ! 넣을경우
```
  type Query {
    tweet(id: ID!): Tweet!
  }
  -> ID는 필수고 null이 아닌 무조건 Tweet을 return 한다
```

