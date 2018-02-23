var ObjectID = require('mongodb').ObjectID;
module.exports = function (app, db) {
    //insert
    app.post('/notes', (req, res) => {
        var note = { text: req.body.body, title: req.body.title };
        db.collection('notes').insert(note, (err, result) => {
            if (err) res.send({ 'error': 'An error has occured' });
            else res.send(result.ops[0]);

        });

    });

    //read
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        var details = { '_id': new ObjectID(id) };
        db.collection('notes').findOne(details, (err, item) => {
            if (err) res.send({ 'error': 'an error has occured' });

            else res.send(item);

        });

    });

    //delete\
    app.delete('/notes/:id',(req,res)=>{
        const id = req.params.id;
        var details = {'_id':new ObjectID(id)};
        db.collection('notes').remove(details,(err,item)=>{
            if(err)res.send({'error':'An error has occured'});
            else res.send(`Note ${id} deleted`);
        });

    });

    //update
    app.put('/notes/:id',(req,res)=>{
        const id = req.params.id;
        var details = {'_id':new ObjectID(id)};
        var note = {'text':req.body.body,'title':req.body.title};

        db.collection('notes').update(details,note,(err,result)=>{
            if(err)res.send({'error':'An error has occured'})
            else res.send(note);
        });

    });
};