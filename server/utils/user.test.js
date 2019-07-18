const expect=require('expect');

const {Users}=require('./user');

describe('Users',()=>{

     beforeEach(()=>{
        users= new Users();
        users.users=[{
            id:'1',
            name:'mike',
            room:'node course'
        },{
            id:'2',
            name:'parth',
            room:'react course'
        },{
            id:'3',
            name:'sameer',
            room:'node course'
        }];
      });

      // test to add user
     it('should add new user',()=>{
       var users= new Users();
       var user={
           id:'123',
           name:'parth',
           room:'the office fans'
       };

       var resUser=users.addUser(user.id,user.name,user.room);
       expect(users.users).toEqual([user]);
     });

     // test to remove a user
     it('should remove a user',()=>{ 
        var userID='2';
        var user= users.removeUser(userID);
        
        expect(user.id).toBe(userID);
        expect(users.users.length).toBe(2);      
     });

     // test to remove a invalid user
     it('should not remove a user',()=>{
        var userID='4';
        var user= users.removeUser(userID);
        
        expect(user).toNotExist
        expect(users.users.length).toBe(3); 
     });

     //test to find the user
     it('should find the user',()=>{
        var userId='1';  
        var resuser=users.getUser(userId);
         expect(resuser.id).toBe(userId);
     });

     //test to find the invalid user
     it('should not find the user',()=>{
        var userId='4';  
        var resuser=users.getUser(userId);
         
        expect(resuser).toNotExist;
     });

     // test to check userlist
     it('should return name for node course',()=>{
        var userList=users.getUserList('node course');

        expect(userList).toEqual(['mike','sameer']);
     });

     it('should return name for react course',()=>{
        var userList=users.getUserList('react course');

        expect(userList).toEqual(['parth']);
     });
});