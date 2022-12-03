// const { journeys, stations } = require('../dataset.js')
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLInt,
} = require('graphql')
const Journey = require('./models/Journey')
const Station = require('./models/Station')

const JourneyType = new GraphQLObjectType({
    name: 'Journey',
    fields: () => ({
        id: { type: GraphQLString },
        Departure: { type: GraphQLString },
        Return: { type: GraphQLString },
        Departure_station_id: { type: GraphQLInt },
        Departure_station_name: { type: GraphQLString },
        Return_station_id: { type: GraphQLInt },
        Return_station_name: { type: GraphQLString },
        Covered_distance_m: { type: GraphQLInt },
        Duration_sec: { type: GraphQLInt },
    }),
})

const StationType = new GraphQLObjectType({
    name: 'Station',
    fields: () => ({
        ID: { type: GraphQLInt },
        Nimi: { type: GraphQLString },
        Namn: { type: GraphQLString },
        Name: { type: GraphQLString },
        Osoite: { type: GraphQLString },
        Adress: { type: GraphQLString },
        Kaupunki: { type: GraphQLString },
        Stad: { type: GraphQLString },
        Operaattor: { type: GraphQLString },
        Kapasiteet: { type: GraphQLInt },
        x: { type: GraphQLString },
        y: { type: GraphQLString },
    }),
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        allJourneys: {
            type: new GraphQLList(JourneyType),
            resolve(parent, args) {
                // return journeys
                return Journey.find()
            },
        },
        findJourneyByDepature: {
            type: new GraphQLList(JourneyType),
            args: { departure: { type: GraphQLString } },
            resolve(parent, args) {
                // return journeys.find(
                //     (j) => j.Departure_station_name === args.departure
                // )
                return Journey.find({
                    Departure_station_name: args.departure,
                })
            },
        },
        findJourneyByReturn: {
            type: new GraphQLList(JourneyType),
            args: { return: { type: GraphQLString } },
            resolve(parent, args) {
                // return journeys.find(
                //     (j) => j.Return_station_name === args.return
                // )
                return Journey.find({ Return_station_name: args.return })
            },
        },

        stations: {
            type: new GraphQLList(StationType),
            resolve(parent, args) {
                // return stations
                return Station.find()
            },
        },
        findStationByCity: {
            type: new GraphQLList(StationType),
            args: { city: { type: GraphQLString } },
            resolve(parent, args) {
                return Station.find({ Kaupunki: args.city })
            },
        },
        findStationById: {
            type: StationType,
            args: { id: { type: GraphQLInt } },
            resolve(parent, args) {
                // return stations.find((station) => station.ID === args.id)
                return Station.findOne({ ID: args.id })
            },
        },
        findStationByName: {
            type: StationType,
            args: { name: { type: GraphQLString } },
            resolve(parent, args) {
                // return stations.find((station) => station.Name === args.name)
                return Station.findOne({ Name: args.name })
            },
        },
    },
})

module.exports = new GraphQLSchema({
    query: RootQuery,
})

//schema based on graphql-schema
