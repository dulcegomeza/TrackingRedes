<?php
defined('BASEPATH') or exit('No direct script access allowed');
require APPPATH . '/libraries/REST_Controller.php';
include APPPATH . '/third_party/jwt/JWT.php';
include APPPATH . '/third_party/jwt/BeforeValidException.php';
include APPPATH . '/third_party/jwt/ExpiredException.php';
include APPPATH . '/third_party/jwt/SignatureInvalidException.php';

use Firebase\JWT\JWT;

class Soporte extends REST_Controller
{

    public function __construct()
    {
        parent::__construct();

        $this->load->database();
        $this->load->library('excel');

    }

    public function validartkn_post()
    {
        $headerToken = $this->input->get_request_header('Authorization', true);
        $key = TKN_BE;
        $token = $this->post('token');
        try {
            $decode = JWT::decode($token, $key, array('HS256'));
            $respuesta = array(
                'err' => false,
                'token' => $decode,
                'headertoken' => $headerToken,
            );
        } catch (Exception $e) {
            $respuesta = array(
                'err' => true,
                'mensaje' => $e->getMessage(),
                'headertoken' => $headertoken,
            );
        }
        $this->response($respuesta);
    }

    public function validarJWT($tkn)
    {
        try {
            $key = TKN_BE;
            $decode = JWT::decode($tkn, $key, array('HS256'));
            return true;

        } catch (Exception $e) {
            return false;
        }
    }

    public function leerToken($tkn)
    {
        $key = TKN_BE;
        try {
            $decode = JWT::decode($tkn, $key, array('HS256'));
            return $decode;
        } catch (Exception $e) {
            return false;
        }
    }

    public function usuarioToken($tkn)
    {
        try {
            $key = TKN_BE;
            $decode = JWT::decode($tkn, $key, array('HS256'));
            $idusu = $decode->idusuario;
            return $idusu;

        } catch (Exception $e) {
            return false;
        }
    }

