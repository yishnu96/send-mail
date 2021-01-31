
import express from 'express';
import bodyParser from 'body-parser';
import mailgun from 'mailgun-js';
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const DOMAIN = 'sandbox79d3fe2d18544768a063e285d26653f5.mailgun.org';
const apikey= '88a3a81f21bb69aa2359d74a31535869-07bc7b05-11214ee6';
const mg = mailgun({apiKey: apikey, domain: DOMAIN});

app.get('/', (req, res) => {
  res.send("/send is API of send mail ");
});


app.post('/sendmail', function (req, res){
  
  const data = {
    from: 'Yishnu Pramanik <yishnu14pramanik@gmail.com>',
    to: 'yishnupramanik96@gmail.com',
    subject: 'Hello',
    text: 'Testing some Mailgun awesomness!'
  };

  mg.messages().send(data, function (error, body) {
      if(error){
        console.error(error);
        return res.status(401).json({
          error: true,
          message: 'Mail Couldnot Send '
        })
      }
    console.log(body);
    return res.status(200).json({
      error: false,
      message: 'Mail Send'
    })
  });
})

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
