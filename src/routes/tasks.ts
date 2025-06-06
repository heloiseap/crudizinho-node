import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from "zod";
import crypto from "node:crypto"

export async function tasksRoutes(app: FastifyInstance) {

    app.get('/', async () => {
        const tasks = await knex('tasks').select()
        return { tasks }
    })

    app.get('/:id', async (request) => {
        const getTaskParamsSchema = z.object({
            id: z.string().uuid()
        })
        const { id } = getTaskParamsSchema.parse(request.params)
        const task = await knex('tasks').where('id', id).first()
        return { task }
    })

    app.post('/', async (request, reply) => {
        const createTaskBodySchema = z.object({
            description: z.string(),
            date: z.string(),
            priority: z.enum([`high`, `medium`, `low`])
        })
        const { description, date, priority } = createTaskBodySchema.parse(request.body)

        await knex(`tasks`)
            .insert({
                id: crypto.randomUUID(),
                description,
                date,
                priority
            })

        return reply.status(201).send()
    })

    app.delete('/:id', async (request, reply) => {
        const getTaskParamsSchema = z.object({
            id: z.string().uuid()
        })
        const { id } = getTaskParamsSchema.parse(request.params)
        await knex('tasks').where('id', id).del()
        return reply.status(200).send()
    })

    app.put('/:id', async (request, reply) => {
        const getTaskParamsSchema = z.object({
            id: z.string().uuid()
        })
        const createTaskBodySchema = z.object({
            description: z.string(),
            date: z.string(),
            priority: z.enum([`high`, `medium`, `low`])
        })
        const { description, date, priority } = createTaskBodySchema.parse(request.body)
        const { id } = getTaskParamsSchema.parse(request.params)
        await knex('tasks').where('id', id).update({
                description,
                date,
                priority
        })
        return reply.status(200).send()
    })
}