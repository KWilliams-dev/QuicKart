import fs from 'fs'
import { makeExecutableSchema } from 'graphql-tools'
import { graphql, useQuery } from 'graphql'

// the actual resolvers
import { resolvers } from '../model/items/index'
import {typeDefs} from '../model/items/index'


const GET_MAPS = gql`

    query GetAllMaps($getMapId: ID!) {
    
        getAllMaps {
        id
        title
        description
        aisle {
            xStartVal
            id
            number
            name
            bays
            yStartVal
            xEndVal
            yEndVal
        }
        }
    }

`



const allMapCases = {
    
    GET_MAPS,

    variables: { },

    // injecting the mock movie service with canned responses
    // context: { db },

    // expected result 
    expected: { data: { getMap: [
        {id: '1', title: '', description: "", aisle: {id: '', number: ' ', name: '', bays: '',
            xStartVal: '',  xEndVal: '', yStartVal: '', yEndVal: ''}, },

        {id: '1', title: '', description: "", aisle: {id: '', number: ' ', name: '', bays: '',
        xStartVal: '',  xEndVal: '', yStartVal: '', yEndVal: ''}}] } }
}


describe('My Test Cases', () => {
    // array of all test cases, just 1 for now
    const cases = [allMapCases]
    // reading the actual schema
    const typeDefs = fs.readFileSync('../model/items/index', 'utf8')
    // make the actual schema and resolvers executable
    const schema = makeExecutableSchema({ typeDefs, resolvers })
    
    // running the test for each case in the cases array
    cases.forEach(obj => {
        
        const { id, query, variables, context, expected } = obj

        test(`query: ${id}`, async () => {
            const result = await graphql(schema, query, null, context, variables)
            return expect(result).toEqual(expected)
        })
    })
})