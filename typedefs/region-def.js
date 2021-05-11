const { gql }= require('apollo-server');

const typeDefs = gql `
    type Region{
        _id: String!
        owner: String!
        parent: String!
        name: String!
        capital: String!
        leader: String!
        sortDirection: Int!
        landmarks: [String]
        child: [String]
    }
    type Subregion{
        _id: String!
        owner: String!
        parent: String!
        name: String!
        capital: String!
        leader: String!
        landmarks: [String]
    }
    type LandmarkTuple{
        landmark: String!
        current: Boolean!
    }
    extend type Query{
        getHomeMapList: [Region]
        getMapList: Region
        getLandmark(_id: String!): [LandmarkTuple]
    }
    extend type Mutation{
        addMapList(region: regionInput!): Region
        removeMapList(_id:String!): Boolean
        updateMapList(_id:String!, field:String!, value:String!): String
        sortMapList(_id:String!, field:String!): [String]
        addLandmark(_id:String!, text:String!): Boolean
        removeLandmark(ss_id:String!, text:String!): Boolean
        moveMapTop(_id:String!): Boolean
    }
    input regionInput{
        _id: String
        owner: String
        parent: String
        name: String
        capital: String
        leader: String
        sortDirection: Int
        landmarks: [String]
        child: [String]
    }
`;
module.exports = { typeDefs: typeDefs }