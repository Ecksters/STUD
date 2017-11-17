<?php

use Phalcon\Mvc\Controller;
use Phalcon\Security\Random;

class UsersController extends Controller {
  public function setStayLoggedIn() {
    $newValue = (bool) $this->request->getPost('stayLoggedIn');
    $this->session->set('stayLoggedIn', $newValue);
    return ['stayLoggedIn' => $newValue];
  }
  
  public function checkLogin() {
    $user = $this->session->get('user');
    if ($this->session->get('stayLoggedIn') && isset($user)) {
      $this->permission->updatePermissions();
      return $this->getCredentials();
    } else {
      return ['authenticated' => false];
    }
  }
  
  public function getPermissions() {
    $currentUser = $this->session->get('user');
    if (isset($currentUser)) {
      $user = Users::findFirstById($currentUser['id']);
      $auth = Authentication::findFirstById($currentUser['id']);
      return $this->setLoggedIn($user, $auth);
    } else {
      return ['authenticated' => false];
    }
  }
  
  public function logout() {
    $this->session->destroy(true);
    return ['loggedOut' => true];
  }
  
  public function login() {
    $email = $this->request->getPost('email', 'lower');
    $password = $this->request->getPost('password', 'string') . 'PepperBaby!OhYeah.';
    $authentication = Authentication::findFirstByEmail($email);
    if ($authentication && $this->security->checkHash($password, $authentication->password)) {
      if (!$authentication->active) {
        return ['authenticated' => false, 'reason' => 'Account disabled, ask admin'];
      }

      $user = Users::findFirstById($authentication->id);

      return $this->setLoggedIn($user, $authentication);
    }
  
    return ['authenticated' => false, 'reason' => 'Invalid email or password'];
  }

  public function register() {
    
    $permissionsTable = [1 => ROLE_USER, 2 => ROLE_LOCATIONADMIN, 3 => ROLE_REGIONADMIN, 4 => ROLE_SYSTEMADMIN];
    
    $authentication = new Authentication();
    $authentication->email = $this->request->getPost('email', 'lower');
    $authentication->password = $this->security->hash($this->request->getPost('password', 'string') . 'PepperBaby!OhYeah.');
    
    $accessCode = $this->request->getPost('accessCode', 'string');
    
    if ($authentication->save() == false) {
      return ['authenticated' => false, 'errors' => $this->errorArray($authentication)];
    } else {
      $accessCode = AccessCodes::findFirstByCode($accessCode);
      if($accessCode && $accessCode->uses > 0 && ($accessCode->expirationDate === null || strtotime($accessCode->expirationDate) > time())) {
        $user = new Users();
        $user->id = $authentication->id;
        $user->name = $this->request->getPost('name', array('string', 'striptags'));

        $random = new Random();
        $user->publicUrl = strtolower($random->base64Safe(7));
        while(Users::findFirstByPublicUrl($user->publicUrl)) {
          $user->publicUrl = strtolower($random->base64Safe(7));
        }

        if ($user->save()) {
          $accessCode->uses--;
          $accessCode->update();
          $role = new UsersToRoles();
          $role->user = $user->id;
          $role->role = $permissionsTable[$accessCode->level];
          $role->context = $accessCode->context;
          $role->save();
          
          return $this->setLoggedIn($user, $authentication);
        } else {
          $authentication->delete();
          return ['authenticated' => false, 'errors' => self::errorArray($user)];
        }
      } else {
        $authentication->delete();
        return ['authenticated' => false, 'errors' => [[ 'message' => 'Invalid access code']]];
      }
    }
  }
  
  public function getUser() {
    $id = $this->request->getPost('id', 'int');
    
    $rolesAndScope = UsersToRoles::getRolesAndScope($id);
    
    $roles = &$rolesAndScope['roles'];
    $scope = &$rolesAndScope['scope'];
    
    if($this->checkAuthority($id, $roles)) {
      $user = Users::findFirstById($id)->toArray();
      $userAuth = Authentication::findFirstById($id);
      $user['email'] = $userAuth->email;
      $roleList = UsersToRoles::findByUser($id)->toArray();
      return ['user' => $user, 'roles' => $roles, 'scope' => $scope, 'roleList' => $roleList];
    }
    throw new ErrorException('Insufficient Permissions to view user information', 403, 10);
  }
  
  public function updateUser() {
    $id = $this->request->getPost('id', 'int');
    $roles = UsersToRoles::getRolesAndScope($id)['roles'];
    $currentUser = $this->session->get('user');
    
    if ($this->checkAuthority($id, $roles)) {
      $auth = Authentication::findFirstById($id);
      if($currentUser['id'] == $id &&
         !$this->security->checkHash($this->request->getPost('oldPassword', 'string') . 
          'PepperBaby!OhYeah.', $auth->password)) {
        return ['reason' => 'Current password was incorrect'];
      }
      $user = Users::findFirstById($id);
      if(!empty($this->request->getPost('newPassword', 'string'))) {
        $newAuth['password'] = $this->security->hash($this->request->getPost('newPassword', 'string')
              . 'PepperBaby!OhYeah.');
      }
      $newAuth['name'] = $this->request->getPost('name', 'string');
      $newAuth['email'] = $this->request->getPost('email', 'email');
      $auth->update($newAuth, ['email', 'password']);
      $user->update($newAuth, ['name']);
      return ['user' => $user];
    }
    throw new ErrorException('Insufficient Permissions to view user information', 403, 10);
  }
  
  private function checkAuthority(&$id, &$roles) {
    $currentUser = $this->session->get('user');
    $currentRoles = $this->session->get('roles');
    $hasAuthority = $currentUser['id'] == $id;
    if(!$hasAuthority && $currentRoles[LEVEL_SYSTEM][0] >= ROLE_LOCATIONADMIN && isset($roles[LEVEL_LOCATION])) {
      foreach ($roles[LEVEL_LOCATION] as $role => $permission) {
        if(isset($currentRoles[LEVEL_LOCATION][$role]) && $currentRoles[LEVEL_LOCATION][$role] > $permission) {
          $hasAuthority = true;
          break;
        }
      }
    }
    return $hasAuthority;
  }
  
  private function setLoggedIn(&$user, &$authentication) {
    $rolesAndScope = UsersToRoles::getRolesAndScope($user->id);
    $userData = ['email' => $authentication->email,
                  'name' => $user->name,
                  'id' => $user->id
                ];
    $this->session->set('user', $userData);
    $this->session->set('roles', $rolesAndScope['roles']);
    $this->session->set('scope', $rolesAndScope['scope']);
    return $this->getCredentials();
  }
  
  private function getCredentials() {
    $user = $this->session->get('user');
    return ['authenticated' => true,
            'user' => [
                        'id' => $user['id'],
                        'name' => $user['name'],
                        'email' => $user['email'],
                        'roles' => $this->session->get('roles'),
                        'scope' => $this->session->get('scope')
                      ]
    ];
  }
  
  public static function errorArray(&$model) {
    $errors = [];
    foreach ($model->getMessages() as $message) {
      $errors[] = [
        'errorType' => $model->validation() ? 'database' : 'validation',
        'message' => ucfirst($message->getMessage()),
        'field' => $message->getField(),
        'type' => $message->getType()
      ];
    }
    return $errors;
  }
}