const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/people');

  const PersonSchema = new mongoose.Schema({
      name: String,
      age: Number,
      job: String,
  })

  PersonSchema.methods.sayHello = function sayHello(){
      console.log(`Hey, I'm ${this.name}`)
  }
  PersonSchema.methods.presentSelf = function presentSelf(){
    console.log(`I'm ${this.age} years old and I work as an ${this.job}`)
  }

  const Person = new mongoose.model("Person", PersonSchema)

  const joao = new Person({
      name: "João",
      age: 25,
      job: "Engineer"
  })

  await joao.save()

  joao.sayHello()
  joao.presentSelf()

  const people = await Person.find()
  console.log(people)
}