# AppmanAPI 
## Appman Internship
## Veeraphat Lewcharoensakkul 
## King Mongkut's University of Technology Thonburi (SIT)
## Start - 22 Dec 2020 
## Finish - 24 Dec 2020
## DB :
เก็บข้อมูลของนักศึกษา รหัสนักศึกษา, ชื่อ-สกุล, ศึกษาปริญญาตรี และ ปริญญาโทที่ไหน

```
studentdb.json 
[
    {
        "id": "61130500096",
        "name": "Veeraphat",
        "surname" : "Lewcharoensakkul",
        "bachelor": "ku",
        "master": "kmutt"
        }
    ,
    {
        "id": "61130500085",
        "name": "Rattanakorn",
        "surname" : "Woothicart",
        "bachelor": "cu",
        "master": "kmutt"
    },
    {
        "id": "61130500008",
        "name": "Kewalin",
        "surname" : "Intharakamhang",
        "bachelor": "kmutt",
        "master": "ku"
    },
    {
        "id": "61130500045",
        "name": "Panthip",
        "surname" : "Kladsombat",
        "bachelor": "cu",
        "master": "ku"
    }
]
```
เก็บข้อมูลของมหาลัย
```
universitydb.json 
[
    {
        "id": "kmutt",
        "name": "King Mongkut's University of Technology Thonburi"
    },
    {
        "id": "ku",
        "name": "Kasetsart University"
    },
    {
        "id": "cu",
        "name": "Chulalongkorn University"
    }
]
```
## API : โดยผมใช้โปรแกรม Postman ในการทดสอบ
### students
เป็นการ return ข้อมูลของนักศึกษาทั้งหมด โดยการพิม localhost:3000/students แบบ GET
```
app.get('/students', (req, res) => {
    res.json(students)
})
```
เป็นการ return ข้อมูลของนักศึกษาแบบมีเงื่อนไข โดยเงื่อนไขคือ return ข้อมูลของนักศึกษาที่มี id ตรงกับใน database โดยการพิม localhost:3000/students/61130500096(Ex.) แบบ GET
```
app.get('/students/:id', (req, res) => {
    res.json(students.find(student => student.id === req.params.id))
})
```
เป็นการ เพิ่มนักศึกษา โดยการพิม localhost:3000/students แบบ POST เพิ่มข้อมูลลงใน Body แล้วกด Send
```
app.post('/students', (req, res) => {
    students.push(req.body)
    res.status(201).json(req.body)
})
```
เป็นการ แก้ไขข้อมูลของนักศึกษาที่ id ตรงกับใน database โดยการพิม localhost:3000/students/61130500096(Ex.) 
แบบ PUT แก้ไข้ข้อมูลลงใน Body แล้วกด Send
```
app.put('/students/:id', (req, res) => {
    const updateIndex = students.findIndex(student => student.id === req.params.id)
    res.json(Object.assign(students[updateIndex], req.body))
})
```
เป็นการ ลบข้อมูลของนักศึกษาที่ id ตรงกับใน database โดยการพิม localhost:3000/students/61130500096(Ex.) แบบ DELETE
```
app.delete('/students/:id', (req, res) => {
    const deletedIndex = students.findIndex(student => student.id === req.params.id)
    students.splice(deletedIndex, 1)
    res.status(204).send()
})
```
### universities
เป็นการ return ข้อมูลของมหาวิทยาลัยทั้งหมด โดยการพิม localhost:3000/universities แบบ GET
```
app.get('/universities', (req, res) => {
    res.json(universities)
})
```
เป็นการ return ข้อมูลของมหาวิทยาลัยว่ามีนักศึกษาคนไหนศึกษาอยู่ที่มหาวิทยาลัยนี้บ้าง โดยเงื่อนไขคือ return ข้อมูลของมหาวิทยาลัยที่มี id ตรงกับใน database 
โดยการพิม localhost:3000/universities/kmutt(Ex.) แบบ GET

```
app.get('/universities/:id', (req, res) => {
    var bachelor = [];
    bachelor = students.filter(student => student.bachelor === req.params.id);
    var master = [];
    master = students.filter(student => student.master === req.params.id);
    var university = universities.find(university => university.id === req.params.id);
    res.json({
        university, bachelor, master
    });
})

```
เป็นการ เพิ่มมหาวิทยาลัย โดยการพิม localhost:3000/universities แบบ POST เพิ่มข้อมูลลงใน Body แล้วกด Send
```
app.post('/universities', (req, res) => {
    universities.push(req.body)
    res.status(201).json(req.body)
})
```
เป็นการ แก้ไขข้อมูลของมหาวิทยาลัยที่ id ตรงกับใน database โดยการพิม localhost:3000/universities/kmutt(Ex.) แบบ PUT 
แก้ไข้ข้อมูลลงใน Body แล้วกด Send
```
app.put('/universities/:id', (req, res) => {
    const updateIndex = universities.findIndex(university => university.id === req.params.id)
    res.json(Object.assign(universities[updateIndex], req.body))
})
```
เป็นการ ลบข้อมูลของมหาวิทยาลัยที่ id ตรงกับใน database โดยการพิม localhost:3000/students/kmutt(Ex.) แบบ DELETE
```
app.delete('/universities/:id', (req, res) => {
    const deletedIndex = universities.findIndex(university => university.id === req.params.id)
    universities.splice(deletedIndex, 1)
    res.status(204).send()
})

```
