const { gql }= require('apollo-server');

const typeDefs = gql `
    type Region{
        _id: String!
        owner: String!
        parent: String!
        name: String!
        capital: String!
        leader: String!
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
    extend type Query{
        getHomeMapList: [Region]
        getMapList: Region
    }
    extend type Mutation{
        addMapList(region: regionInput!): Region
        removeMapList(_id:String!): Boolean
        updateMapList(_id:String!, field:String!, value:String!): String
        sortMapList(ss_id:String!, field:String!): [Region]
        addLandMark(ss_id:String!, text:String!):Boolean
        removeLandMark(ss_id:String!, text:String!):Boolean
    }
    input regionInput{
        _id: String
        owner: String
        parent: String
        name: String
        capital: String
        leader: String
        landmarks: [String]
        child: [String]
    }
`;
module.exports = { typeDefs: typeDefs }