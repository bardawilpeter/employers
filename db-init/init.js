db.createUser({
    user: "employer",
    pwd: "test123",
    roles: [ { role: "readWrite", db: "employers" } ]
  })
  
  db.users.insert({
    name: "employer"
  })