export function up(knex) {
  return knex.schema.createTable('Comments', (table) => {
    table.increments().primary()
    table.integer('post_id').references('Posts.id')
    table.date('date_posted')
    table.string('comment')
  })
}

export function down(knex) {
  return knex.schema.dropTable('Comments')
}

// Previous functions
// exports.up = (knex) => {
//   return knex.schema.createTable('Comments', (table) => {
//     table.increments().primary()
//     table.integer('post_id').references('Posts.id')
//     table.date('date_posted')
//     table.string('comment')
//   })
// }

// exports.down = (knex) => {
//   return knex.schema.dropTable('Comments')
// }
