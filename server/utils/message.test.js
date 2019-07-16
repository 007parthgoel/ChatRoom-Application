var expect =require('expect');

var {generateMessage,generateLocationMessage}= require('./message');

describe('generateMessage',()=>{
    it('should generate correct message object',()=>{
       var from='parth';
       var text='i am good boy';
       var res=generateMessage(from,text);

        expect(res.createdAt).toBeA('number');
        expect(res).toInclude({from,text});
    });
});

describe('generateLocationMessage',()=>{
    it('should generate correct location object',()=>{
        var from="parth";
        var latitude=1;
        var longitude=15;
        var url='https://www.google.com/maps?q=1,15';
        var result=generateLocationMessage(from,latitude,longitude);

        expect(result.createdAt).toBeA('number');
        expect(result).toInclude({from,url});
        expect(result.url).toBe(url).toBeA('string');
        
    });
});