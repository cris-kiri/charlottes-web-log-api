export function up(knex) {
  return knex.schema.createTable('Posts', (table) => {
    table.increments().primary()
    table.string('title')
    table.date('date_created')
    table.string('text')
  })
}

export function down(knex) {
  return knex.schema.dropTable('Posts')
}

// Previous functions
// exports.up = (knex) => {
//   return knex.schema.createTable('Posts', (table) => {
//     table.increments().primary()
//     table.string('title')
//     table.date('date_created')
//     table.string('text')
//   })
// }

// exports.down = (knex) => {
//   return knex.schema.dropTable('Posts')
// }
