import express, { Router, Request, Response } from 'express';
import Login from '../controller/Auth/login';
import { authenticateToken } from '../middleWares/Token';
import { RefreshToken } from '../middleWares/Refresh_token';
import AddRole from '../controller/UserService/AddRole';
import EditRole from './../controller/UserService/editRole';
import Register from '../controller/Auth/Register';
import DeleteRole from '../controller/UserService/deleteRole';
import DeleteAllUsers from './../controller/UserService/deleteAllUsers';
class AuthRouter {
  public router: Router;
  private Register: Register;
  private login: Login;
  private AddRole: AddRole;
  private EditRole: EditRole;
  private deleteRole: DeleteRole;
  private DeleteAllUsers: DeleteAllUsers;

  constructor() {
    this.router = express.Router();
    this.Register = new Register();
    this.login = new Login();
    this.AddRole = new AddRole();
    this.EditRole = new EditRole();
    this.deleteRole = new DeleteRole();
    this.DeleteAllUsers = new DeleteAllUsers();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/Register', (req: Request, res: Response) => {this.Register.AddUser(req, res)});
    this.router.post('/Login', (req: Request, res: Response) => {this.login.Login(req, res)});
   this.router.post('/RefreshToken', (req: Request, res: Response) =>{RefreshToken(req,res)});
    this.router.delete('/DeleteAllUsers', (req: Request, res: Response) => {this.DeleteAllUsers.DeleteAllUsers(req, res)});
    this.router.use(authenticateToken); // Apply authentication middleware for the routes below
 //   this.router.post('/RefreshToken', (req: Request, res: Response) =>{RefreshToken(req,res)});
    this.router.post('/AddRole', (req: Request, res: Response) => {this.AddRole.AddRole(req, res)});
    this.router.patch('/EditRole', (req: Request, res: Response) => {this.EditRole.EditRole(req, res)});
    this.router.delete('/DeleteRole', (req: Request, res: Response) => {this.deleteRole.DeleteRole(req, res)});
  }
}

export default AuthRouter;
