import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UsuariosService } from '../../servicios/servicio.index';
import { Usuario } from '../../modelos/usuario.model';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, AfterViewInit {

    public loading = false;
    public errMsj: string;
    constructor(public router: Router, public _usuariosService: UsuariosService, public _authService: AuthService) { }

    ngOnInit() {

        let localtoken = this._authService.getToken();

        if (localtoken !== null) {

            this.router.navigate(['/starter']);

        }

    }

    ngAfterViewInit() {
        $(function() {
            $('.preloader').fadeOut();
        });
        $('#to-recover').on('click', function() {
            $('#loginform').slideUp();
            $('#recoverform').fadeIn();
        });
    }

    login(forma: NgForm) {
        this.loading = true;
        if (forma.invalid) {
            this.loading = false;
            return;
        }

        // tslint:disable-next-line:prefer-const
        let usuario = new Usuario(forma.value.correo, forma.value.contrasena);
        this._usuariosService.login(usuario).subscribe(
            data => {
                this.router.navigate(['/starter']);
            },
            err => {
                console.log(err);
                this.errMsj = err.error.mensaje;
                this.loading = false;
            }
        );

        // this.router.navigate([ '/dashboard' ]);
    }

}
