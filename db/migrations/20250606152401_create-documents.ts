import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('tasks', (table) => {
        table.uuid('id').primary()
        table.text('description').notNullable()
        table.text('date').notNullable()

    } )
}


export async function down(knex: Knex): Promise<void> {
}

