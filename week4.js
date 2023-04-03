const express= require("express");
const res = require("express/lib/response");
const app= express();
const fs = require('fs');
const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculate-service' },
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });

  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }
  const { passport, generateToken } = require('./passport');
  
  app.post('/login', function(req, res) {
  const username= req.query.username;
  
if (username === 'mumu') {
    logger.info('Authentication successful');
    const token = generateToken(username);
  res.json({ token });
  } else {
  logger.error("Invalid usename");
  res.status(401).json({ message: 'Authentication failed.' });
  }
  });


  const checkNumbers = (n1,n2,req,res) => {
  var flag = false
  try{
    if(isNaN(n1)) {
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 incorrectly defined");
    }
    if(isNaN(n2)) {
        logger.error("n2 is incorrectly defined");
        throw new Error("n2 incorrectly defined");
    }
    if (n1 === NaN || n2 === NaN) {
      console.log()
      throw new Error("Parsing Error");
    }
    flag = true; 
    logger.info(n1+' and '+n2+' are valid numbers ');
    return flag;
    } catch(error) {
    console.error(error)
    res.status(500).json({statuscocde:500, msg: error.toString() })
    return flag
    }
}

const add= (n1,n2) => {
    console.log("Entered function");
    return n1+n2;
}

const sub= (n1,n2) => {
  return n1-n2;
}

const mul= (n1,n2) => {
  return n1*n2;
}

const div= (n1,n2) => {
  return n1/n2;
}



app.get("/add", passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log("Entered add");
    try{
        console.log("Entered try");
      const n1= parseFloat(req.query.n1); 
      const n2= parseFloat(req.query.n2);
      logger.info('Parameters '+n1+' and '+n2+' received for addition');
      const flag = checkNumbers(n1,n2,req,res);
      if(flag == true)
      {
        console.log("Entered if");
        const result = add(n1,n2);
        console.log("Add returned");
        res.status(200).json({statuscocde:200, data: result }); 
      }
    } catch(error) { 
        console.error(error)
        res.status(500).json({statuscocde:500, msg: error.toString() })
      }
});
app.get("/sub",  passport.authenticate('jwt', { session: false }), (req, res) => {
    try{
     const n1= parseFloat(req.query.n1); 
     const n2= parseFloat(req.query.n2);
     logger.info('Parameters '+n1+' and '+n2+' received for substraction');
     const flag = checkNumbers(n1,n2,req,res);
     if(flag == true)
     {
      const result = sub(n1,n2);
      res.status(200).json({statuscocde:200, data: result }); 
     }
    } catch(error) { 
      console.error(error)
      res.status(500).json({statuscocde:500, msg: error.toString() })
    }
});
app.get("/mul",  passport.authenticate('jwt', { session: false }), (req, res) => {
  try{
    const n1= parseFloat(req.query.n1); 
    const n2= parseFloat(req.query.n2);
    logger.info('Parameters '+n1+' and '+n2+' received for multiplication');
    const flag = checkNumbers(n1,n2,req,res);
    if(flag == true)
    {
      const result = mul(n1,n2);
      res.status(200).json({statuscocde:200, data: result }); 
    }
  } catch(error) { 
     console.error(error)
     res.status(500).json({statuscocde:500, msg: error.toString() })
    }
});
app.get("/div",  passport.authenticate('jwt', { session: false }), (req, res) => {
  try{
   const n1= parseFloat(req.query.n1); 
   const n2= parseFloat(req.query.n2);
   logger.info('Parameters '+n1+' and '+n2+' received for division');
   const flag = checkNumbers(n1,n2,req,res);
   if(flag == true)
   {
     const result = div(n1,n2);
     res.status(200).json({statuscocde:200, data: result }); 
   }
  } catch(error) { 
     console.error(error)
     res.status(500).json({statuscocde:500, msg: error.toString() })
  }
});
const port=3070;
app.listen(port,()=> {
    console.log("hello i'm listening to port " +port);
});