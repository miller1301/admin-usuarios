import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

  users!: any[]
  showModal: boolean = false;
  actionUser: 'crear' | 'eliminar' | 'editar' | '' = '';
  userActive!: string;
  uidUserMongo: string = '';
  formUser!: FormGroup;

  constructor( private userService: UserService, private formBuilder: FormBuilder ) {
    this.initFormUser();
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  initFormUser() {
    this.formUser = this.formBuilder.group({
      name: [''],
      img: [''],
      role: [''],
      status: [''],
      idUser: [''],
      email: [''],
      phone: [''],
    });
  }

  async getAllUsers() {
    this.users = await firstValueFrom( this.userService.getAllUsers() );
  }

  async getUser(id: string) {
    const user = await firstValueFrom( this.userService.getUser(id) );
    this.formUser.patchValue(user[0]);
    this.uidUserMongo = user[0]._id;
    return user;
  }

  async createUser() {
    const createdUser = await firstValueFrom( this.userService.createUser(this.formUser.value) );
    this.showModal = false;
    this.getAllUsers();
    this.formUser.reset();
    return createdUser;
  }

  async updateUser(id: string) {
    const updateUser = await firstValueFrom( this.userService.updateUser(this.uidUserMongo, this.formUser.value) );
    this.getAllUsers();
    this.formUser.reset();
    this.showModal = false;
    return updateUser;
  }

  async deleteUser(id: string) {
    const deleteUser = await firstValueFrom( this.userService.deleteUser(this.uidUserMongo) );
    this.getAllUsers();
    this.showModal = false;
    return deleteUser;
  }

}
