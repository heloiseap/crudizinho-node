import { Knex } from 'knex'

declare module 'knex/types/tables' {
    export interface Tables {
        tasks: {
            id: string
            description: string
            date: string
            priority: string
        }
    }
}