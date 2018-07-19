// using fetch  pck to get data from goodreads api
const fetch = require('node-fetch');


const util = require('util');
const parseXML = util.promisify(require('xml2js').parseString);

// fetch(
//     "https://www.goodreads.com/author/show.xml?id=4432&key=vdA3VLehjWEF3lhXEdfzvQ"
// ).then(
//     response => response.text()
// ).then(
//     parseXML
// )
// defining a graphql new object
const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString
} = require('graphql');

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'The name of the object is defined up above',
    fields: () => ({
        name: {
            type: GraphQLString,
            resolve: xml => xml.GoodreadsResponse.author[0].name[0]
        }
           
    })
})

// defining a graphql schema
module.exports =  new  GraphQLSchema({
    query: new GraphQLObjectType({
        // the name below is gonna be the query name to access this schema
        name: 'Query',
        description: 'This is the first Query',
        // All teh attributes up above aren't part of the query data
        // whatever is inside the fields function is gonna be the API data structure
        fields: () => ({
            author: {
                type: AuthorType,
                args: {
                    id: {type: GraphQLInt},
                },
                resolve: (root, args) => fetch(
                    `https://www.goodreads.com/author/show.xml?id=${args.id}&key=vdA3VLehjWEF3lhXEdfzvQ`
                ).then(
                    response => response.text()
                ).then(
                    parseXML
                )
            }
        })
    })
})