    public function login_post()
    {
        $time = time();
        $key = TKN_BE;
        $correo = $this->post('correo');
        $password = $this->post('contrasena');

        $where = array('correo' => $correo, 'activo' => 1);
        $this->db->select('idusuario, idrol, nombre, password, correo');
        $query = $this->db->get_where('usuarios', $where, 1);

        if ($query && $query->num_rows() >= 1) {

            $password_payload = $query->row()->password;
            if (password_verify($password, $password_payload)) {

                $this->load->helper('menu');
                $token = array(
                    'iat' => $time, // Tiempo que inició el token
                    'exp' => $time + (60 * 480), // Tiempo que expirará el token (+1 hora)
                    'data' => [ // información del usuario
                        "idusuario" => $query->row()->idusuario,
                        "nombre" => $query->row()->nombre,
                        "correo" => $query->row()->correo,
                        "role" => $query->row()->idrol,
                    ],
                    'menu' => asignarMenu($query->row()->idrol),
                );

                $jwt = JWT::encode($token, $key);
                $respuesta = array(
                    'token' => $jwt,
                    'mensaje' => 'Acceso autorizado',
                );
                $status = 200;

            } else {

                $respuesta = array(
                    'mensaje' => 'Credenciales incorrectas',
                );
                $status = 401;

            }
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
                'error' => 'Datos incorrectos o su cuenta a sido dada de baja.');
            $status = 200;
        }
        $this->response($respuesta, $status);
    }

    public function usuariosp_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $this->load->helper('paginacion');
            $pagina = $this->post('pagina');
            $por_pagina = $this->post('por_pagina');
            $filtros = $this->post('filtros');
            $filtros = (array) $filtros;
            $campos = array('*');
            $respuesta = paginar_todo('view_usuarios', $pagina, $por_pagina, $campos, $filtros);
            $status = 200;
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function usuario_get()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $idusuario = $this->uri->segment(3);
            $where = array('idusuario' => $idusuario);
            $this->db->select('idusuario, nombre, activo, idrol, correo');
            $query = $this->db->get_where('view_usuarios', $where, 1);

            if ($query && $query->num_rows() >= 1) {
                $respuesta = array(
                    'mensaje' => 'Registro cargado correctamente',
                    'registro' => $query->row(),
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error interno',
                    'query' => $this->db->last_query(),
                );
                $status = 500;
            }
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function roles_get()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $query = $this->db->get_where('roles');

            if ($query && $query->num_rows() >= 1) {
                $respuesta = array(
                    'mensaje' => 'Registro cargado correctamente',
                    'registros' => $query->result(),
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error interno',
                    'error' => $this->db->error(),
                );
                $status = 500;
            }
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function secretarias_activas_get()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $query = $this->db->get_where('secretarias', array('activo' => 1));

            if ($query && $query->num_rows() >= 1) {
                $respuesta = array(
                    'mensaje' => 'Registro cargado correctamente',
                    'registros' => $query->result(),
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error interno',
                    'error' => $this->db->error(),
                );
                $status = 500;
            }
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function usuarios_activos_get()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $query = $this->db->get_where('usuarios', array('activo' => 1));

            if ($query && $query->num_rows() >= 1) {
                $respuesta = array(
                    'mensaje' => 'Registro cargado correctamente',
                    'registros' => $query->result(),
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error interno',
                    'error' => $this->db->error(),
                );
                $status = 500;
            }
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function usuarios_filtros_get()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $idrol = $this->uri->segment(3);
            $where = array('activo' => 1);

            if ($idrol > 0) {
                $where['idrol'] = $idrol;

            }

            $query = $this->db->get_where('usuarios', $where);

            if ($query && $query->num_rows() >= 1) {
                $respuesta = array(
                    'mensaje' => 'Registro cargado correctamente',
                    'registros' => $query->result(),
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error interno',
                    'error' => $this->db->error(),
                );
                $status = 500;
            }
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function usuario_put()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $idusuario = $this->put('idusuario');

            if (isset($idusuario)) {
                $idusuario = $this->put('idusuario');
                $nombre = $this->put('nombre');
                $correo = $this->put('correo');
                $idrol = $this->put('idrol');
                $password = $this->put('password');

                $data_limpia = array(
                    'idusuario' => $idusuario,
                    'nombre' => $nombre,
                    'correo' => $correo,
                    'idrol' => $idrol,
                );

                if (!empty($password)) {
                    $data_limpia["password"] = password_hash($password, PASSWORD_BCRYPT);
                }

                $update = $this->db->set($data_limpia)->where('idusuario', $idusuario)->update('usuarios');

                if ($update) {
                    $respuesta = array(
                        'mensaje' => 'Actualizacion correcta',
                    );
                    $status = 200;
                } else {
                    $respuesta = array(
                        'mensaje' => 'Error en actualizacion.',
                    );
                    $status = 409;
                }
            } else {
                // invalido
                $respuesta = array(
                    'mensaje' => 'Error interno',
                );
                $status = 500;
            }

        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function usuario_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $nombre = $this->post('nombre');
            $correo = $this->post('correo');
            $idrol = $this->post('idrol');
            $psw = $this->post('password');
            $password = password_hash($psw, PASSWORD_BCRYPT);

            $data_limpia = array(
                'nombre' => $nombre,
                'correo' => $correo,
                'idrol' => $idrol,
                'password' => $password,
                'activo' => 1,
            );

            $insert = $this->db->insert('usuarios', $data_limpia);

            if ($insert) {
                $respuesta = array(
                    'mensaje' => 'Actualizacion correcta',
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error en insercion.',
                    'error' => $this->db->error(),
                );
                $status = 409;
            }

        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function validar_correo_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $correo = $this->post('correo');
            $correo_actual = "";
            $idusuario = $this->post('idusuario');
            $nuevo = $this->post('nuevo');

            if (!$nuevo) {
                $correo_actual = $this->db->get_where('usuarios', array('idusuario' => $idusuario), 1)->row()->correo;
            }

            $query = $this->db->get_where('usuarios', array('correo' => $correo), 1);

            if ($query->num_rows() >= 1) {

                if ($correo == $correo_actual) {
                    $respuesta = array(
                        'mensaje' => 'Correo disponible',
                        'registrado' => false,
                        'result' => $query->result(),
                    );
                    $status = 200;
                } else {
                    $respuesta = array(
                        'mensaje' => 'Correo ya registrado',
                        'registros' => $query->row(),
                        'registrado' => true,
                    );
                    $status = 200;
                }

            } else {
                $respuesta = array(
                    'mensaje' => 'Correo disponible',
                    'registrado' => false,
                    'result' => $query->result(),
                );
                $status = 200;
            }

        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function usuario_cambiar_estado_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $idusuario = $this->post('idusuario');
            $val = $this->post('val');

            $update = $this->db->where('idusuario', $idusuario)->update('usuarios', array('activo' => $val));
            if ($update) {
                $respuesta = array(
                    'mensaje' => 'Actualizacion de estado correcta',
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error en actualizacion de estado',
                    'error' => $this->db->error(),
                );
                $status = 409;
            }

        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function estadosp_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $this->load->helper('paginacion');
            $pagina = $this->post('pagina');
            $por_pagina = $this->post('por_pagina');
            $filtros = $this->post('filtros');
            $filtros = (array) $filtros;
            $campos = array('*');
            $respuesta = paginar_todo('estados', $pagina, $por_pagina, $campos, $filtros);
            $status = 200;
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function estados_cambiar_estado_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $idestado = $this->post('idestado');
            $val = $this->post('val');

            $update = $this->db->where('idestado', $idestado)->update('estados', array('activo' => $val));
            if ($update) {
                $respuesta = array(
                    'mensaje' => 'Actualizacion de estado correcta',
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error en actualizacion de estado',
                    'error' => $this->db->error(),
                );
                $status = 409;
            }

        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function estado_get()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $idestado = $this->uri->segment(3);
            $where = array('idestado' => $idestado);
            $this->db->select('idestado, estado, activo, color');
            $query = $this->db->get_where('estados', $where, 1);

            if ($query && $query->num_rows() >= 1) {
                $respuesta = array(
                    'mensaje' => 'Registro cargado correctamente',
                    'registro' => $query->row(),
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error interno',
                    'query' => $this->db->last_query(),
                );
                $status = 500;
            }
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function estado_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $estado = $this->post('estado');
            $activo = $this->post('activo');
            $color = $this->post('color');

            $data_limpia = array(
                'estado' => $estado,
                'activo' => $activo,
                'color' => $color,
            );

            $insert = $this->db->insert('estados', $data_limpia);

            if ($insert) {
                $respuesta = array(
                    'mensaje' => 'Actualizacion correcta',
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error en insercion.',
                    'error' => $this->db->error(),
                );
                $status = 409;
            }

        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function estado_put()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $idestado = $this->put('idestado');

            if (isset($idestado)) {
                $estado = $this->put('estado');
                $color = $this->put('color');
                $activo = $this->put('activo');

                $data_limpia = array(
                    'estado' => $estado,
                    'color' => $color,
                    'activo' => $activo,
                );

                $update = $this->db->set($data_limpia)->where('idestado', $idestado)->update('estados');

                if ($update) {
                    $respuesta = array(
                        'mensaje' => 'Actualizacion correcta',
                    );
                    $status = 200;
                } else {
                    $respuesta = array(
                        'mensaje' => 'Error en actualizacion.',
                    );
                    $status = 409;
                }
            } else {
                $respuesta = array(
                    'mensaje' => 'Error interno',
                );
                $status = 500;
            }

        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function estados_activos_get()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $query = $this->db->get_where('estados', array('activo' => 1));

            if ($query && $query->num_rows() >= 1) {
                $respuesta = array(
                    'mensaje' => 'Registro cargado correctamente',
                    'registros' => $query->result(),
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error interno',
                    'error' => $this->db->error(),
                );
                $status = 500;
            }
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function direcciones_por_secretaria_get()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $idsecretaria = $this->uri->segment(3);
            $query = $this->db->get_where('direcciones', array('idsecretaria' => $idsecretaria, 'activo' => 1));

            if ($query && $query->num_rows() >= 1) {
                $respuesta = array(
                    'mensaje' => 'Registro cargado correctamente',
                    'registros' => $query->result(),
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error interno',
                    'error' => $this->db->error(),
                );
                $status = 500;
            }
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function subdirecciones_por_direccion_get()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $iddireccion = $this->uri->segment(3);
            $query = $this->db->get_where('subdirecciones', array('iddireccion' => $iddireccion, 'activo' => 1));

            if ($query && $query->num_rows() >= 1) {
                $respuesta = array(
                    'mensaje' => 'Registro cargado correctamente',
                    'registros' => $query->result(),
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error interno',
                    'error' => $this->db->error(),
                );
                $status = 500;
            }
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function secretariasp_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $this->load->helper('paginacion');
            $pagina = $this->post('pagina');
            $por_pagina = $this->post('por_pagina');
            $filtros = $this->post('filtros');
            $filtros = (array) $filtros;
            $campos = array('*');
            $respuesta = paginar_todo('secretarias', $pagina, $por_pagina, $campos, $filtros);
            $status = 200;
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function secretaria_get()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $idsecretaria = $this->uri->segment(3);
            $where = array('idsecretaria' => $idsecretaria);
            $this->db->select('idsecretaria, secretaria, clave, activo');
            $query = $this->db->get_where('secretarias', $where, 1);

            if ($query && $query->num_rows() >= 1) {
                $respuesta = array(
                    'mensaje' => 'Registro cargado correctamente',
                    'registro' => $query->row(),
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error interno',
                    'query' => $this->db->last_query(),
                );
                $status = 500;
            }
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function secretaria_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $secretaria = $this->post('secretaria');
            $activo = $this->post('activo');
            $clave = $this->post('clave');

            $data_limpia = array(
                'secretaria' => $secretaria,
                'activo' => $activo,
                'clave' => $clave,
            );

            $insert = $this->db->insert('secretarias', $data_limpia);

            if ($insert) {
                $respuesta = array(
                    'mensaje' => 'Actualizacion correcta',
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error en insercion.',
                    'error' => $this->db->error(),
                );
                $status = 409;
            }

        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function secretaria_put()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $idsecretaria = $this->put('idsecretaria');

            if (isset($idsecretaria)) {
                $secretaria = $this->put('secretaria');
                $clave = $this->put('clave');
                $activo = $this->put('activo');

                $data_limpia = array(
                    'secretaria' => $secretaria,
                    'clave' => $clave,
                    'activo' => $activo,
                );

                $update = $this->db->set($data_limpia)->where('idsecretaria', $idsecretaria)->update('secretarias');

                if ($update) {
                    $respuesta = array(
                        'mensaje' => 'Actualizacion correcta',
                    );
                    $status = 200;
                } else {
                    $respuesta = array(
                        'mensaje' => 'Error en actualizacion.',
                    );
                    $status = 409;
                }
            } else {
                $respuesta = array(
                    'mensaje' => 'Error interno',
                );
                $status = 500;
            }

        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function secretaria_cambiar_estado_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $idsecretaria = $this->post('idsecretaria');
            $val = $this->post('val');

            $update = $this->db->where('idsecretaria', $idsecretaria)->update('secretarias', array('activo' => $val));
            if ($update) {
                $respuesta = array(
                    'mensaje' => 'Actualizacion de estado correcta',
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error en actualizacion de estado',
                    'error' => $this->db->error(),
                );
                $status = 409;
            }

        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function direccionesp_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $this->load->helper('paginacion');
            $pagina = $this->post('pagina');
            $por_pagina = $this->post('por_pagina');
            $filtros = $this->post('filtros');
            $filtros = (array) $filtros;
            $campos = array('*');
            $respuesta = paginar_todo('view_direcciones', $pagina, $por_pagina, $campos, $filtros);
            $status = 200;
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function direcciones_activas_get()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $query = $this->db->get_where('direcciones', array('activo' => 1));

            if ($query && $query->num_rows() >= 1) {
                $respuesta = array(
                    'mensaje' => 'Registro cargado correctamente',
                    'registros' => $query->result(),
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error interno',
                    'error' => $this->db->error(),
                );
                $status = 500;
            }
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function direccion_get()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $iddireccion = $this->uri->segment(3);
            $where = array('iddireccion' => $iddireccion);
            $this->db->select('iddireccion, direccion, idsecretaria, activo');
            $query = $this->db->get_where('direcciones', $where, 1);

            if ($query && $query->num_rows() >= 1) {
                $respuesta = array(
                    'mensaje' => 'Registro cargado correctamente',
                    'registro' => $query->row(),
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error interno',
                    'query' => $this->db->last_query(),
                );
                $status = 500;
            }
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function direccion_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $direccion = $this->post('direccion');
            $activo = $this->post('activo');
            $idsecretaria = $this->post('idsecretaria');

            $data_limpia = array(
                'direccion' => $direccion,
                'activo' => $activo,
                'idsecretaria' => $idsecretaria,
            );

            $insert = $this->db->insert('direcciones', $data_limpia);

            if ($insert) {
                $respuesta = array(
                    'mensaje' => 'Actualizacion correcta',
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error en insercion.',
                    'error' => $this->db->error(),
                );
                $status = 409;
            }

        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function direccion_put()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $iddireccion = $this->put('iddireccion');

            if (isset($iddireccion)) {
                $direccion = $this->put('direccion');
                $idsecretaria = $this->put('idsecretaria');
                $activo = $this->put('activo');

                $data_limpia = array(
                    'direccion' => $direccion,
                    'idsecretaria' => $idsecretaria,
                    'activo' => $activo,
                );

                $update = $this->db->set($data_limpia)->where('iddireccion', $iddireccion)->update('direcciones');

                if ($update) {
                    $respuesta = array(
                        'mensaje' => 'Actualizacion correcta',
                    );
                    $status = 200;
                } else {
                    $respuesta = array(
                        'mensaje' => 'Error en actualizacion.',
                    );
                    $status = 409;
                }
            } else {
                $respuesta = array(
                    'mensaje' => 'Error interno',
                );
                $status = 500;
            }

        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function direccion_cambiar_estado_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $iddireccion = $this->post('iddireccion');
            $val = $this->post('val');

            $update = $this->db->where('iddireccion', $iddireccion)->update('direcciones', array('activo' => $val));
            if ($update) {
                $respuesta = array(
                    'mensaje' => 'Actualizacion de estado correcta',
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error en actualizacion de estado',
                    'error' => $this->db->error(),
                );
                $status = 409;
            }

        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function subdireccionesp_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $this->load->helper('paginacion');
            $pagina = $this->post('pagina');
            $por_pagina = $this->post('por_pagina');
            $filtros = $this->post('filtros');
            $filtros = (array) $filtros;
            $campos = array('*');
            $respuesta = paginar_todo('view_subdirecciones', $pagina, $por_pagina, $campos, $filtros);
            $status = 200;
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function subdireccion_cambiar_estado_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $idsubdireccion = $this->post('idsubdireccion');
            $val = $this->post('val');

            $update = $this->db->where('idsubdireccion', $idsubdireccion)->update('subdirecciones', array('activo' => $val));
            if ($update) {
                $respuesta = array(
                    'mensaje' => 'Actualizacion de estado correcta',
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error en actualizacion de estado',
                    'error' => $this->db->error(),
                );
                $status = 409;
            }

        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function subdireccion_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $subdireccion = $this->post('subdireccion');
            $iddireccion = $this->post('iddireccion');
            $activo = $this->post('activo');
            $area = $this->post('area');

            $data_limpia = array(
                'subdireccion' => $subdireccion,
                'iddireccion' => $iddireccion,
                'activo' => $activo,
                'area' => $area,
            );

            $insert = $this->db->insert('subdirecciones', $data_limpia);

            if ($insert) {
                $respuesta = array(
                    'mensaje' => 'Actualizacion correcta',
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error en insercion.',
                    'error' => $this->db->error(),
                );
                $status = 409;
            }

        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function subdireccion_put()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $idsubdireccion = $this->put('idsubdireccion');

            if (isset($idsubdireccion)) {
                $subdireccion = $this->put('subdireccion');
                $iddireccion = $this->put('iddireccion');
                $activo = $this->put('activo');
                $area = $this->put('area');

                $data_limpia = array(
                    'subdireccion' => $subdireccion,
                    'iddireccion' => $iddireccion,
                    'activo' => $activo,
                    'area' => $area,
                );

                $update = $this->db->set($data_limpia)->where('idsubdireccion', $idsubdireccion)->update('subdirecciones');

                if ($update) {
                    $respuesta = array(
                        'mensaje' => 'Actualizacion correcta',
                    );
                    $status = 200;
                } else {
                    $respuesta = array(
                        'mensaje' => 'Error en actualizacion.',
                    );
                    $status = 409;
                }
            } else {
                $respuesta = array(
                    'mensaje' => 'Error interno',
                    'POST' => $this->put(),
                );
                $status = 500;
            }

        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function subdireccion_get()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $idsubdireccion = $this->uri->segment(3);
            $where = array('idsubdireccion' => $idsubdireccion);
            $this->db->select('idsubdireccion, subdireccion, iddireccion,idsecretaria, activo, area');
            $query = $this->db->get_where('view_subdirecciones', $where, 1);

            if ($query && $query->num_rows() >= 1) {
                $respuesta = array(
                    'mensaje' => 'Registro cargado correctamente',
                    'registro' => $query->row(),
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error interno',
                    'query' => $this->db->last_query(),
                );
                $status = 500;
            }
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function ticketsp_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $this->load->helper('paginacion');
            $pagina = $this->post('pagina');
            $por_pagina = $this->post('por_pagina');
            $filtros = $this->post('filtros');
            $filtros = (array) $filtros;
            $campos = array('*');
            $respuesta = paginar_todo('view_ticketsp', $pagina, $por_pagina, $campos, $filtros);
            $status = 200;
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function ticket_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $idusuario = $this->leerToken($headerToken)->data->idusuario;
            $idusuario_asignado = $this->post('idusuario_asignado');
            $idsubdireccion = $this->post('idsubdireccion');
            $idservicio = $this->post('idservicio');
            $area = $this->post('area');
            $nombre = $this->post('nombre');
            $telefono = $this->post('telefono');
            $extension = $this->post('extension');
            $correo = $this->post('correo');
            $descripcion = $this->post('descripcion');
            $medio = $this->post('medio');
            $oficio = $this->post('oficio');
            $equipo = $this->post('equipo');
            $ip = $this->post('ip');
            $mac = $this->post('mac');

            $data_ticket = array(
                'idservicio' => $idservicio,
                'idsubdireccion' => $idsubdireccion,
                'idestado' => 1,
                'idusuario' => $idusuario,
                'idusuario_asignado' => $idusuario_asignado,
                'area' => $area,
                'nombre' => $nombre,
                'telefono' => $telefono,
                'extension' => $extension,
                'correo' => $correo,
                'descripcion' => $descripcion,
                'medio' => $medio,
                'oficio' => $oficio,
                'equipo' => $equipo,
                'ip' => $ip,
                'mac' => $mac,
            );

            $this->db->trans_begin();
            $this->db->insert('tickets', $data_ticket);
            $idticket = $this->db->insert_id();

            $data_asignacion = array(
                'idticket' => $idticket,
                'idusuario' => $idusuario,
                'idusuario_asignado' => $idusuario_asignado,
                'tiempo' => 0,
                'comentario' => '',
            );

            $this->db->insert('tickets_asignaciones', $data_asignacion);

            $data_estado = array(
                'idticket' => $idticket,
                'idusuario' => $idusuario,
                'idusuario_asignado' => $idusuario_asignado,
                'idestado' => 1,
                'comentario' => '',
                'tiempo' => 0,
            );

            $this->db->insert('tickets_estados', $data_estado);

            if ($this->db->trans_status() === false) {
                $this->db->trans_rollback();
                $respuesta = array(
                    'mensaje' => 'Error en insercion.',
                    'error' => $this->db->error(),
                );
                $status = 409;
            } else {
                $this->db->trans_commit();
                $respuesta = array(
                    'mensaje' => 'Insercion correcta',
                );
                $status = 200;
            }

        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function ticket_put()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $idticket = $this->put('idticket');

            if (isset($idticket)) {

                $idservicio = $this->put('idservicio');
                $idsubdireccion = $this->put('idsubdireccion');
                $area = $this->put('area');
                $nombre = $this->put('nombre');                
                $telefono = $this->put('telefono');
                $extension = $this->put('extension');
                $correo = $this->put('correo');
                $descripcion = $this->put('descripcion');
                $medio = $this->put('medio');
                $oficio = $this->put('oficio');
                $equipo = $this->put('equipo');
                $ip = $this->put('ip');
                $mac = $this->put('mac');

                $data_limpia = array(
                    'idservicio' => $idservicio,
                    'idsubdireccion' => $idsubdireccion,
                    'area' => $area,
                    'nombre' => $nombre,
                    'telefono' => $telefono,
                    'extension' => $extension,
                    'correo' => $correo,
                    'descripcion' => $descripcion,
                    'medio' => $medio,
                    'oficio' => $oficio,
                    'equipo' => $equipo,
                    'ip' => $ip,
                    'mac' => $mac
                );

                $update = $this->db->where('idticket', $idticket)->update('tickets', $data_limpia);

                if ($update) {
                    $respuesta = array(
                        'mensaje' => 'Actualizacion correcta',
                    );
                    $status = 200;
                } else {
                    $respuesta = array(
                        'mensaje' => 'Error en actualizacion.',
                        'error' => $this->db->error(),
                    );
                    $status = 409;
                }

            } else {
                $respuesta = array(
                    'mensaje' => 'Error interno',
                    'POST' => $this->put(),
                );
                $status = 500;
            }

        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function ticket_get()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $idticket = $this->uri->segment(3);
            $where = array('idticket' => $idticket);
            $this->db->select('*');
            $query = $this->db->get_where('tickets', $where, 1);

            if ($query && $query->num_rows() >= 1) {
                $datos = $query->row();
                $idsubdireccion = $query->row('idsubdireccion');
                $qiddir = $this->db->select('iddireccion')->from('subdirecciones')->where('idsubdireccion', $idsubdireccion)->get();
                $iddireccion = $qiddir->row('iddireccion');
                $datos->iddireccion = $iddireccion;
                $respuesta = array(
                    'mensaje' => 'Registro cargado correctamente',
                    'registro' => $datos,
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error interno',
                    'query' => $this->db->last_query(),
                );
                $status = 500;
            }
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function ticket_detalle_get()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $idticket = $this->uri->segment(3);
            $where = array('idticket' => $idticket);
            $this->db->select('*');
            $query = $this->db->get_where('view_tickets_detalle', $where, 1);

            if ($query && $query->num_rows() >= 1) {
                $datos = $query->row();

                $respuesta = array(
                    'mensaje' => 'Registro cargado correctamente',
                    'registro' => $datos,
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error interno',
                    'query' => $this->db->last_query(),
                );
                $status = 500;
            }
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function serviciosp_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $this->load->helper('paginacion');
            $pagina = $this->post('pagina');
            $por_pagina = $this->post('por_pagina');
            $filtros = $this->post('filtros');
            $filtros = (array) $filtros;
            $campos = array('*');
            $respuesta = paginar_todo('servicios', $pagina, $por_pagina, $campos, $filtros);
            $status = 200;
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function servicio_cambiar_estado_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $idservicio = $this->post('idservicio');
            $val = $this->post('val');

            $update = $this->db->where('idservicio', $idservicio)->update('servicios', array('activo' => $val));
            if ($update) {
                $respuesta = array(
                    'mensaje' => 'Actualizacion de estado correcta',
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error en actualizacion de estado',
                    'error' => $this->db->error(),
                );
                $status = 409;
            }

        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function servicio_agregar_post()
    {
        $headerToken = apache_request_headers()['Authorization'];
        if ($this->validarJWT($headerToken)) {

            $servicio = $this->post('servicio');
            $idusuario = $this->post('idusuario');


            $this->db->trans_begin();
            $data = array(
                'servicio' => $servicio,
                'activo'   => 1,
                'idusuario' => $this->leerToken($headerToken)->data->idusuario,
            );

            $insert = $this->db->insert('servicios', $data);
            $idservicio = $this->db->insert_id();
            
            if ($this->db->trans_status() === false) {

                $this->db->trans_rollback();
                $respuesta = array(
                    'mensaje' => 'Error en actualizacion.',
                );
                $status = 409;
            } else {
                $this->db->trans_commit();
                $respuesta = array(
                    'mensaje' => 'Insercion correcta',
                );
                $status = 200;
            }

        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function servicio_get()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $idservicio = $this->uri->segment(3);
            $where = array('idservicio' => $idservicio);

            $this->db->select('*');
            $query = $this->db->get_where('servicios', $where, 1);

            if ($query && $query->num_rows() >= 1) {

                $registro = array(
                    'idservicio' => $query->row('idservicio'),
                    'servicio' => $query->row('servicio'),
                    'activo' => $query->row('activo'),
                    'idusuario' => $query->row('idusuario'),
                );

                $respuesta = array(
                    'mensaje' => 'Registro cargado correctamente',
                    'registro' => $registro,
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error interno',
                    'query' => $this->db->last_query(),
                );
                $status = 500;
            }
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function servicio_actualizar_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            
            $idservicio = $this->post('idservicio');
            $servicio = $this->post('servicio');

            if (isset($idservicio)) {
                $this->db->trans_begin();
                $data = array(
                    'servicio' => $servicio,
                );

                $update = $this->db->set($data)->where('idservicio', $idservicio)->update('servicios');

                if ($this->db->trans_status() === false) {
                    $this->db->trans_rollback();
                    $respuesta = array(
                        'mensaje' => 'Error en actualizacion.',
                    );
                    $status = 409;
                } else {
                    $this->db->trans_commit();
                    $respuesta = array(
                        'mensaje' => 'Actualizacion correcta',
                    );
                    $status = 200;

                }
            } else {
                // invalido
                $respuesta = array(
                    'mensaje' => 'Error interno',
                );
                $status = 500;
            }

        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function servicios_get()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $query = $this->db->get_where('servicios', array( 'activo' => 1));

            if ($query && $query->num_rows() >= 1) {
                $respuesta = array(
                    'mensaje' => 'Registro cargado correctamente',
                    'registros' => $query->result(),
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error interno',
                    'error' => $this->db->error(),
                );
                $status = 500;
            }
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function frmtFecha($fecha)
    {
        $fecha = (array) $fecha;
        $fechaFormateada = $fecha["year"] . "/" . $fecha["month"] . "/" . $fecha["day"];
        return $fechaFormateada;
    }

}
