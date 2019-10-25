import { Router, ActivatedRoute } from '@angular/router';
import { PhoneBookServiceService } from './../../services/phone-book-service.service';
import { Record } from './../../models/record';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { TooltipPosition } from '@angular/material/tooltip';


@Component({
    selector: 'app-phone-book-form',
    templateUrl: './phone-book-form.component.html',
    styleUrls: ['./phone-book-form.component.scss']
})
export class PhoneBookFormComponent implements OnInit {

    phoneNumber: Record
    phoneForm: FormGroup
    Exists: boolean
    constructor(
        private fb: FormBuilder,
        private phoneSer: PhoneBookServiceService,
        private snackBar: MatSnackBar,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {

        this.initForm();
        this.setPhoneToForm()
    }

    initForm() {
        console.log('init');
        this.phoneForm = this.fb.group({
            name: ['', Validators.required],
            phoneNumber: ['', Validators.required, Validators.pattern['[0-9]*']],
        })
    }

    // pattern="[0-9]*"
    onSubmit() {
        //user want to edit 
        if (this.phoneNumber) {
            this.phoneSer.updatePhone(this.phoneNumber.id, this.phoneForm.value).subscribe(data => {
                this.snackBar.open('phone Updated', 'Success', {
                    duration: 2000
                })
                this.phoneForm.reset()
                this.router.navigate(['../'], { relativeTo: this.route })

            }, err => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 422) {
                        let errorMsg = err.error.error.details.messages

                        for (let i = 0; i < Object.values(errorMsg).length; i++) {
                            let messageError = Object.values(errorMsg)[i]
                            this.errorHandler(messageError)
                        }
                    }
                }
            })
        }
        else {
            console.log(typeof this.phoneForm.value.phoneNumber)
            this.phoneSer.createPhone(this.phoneForm.value).subscribe(data => {
                console.log(data)
                this.snackBar.open('Phone Created', 'Success', {
                    duration: 2000
                })
                this.phoneForm.reset()
                this.router.navigate(['../'], { relativeTo: this.route })

                // console.log(data);
            }, err => {
                console.log(err, 'err');
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 422) {
                        let errorMsg = err.error.error.details.messages
                        for (let i = 0; i < Object.values(errorMsg).length; i++) {
                            let messageError = Object.values(errorMsg)[i]
                            this.errorHandler(messageError)
                        }
                    }
                }
                // this.errorHandler(err, 'Failed To Save Phone')
            })

        }

    }



    errorHandler(message) {
        this.snackBar.open(message, 'Error', {
            duration: 2000
        })
    }

    setPhoneToForm() {
        //get id of phone
        this.route.params.subscribe(params => {
            let id = params['id']
            if (!id) {
                return
            }
            this.phoneSer.getPhone(id).subscribe(data => {
                this.phoneNumber = data
                this.phoneForm.patchValue(this.phoneNumber)
            }, err => {
                this.errorHandler('Failed To Get Phone')
            })

        })
    }

    goHome() {
        this.router.navigate(['../'], { relativeTo: this.route })
    }
}
