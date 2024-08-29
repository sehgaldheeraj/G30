const path = require('path');
const fs = require('fs/promises');
const todosDbPath = path.join(__dirname, '..' , 'models', 'todos.json');

class Todos {
    static addTodo = (newTodo) => {
        return new Promise(async (resolve, reject) => {
            try{
                const data = await fs.readFile(todosDbPath);
                const todos = JSON.parse(data);
                todos.push(newTodo);
                await fs.writeFile(todosDbPath ,JSON.stringify(todos));
                resolve(todos);

            }catch(err){
                reject(err);
            }
        })
    } 
}
module.exports = Todos;