// Day-39

// Date: 24/04/2026
// Task: Learned about mongoDB enige as it uses WiredTiger to store data. Watched all videoes explaining replication in-depth from a learning.mongodb source as learned how actually replication works, what if primary node goes down, how the all nodes elect a node to be most eligible to become primary, how failover works, what oplog and what it stores how secondary nodes retrieve infos from primary. Also did a task given by hiten sir as did 6 games entry into yudiz portfolio site with gathering data for it.


// MongoDB uses "WiredTiger" as Storage Engine

// _____________________________________________________

// replicaSet and sharding
// mongoDB engine
// write concern read concern
// retrieve

// _____________________________________________________


// Replication :::

// Benefits

// Replication is process of storing multiple copies of data keeping them synchronous againsts the different servers, this provides fault tolerance against a single server, In  mongoDB we call this group of servers a replica set

// Each database instance within a replica set is called a replica set member

// Replica Set provides many Benefits such as high availability, fault tolerence, data durability.

// High availability
// -- The concept of making sure that our data can be continuesly accessed, even if there's a lack of availability in a system

// Replication is the process of storing multiple copies of data on different servers.

// MongoDB replica sets:

// Commonly consists of 3,5, or 7 mongod instances (members)

// Can have a maximum of 50 members, with a maximum of 7 voting members.

// this mongod instances are run on servers which can also be refered as nodes

// Each replica Set contain a single primary and multiple secondary nodes

// The primary is the only member in the replica set that receives write operations.

// By default, the primary handles all read operations

// The default read behaviour can be changed so that secondary members handle read operations.

// A secondary is a replica set member that replicates the contents of the primary member.

// It duplicates the primary's oplog entries and applies the operations to their own datasets.

// if the primary goes down then the election will occur, election determines that which node of intance of secondary will be most suitable to become a primary, then the choosen one will take place of primary and remained secondary will follow this primary, and the node which privously is primary and down if it whenever be available then it take position as secondary and fetches all the operations which happend in primary during it's down time.

// Failover: it is this process of electing a secondary to become a primary.
// It is intiated automatically when the primary node of a replica set becomes unavailable.

// How elections work in MongoDB

// The member that receives the majority of votes from voting members is the winner.

// An Election may be initiated with variety of events
// such as
// Adding a new node to replicaSet
// Intiating a replica set
// Performing replica set maintainance by using methods such as rs.stepDown() or rs.reconfig();
// Also if the secondary members lose connectivity to the primary for more than the configured timeout(10 seconds by default);

// Once the election is stated:
// the secondary that initiated the election:
// Shares how recent their data is
// and Shares the election term: a count to track the number of elections.

// Each voting member casts one vote per election,
// A maximum of seven members can have voting privileges
// It's important to have an odd number of voting members in your replica set.
// That's why it's recommended that a replica  set have 3,5, or 7 members


// The default priority value for primary and secondary members is 1
// To make member more or less eligible we can assign a different priority value between 0 and 1000
// Higher values make a member more eligible to become the primary whereas a lower value makes the member less eligible.

// A member with a priority value of 0 is ineligible to become primary, and it can't intiated an election.


// Behaviour of the oplog
// How to access the oplog
// Commands to check the status of the oplog
// Replication lag
// Intial sync


// The oplog is a special collection that's known as a capped collection.

// The oldest entries in this special collection are overwritten once it reaches capacity.

// _________
// How oplog can help
// - Recovering from a specific timestamp in the oplog
// - Checking if the secondaries are lagging behind the primary
// - Determining the oplog window to avoid an initial sync when performing maintenance

// Everytime the database is modified the primary performes write operations and simulteneously reports changes to it's oplog, meanwhile the secondaries pulls continues stream of oplog entries from the primary.
// Each secondary updates it's own oplog based on primary stream changes and applies those operations in same order, this brings the data of secondaries to upto date with primary

// oplog entries are idempotent

// Any entry in the oplog can be applied once or several times in a row, with no difference to the final result

// By default when the oplog is created it's size is of 5% of available disk space with an upper limit of 50 gigabytes.

// to check our primary oplog size,
// use local
// rs.printReplicationInfo();

// to check how much the secondaries will lack behind the primary
// rs.printSecondaryReplicationInfo();


// Replication lag can be caused by

// Network latency
// Disk throughput
// Long-running operations
// Not having the appropriate write concerns


// if for some reasons a secondary falls a bit to far behind the primary and can catchup then,
// it will enter into a RECOVING state:

// when a member is recovering is eligible to vote but can't accept read operations

// to bring recovering member uptodate it has started an initial sync

// An initial sync is the process of copying all data, including the oplog, from a replica set member

// Initial syncs are expensive in terms of network, disk, and CPU usage.



// Read and Write concerns
// Read preferences
// How to configure them

// Write concern describes how many data-bearing members need to acknowledge a write before it's considered complete

// Higher levels of acknowledgement produce a stronger durability guarantee

// Durability guarantees that data that has been committe will not be lost in the event of a failover



// Bydefault mongoDB uses write concern of majority this means a majority of memebers are required to aknowledge the write operation before it's complete.

// We can instead provide write concern a number that represents the number of members needed to acknowledge a write operations

// one of the ways to change it for a single query be like passing options object with defining writeConcern's value

// db.collectionName.insertOne({some data},{writeConcern:{w:"majority",wtimeout:3000}});



// There is also Read concerns
// Read concerns allow your application to specify a durability guarantee for the documents that are returned by a read operations.

// By using both read and write concerns you can adjust the level of consistency and availablity guarantee.

// Choose between returning most recent data to the cluter or returning data commited by a majority of members.

// read concern levels
// local
// available
// majority
// linearizable

// Bydefault MongoDB uses local, which returns the most recent data.

// majority : Returns only data that has been acknowledged as written to a majority of members in a replicaSet

// linearziable : Reflects all successful, majority-acknowledged writes that completed before the start of the read operation

// available : The same as local read concern for replica

// to config the read and write concern value for all the database, write below query after switching to admin

// db.adminCommand({
//     setDefaultRWConcern:1,
//     defaultReadConcern:{level:"majority"},
//     defaultWriteConcern:{w:"majority"}
// })


// Read preferences describe which members of a replica set you want to send read operations to

// Bydefault it set to primary
// another one is primaryPreferred, which attempts to read from primary but if for some reasons if primary is unavailable then it goes to secondary
// another one is secondary
// another one is secondaryPreferred, same as before it attempts to read secondary but not available then it will use primary

// another one is nearest -> the driver chooses the replica set member with the lowest network latency(ping time) to the client, regardless of whether it's primary or secondary.


// One way to set the read Preference is in the connection string

// mongodb+srv://brijesh:Brijesh.@learning.sdjcmsv.mongodb.net/?readPreference=secondary&maxStalenessSeconds=120

// the maxStalenessSeconds will do like we can get the data maximum of 120 seconds older not more older then that if then change to primary