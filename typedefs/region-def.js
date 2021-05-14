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
        landmarks: [Landmark]
        child: [String]
    }

    type Landmark{
        _id: String!
        region: String!
        name: String!
    }
    
    extend type Query{
        getHomeMapList: [Region]
        getLandmark(_id: String!): [Landmark]
    }

    extend type Mutation{
        addMapList(region: RegionInput!): Region
        removeMapList(_id:String!): Region
        updateMapList(_id:String!, field:String!, value:String!): String
        sortMapList(_id:String!, field:String!): [String]
        addLandmark(_id:String!, text:String!): Boolean
        removeLandmark(_id:String!, text:String!): Boolean
        editLandmark(_id:String!, prevText:String!, targetText:String!): Boolean
        moveMapTop(_id:String!): Boolean
    }

    input RegionInput{
        _id: String
        owner: String
        parent: String
        name: String
        capital: String
        leader: String
        sortDirection: Int
        landmarks: [LandmarkInput]
        child: [String]
    }

    input LandmarkInput{
        _id: String
        region: String
        name: String
    }
`;
module.exports = { typeDefs: typeDefs }