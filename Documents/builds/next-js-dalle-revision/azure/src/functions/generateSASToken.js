const { app } = require('@azure/functions');
const generateSASToken = require('../../lib/generateSASToken');



app.http('generateSASToken', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        sasToken = await generateSASToken();
       
      
        context.log(`Http function kitty request for url "${request.url}"`);

       



        return { body: sasToken };
    }
});
