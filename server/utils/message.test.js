var expect =require('expect');

var {generateMessage}= require('./message');

describe('generateMessage',()=>{
    it('should generate correct message object',()=>{
       var from='parth';
       var text='i am good boy';
       var res=generateMessage(from,text);

        expect(res.createdAt).toBeA('number');
        expect(res).toInclude({from,text});
    });
});