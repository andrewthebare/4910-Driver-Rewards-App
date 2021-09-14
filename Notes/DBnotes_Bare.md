#### Link: https://www.youtube.com/watch?v=cepspxPAUTA
# Schema Design
- Avoid Duplicates
  - Video Suggests grouping similar things together as data types and then using each type to serve up a full query
- Keep tables unique
  - this means all cutomer tables have only information pertaining to a customer, no other stuff
- We then define relationships between our small tables
  - EX: An order table entry would have store a small identifier of both the product ordered and the customer who ordered it, then the DB can fetch the details about that customer with that id
    - Primary Key: The main identifier for a table
    - Foreign key: a key from another table that is used as a reference to the table that it is from
    - ex above, a customer id found inside an order table entry

#### Link: https://www.youtube.com/watch?v=9ylj9NR0Lcg
# SQL 

### Facts
- Relational database
- Can use mysql Workbench as a virtual viewer
- Syntax is generally all caps

### Query
- CREATE TABLE 
  - ex CREATE TABLE users('name' TYPE Paramaters, etc)
- DROP TABLE 
  - Eliminate table
- 