import { Router } from 'express';
import { isLoggedIn } from '../middlewares/auth';
import passport from '../middlewares/auth';
import UserRouter from './user';
import ProductoRouter from './productosvistafake'
import { nCPU } from '../index';


const router = Router();

router.get('/login', (req, res) => {
  res.render('login');
});

router.get(
  '/auth/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/api/datos',
    failureRedirect: '/api/fail',
  })
);

router.get('/fail', (req, res) => {
  res.render('login-error', {});
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/api/login');
});

router.use('/user', isLoggedIn, UserRouter);
router.use('/productos', isLoggedIn, ProductoRouter);

type Photos = {
  value: string;
};

type Emails = {
  value: string;
};

interface User extends Express.User {
  contador?: number;
  displayName?: string;
  photos?: Photos[];
  emails?: Emails[];
}

router.get('/datos', (req, res) => {
  let foto = 'noPhoto';
  let email = 'noEmail';

  if (req.isAuthenticated()) {
    const userData: User = req.user;
    
    if (!userData.contador) userData.contador = 0;
    userData.contador++;

    if (userData.photos) foto = userData.photos[0].value;

    if (userData.emails) email = userData.emails[0].value;

    res.render('datos', {
      nombre: userData.displayName,
      contador: userData.contador,
      foto,
      email,
    });
  } else {
    res.redirect('/api/login');
  }
});

router.get('/info', (req, res) => {
  console.log(process);
  res.json({
    "argumentos": process.argv,
    "OS": process.platform,
    "Node Version": process.version,
    "Memory": process.memoryUsage,
    "Path": process.execPath,
    "PID": process.pid,
    "NumCPU": nCPU
  })

});

export default router;



