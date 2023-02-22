import { ApolloServer, gql } from "apollo-server";
import fetch from "node-fetch";

const tweets = [
  {
    id: "1",
    text: "hello first",
    userId: "2",
  },
  {
    id: "2",
    text: "hello second",
    userId: "2",
  },
];
let users = [
  {
    id: "1",
    firstName: "100",
    lastName: "dong",
  },
  {
    id: "2",
    firstName: "1001",
    lastName: "dong3",
  },
];

//SDL
const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    fullName: String!
  }
  """
  Tweet object represents a resource for a Tweet 설명이 가능하다
  """
  type Tweet {
    id: ID!
    text: String!
    author: User
  }
  type Query {
    """
    all 유저~~
    """
    allUsers: [User!]!
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
    allMovies: [Movie!]!
    movie(id: String!): Movie
  }

  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }

  type Movie {
    id: Int!
    url: String!
    imdb_code: String!
    title: String!
    medium_cover_image: String!
    rating: String!
  }
`;
const resolvers = {
  Query: {
    allMovies() {
      return fetch("https://yts.mx/api/v2/list_movies.json")
        .then((r) => r.json())
        .then((json) => json.data.movies);
    },
    movie(_, { id }) {
      return fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        .then((r) => r.json())
        .then((json) => {
          return json.data.movie;
        });
    },
    allUsers() {
      return users;
    },

    allTweets() {
      return tweets;
    },
    tweet(root, { id }) {
      return tweets.find((data) => data.id === id);
    },
  },
  User: {
    fullName({ firstName, lastName }) {
      return `${firstName} ${lastName}`;
    },
  },
  Tweet: {
    author({ userId }) {
      return users.find((user) => user.id === userId);
    },
  },

  Mutation: {
    postTweet(_, { text, userId }) {
      const newTweet = {
        id: tweets.length + 1,
        text,
      };
      tweets.push(newTweet);
      return newTweet;
    },
    deleteTweet(_, { id }) {
      const tweet = tweets.find((data) => data.id === id);
      if (!tweet) {
        return false;
      }
      tweets.filter((tweet) => tweet.id !== id);
      return true;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`running on ${url}`);
});
