import { Component, OnInit, Input } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Router } from '@angular/router'

import { NotificationsService } from 'angular2-notifications'

import { AuthService } from '../../core'
import {
  FormReactive,
  User,
  UserService,
  USER_PASSWORD
} from '../../shared'
import { UserUpdateMe } from '../../../../../shared'

@Component({
  selector: 'my-account-details',
  templateUrl: './account-details.component.html'
})

export class AccountDetailsComponent extends FormReactive implements OnInit {
  @Input() user: User = null

  error: string = null

  form: FormGroup
  formErrors = {}
  validationMessages = {}

  constructor (
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private notificationsService: NotificationsService,
    private userService: UserService
  ) {
    super()
  }

  buildForm () {
    this.form = this.formBuilder.group({
      displayNSFW: [ this.user.displayNSFW ]
    })

    this.form.valueChanges.subscribe(data => this.onValueChanged(data))
  }

  ngOnInit () {
    this.buildForm()
  }

  updateDetails () {
    const displayNSFW = this.form.value['displayNSFW']
    const details: UserUpdateMe = {
      displayNSFW
    }

    this.error = null
    this.userService.updateMyDetails(details).subscribe(
      () => {
        this.notificationsService.success('Success', 'Information updated.')

        this.authService.refreshUserInformation()
      },

      err => this.error = err.message
    )
  }
}
